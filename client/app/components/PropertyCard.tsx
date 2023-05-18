import React, {useEffect, useState} from 'react';
import {Button, Card} from 'antd';

import Link from "next/link";
import {useSelector} from "react-redux";

const {Meta} = Card;
import ImageGallery from "@/app/components/ImageGallery";

const PropertyCard: React.FC = (props) => {
    const propertyId = useSelector(state => state.propertyCardSelected.propertyCardSelectedState)
    const {listing, id} = props
    const isSelected = listing.id === propertyId;
    const divStyle = {
        width: '75vw', marginTop: '3vw',marginBottom:'3vw', marginLeft: '10vw',
        backgroundColor: isSelected ? 'lightyellow' : 'white',
    };
    return (
        <>
            <Card
                hoverable
                style={divStyle}
            >
                <div  id={id} style={{display: 'flex', flexDirection: 'row'}}>

                    <ImageGallery propertyId={id}></ImageGallery>
                    <div style={{marginLeft: '4vw'}}>
                        <h1 style={{fontSize:'2vw'}}>{listing.title}</h1>
                        <h4>{listing.description.slice(0,150)+'...'}</h4>
                        <h3>£{listing.price} per month</h3>
                        <h3>{listing.numOfBathrooms} bathrooms</h3>
                        <Button style={{marginRight: '1vw'}}>Show on Map</Button>
                        <Button><Link href={'/PropertyPage/' + listing.id}>View
                            Details</Link></Button>
                    </div>
                </div>
            </Card>
        </>
    )
};

export default PropertyCard;

