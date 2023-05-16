'use client'
import './page.css';
import NewNavBar from '../../NewNavBar/page'
import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image';
import { Button, Space } from "antd";
import ImageGallery from 'react-image-gallery';
import getListing from '@/app/ApiServices/backend/getListing';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBath, faBed, faDog, faWarehouse, faSterlingSign, faHouse, faLocationDot } from '@fortawesome/free-solid-svg-icons';


type Props = {
    params: {
        listingId: string;
    };
}


export default function App() {
    //this is the dynamic route of the listing page
    const [listingData, setListingData] = useState(null);
    const listingId = '1';

    useEffect(() => {
        const property = async function () {
            const listing = await getListing(listingId);
            setListingData(listing);
        }
        property();
    }, [listingId]);

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