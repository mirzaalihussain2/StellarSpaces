import { useStripe } from '@stripe/react-stripe-js';
import { Button } from 'antd';
import { createCheckoutSession } from '../ApiServices/backend/stripeService';

export default function StripePopUp({ listingId, setReady }: any) {
  const stripe = useStripe();

  const handleCheckout = async () => {
    console.log(listingId);
    const data = await createCheckoutSession(listingId);

    if (data && data.url) {
      window.location.href = data.url;
    }
  };

  return (
    <>
      <h1>TEst</h1>
      <Button
        onClick={() => {
          setReady(true);
        }}
      >
        No, fuck off
      </Button>
      <Button onClick={handleCheckout}>Pay now</Button>
    </>
  );
}
