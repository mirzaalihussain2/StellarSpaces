'use client'
import NewNavBar from '../NewNavBar/page'
import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image';
import { Button, Space } from "antd";
import ImageGallery from 'react-image-gallery';
import getListing from '@/app/ApiServices/backend/getListing';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBath, faBed, faDog, faWarehouse, faSterlingSign, faHouse, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import './Listing.css';
import Draft from './Draft';

interface ListingProps {
    listingId: string;
}

export default function Listing(props: ListingProps) {
    //this is the dynamic route of the listing page
    const [listingData, setListingData] = useState(null);
    console.log(props.listingId);
    console.log(typeof props.listingId);
    useEffect(() => {
        const property = async function () {
            const listing = await getListing(props.listingId);
            setListingData(listing);
        }
        property();
    }, []);

    // console.log('This is the listing object', listingData);
    // console.log('this is the dynamic route of the listing page', listingId);

    //for now use optional chaining to get the properties
    console.log(listingData?.title);


    // if (listingData?.title) {
    //     let newListingData = listingData;
    //     setListingData(newListingData);
    // }

    return (
        <div>
            {listingData?.status === 'draft' && <Draft />}
            {/* <Draft /> */}
            {listingData?.featured === true && <div className="ribbon ribbon-top-left"><span>Featured</span></div>}
            <h3>£{listingData?.price}</h3>
            <h2>Overview</h2>
            <hr></hr>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <FontAwesomeIcon icon={faBed} /> Bedrooms:
                        </td>
                        <td>
                            <i aria-hidden="true" /> <strong>{listingData?.numOfBedrooms}</strong>
                        </td>
                        <td>
                            <FontAwesomeIcon icon={faBath} /> Bathrooms:
                        </td>
                        <td>
                            <i aria-hidden="true" /> <strong>{listingData?.numOfBathrooms}</strong>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <FontAwesomeIcon icon={faDog} /> Pets Allowed:
                        </td>
                        <td>
                            <i aria-hidden="true" /> <strong>{listingData?.petsAllowed ? 'Yes' : 'No'}</strong>
                        </td>
                        <td>
                            <FontAwesomeIcon icon={faWarehouse} /> Garage:
                        </td>
                        <td>
                            <i aria-hidden="true" /> <strong>{listingData?.hasGarage ? 'Yes' : 'No'}</strong>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <i aria-hidden="true" /> Price per week:
                        </td>
                        <td>
                            <strong><FontAwesomeIcon icon={faSterlingSign} />{listingData?.price / 4}</strong>
                        </td>
                        <td>
                            <FontAwesomeIcon icon={faHouse} />  Property Type:
                        </td>
                        <td>
                            <strong>{listingData?.propertyType}</strong>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <i aria-hidden="true" /> Address:
                        </td>
                        <td>
                            <FontAwesomeIcon icon={faLocationDot} /> <strong>{listingData?.addressStreetName}, {listingData?.addressCity}, {listingData?.addressPostCode}</strong>
                        </td>
                    </tr>
                </tbody>
            </table>
            <h2>Description</h2>
            <hr />
            <div>
                <b>
                    {listingData?.title ? listingData?.title : 'No title'}
                </b>
                <br />
                <br />
                {listingData?.description ? listingData?.description : 'No description'}
                <br />
            </div>
        </div>

    )

}