import {createCheckoutSession} from "@/app/ApiServices/backend/stripeService";
import {Button} from "antd";

export default function StripePopUp({listingId,setReady}) {
    
    
    return (
        <>
      <h1>TEst</h1>
            <Button onClick={() => {
               setReady(true)
            }}>No, fuck off</Button>
        <Button onClick={async () => {
            console.log(listingId)
            await createCheckoutSession(listingId)
        }}>Pay now</Button>
        </>
    );

} 