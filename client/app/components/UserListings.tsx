import fetchListings from "@/app/ApiServices/backend/FetchListings";
import {useEffect, useState} from "react";

import PropertyCard from "@/app/components/PropertyCard";


export default function UserListings() {
    const [userListings,setUserListings] =useState([])
    const userId = localStorage.getItem('userId')
    console.log(userId)

    useEffect(()=>{
        async function fetchData(){
            const queryObject = {
                priceMin: null,
                priceMax: null,
                numOfBedroomsMin: null,
                numOfBedroomsMax: null,
                numOfBathroomsMin: null,
                numOfBathroomsMax: null,
                petsAllowed: 0,
                hasGarage: 0,
                status: [],
                propertyType: [],
                userId,
                radius:'16093.4',
                location:'london',

            }
            const userListings = await fetchListings(queryObject)
            setUserListings(userListings)
            console.log(userListings)
        }
        fetchData()

    },[])


    return (


        <div>
            {userListings.map((listing, index) => (
                <div key={index}>
                    <PropertyCard listing = {listing}></PropertyCard>
                </div>
            ))}
        </div>

    );

} 