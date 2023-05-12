import { Request, Response, NextFunction } from 'express';

import Stripe from 'stripe';
import { setListingAsFeatured } from '../models/listingsModel';

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY as string, {
  apiVersion: '2022-11-15',
});

async function stripeTransaction(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const listingId = req.body.listingId;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: 'Featured listing',
            },
            unit_amount: 5, // 500 pence = £5
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    // if the session is created successfully, set the listing as featured
    if (session) {
      await setListingAsFeatured(listingId);
    }

    res.json({ url: session.url });
  } catch (error) {
    next(error);
  }
}
export { stripeTransaction };
