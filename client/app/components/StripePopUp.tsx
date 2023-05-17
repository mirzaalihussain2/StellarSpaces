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
      <h2 style={{marginLeft:'27vw',marginTop:'5vw'}}>Would you like to pay for this property to be listed as Featured?</h2>
        <img style={{width:'30vw',marginLeft:'37vw'}} src ="https://thumbs.dreamstime.com/z/featured-product-vector-stamp-illustration-featured-product-vector-stamp-132790127.jpg"/>
        <div style={{marginTop:'7vw',marginBottom:'5vw',marginLeft:'40vw'}}>
        <h4 style={{position:'absolute',zIndex:'100',top:'40vw',left:'20vw',padding:'2vw',backgroundColor:'white'}}>*Featured houses will be presented on the homepage, and will always appear first when tennats search for a property</h4>
      <Button style={{marginRight:'3vw'}}
        onClick={() => {
          setReady(true);
        }}
      >
       No thanks, I'm good
      </Button>
      <Button onClick={handleCheckout}>Yes, pay now</Button>
        </div>
    </>
  );
}
