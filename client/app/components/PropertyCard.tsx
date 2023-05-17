import React from 'react';
import {Button, Card} from 'antd';
import AddListingForm from "@/app/components/AddListingForm";
import Link from "next/link";
import {useSelector} from "react-redux";

const {Meta} = Card;

const PropertyCard: React.FC = (props) => {
    const propertyId = useSelector(state => state.propertyCardSelected.propertyCardSelectedState)
    const {listing,id} = props
    const isSelected = listing.id === propertyId;
    const divStyle = {
        
        width: '75vw', marginTop: '3vw',marginLeft:'10vw',
        
        backgroundColor: isSelected ? 'lightblue' : 'white',
    };
    return (
        <>
            <Card
                hoverable
                style= {divStyle}
            >
                <div id={id} style={{display: 'flex', flexDirection: 'row'}}>
                    <img style={{width: '20vw', borderRadius: '0.5vw'}}
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

