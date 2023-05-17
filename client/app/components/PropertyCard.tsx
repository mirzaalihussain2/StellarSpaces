import React, {useEffect, useState} from 'react';
import {Button, Card} from 'antd';
import AddListingForm from "@/app/components/AddListingForm";
import Link from "next/link";
import {useSelector} from "react-redux";
import GetPropertyImages from "@/app/ApiServices/backend/getPropertyImages";
import ImageGallery from "react-image-gallery";

const {Meta} = Card;


const MyGallery = ({propertyId}) => {
    const [images, setImages] = useState([]);

    useEffect(() => {

        async function fetchImages() {
            let images = []
            console.log(propertyId)
            const fetchedImages = await GetPropertyImages(propertyId)
            if (fetchedImages) {
                fetchedImages.forEach((image) => {
                    images.push({original: image.url, thumbnail: image.url})
                })
                setImages(images)
            }

        }

        fetchImages()


    }, []);

    return <ImageGallery sizes={'1vw'}
                         renderItem={(item) => (
                             <div className="image-gallery-image">
                                 <img src={item.original} 
                                      style={{width: '20vw',maxHeight:'20vw'}}/>
                             </div>
                         )}

                        showNav={false} showThumbnails={false} showFullscreenButton={false} showPlayButton={false} items={images}
                         showBullets={true}/>;
};


const PropertyCard: React.FC = (props) => {
    const propertyId = useSelector(state => state.propertyCardSelected.propertyCardSelectedState)
    const {listing, id} = props
    const isSelected = listing.id === propertyId;
    const divStyle = {

        width: '75vw', marginTop: '3vw', marginLeft: '10vw',

        backgroundColor: isSelected ? 'lightyellow' : 'white',
    };
    return (
        <>
            <Card
                hoverable
                style={divStyle}
            >
                <div id={id} style={{display: 'flex', flexDirection: 'row'}}>
                    <MyGallery propertyId={id}></MyGallery>
                    <div style={{marginLeft: '4vw'}}>
                        <h1>{listing.title}</h1>
                        <h2>{listing.description}</h2>
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

