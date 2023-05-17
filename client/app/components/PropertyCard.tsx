import React from 'react';
import {Button, Card} from 'antd';
import AddListingForm from "@/app/components/AddListingForm";
import Link from "next/link";

const {Meta} = Card;

const PropertyCard: React.FC = (props) => {
    const {listing} = props
    return (
        <>
            <Card
                hoverable
                style={{width: '95vw', marginTop: '3vw'}}
            >
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <img style={{width: '20vw', borderRadius: '1vw'}}
                         src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"></img>
                    <div style={{marginLeft: '4vw'}}>
                        <h1>{listing.title}</h1>
                        <h2>{listing.description}</h2>
                        <h3>£{listing.price} per month</h3>
                        <h3>{listing.numOfBathrooms} bathrooms</h3>

                        <Button style={{marginRight: '1vw'}}>Show on Map</Button>
                        <Button><Link href={'/PropertyPage/' + listing.id} >View
                            Details</Link></Button>


                    </div>
                </div>
            </Card>


        </>
    )
};

export default PropertyCard;

