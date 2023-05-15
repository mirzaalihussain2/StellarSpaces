function getCookie(name: string) {
  const value = '; ' + document.cookie;
  const parts = value.split('; ' + name + '=');
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}
const token = getCookie('token');

export const createCheckoutSession = async (listingId: string) => {
  try {
    const response = await fetch(
      'http://localhost:3010/stripe/create-checkout-session',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Replace 'Bearer token' with the actual JWT token of the authenticated user
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ listingId }),
      }
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

/*

example of stripe checkout implementation
// Import necessary modules
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { createCheckoutSession } from './stripeService'; // Import the service you created earlier

// Load Stripe with your publishable key.
// Note: Do not expose your secret key on the client side!
const stripePromise = loadStripe('pk_test_YourPublishableKeyFromStripe');

export default function StripePayment() {
  const [sessionId, setSessionId] = useState(null);

  // This function gets a Checkout Session ID from your backend and saves it in state
  const getCheckoutSession = async () => {
    const listingId = 'your-listing-id'; // Replace with your listing ID
    const data = await createCheckoutSession(listingId);

    if (data && data.url) {
      const url = new URL(data.url);
      const sessionId = url.searchParams.get('session_id');
      setSessionId(sessionId);
    }
  };

  // Call getCheckoutSession when the component mounts
  useEffect(() => {
    getCheckoutSession();
  }, []);

  // This function redirects the user to the Stripe Checkout page
  const handleCheckout = async () => {
    const stripe = await stripePromise;
    if (sessionId) {
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <button onClick={handleCheckout} disabled={!sessionId}>
        Checkout
      </button>
    </div>
  );
}
*/
