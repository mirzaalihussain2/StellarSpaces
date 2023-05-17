import fetchListings from "@/app/ApiServices/backend/FetchListings";
import {useEffect, useState} from "react";
import {findUserById} from '../ApiServices/backend/localUserService'
import PropertyCard from "@/app/components/PropertyCard";


export default function UserProfile() {
    const [userProfile, setUserProfile] = useState([])
    const userId = localStorage.getItem('userId')
    console.log(userId)

    useEffect(() => {
        async function fetchData() {

            const userProfile = await findUserById(JSON.parse(userId))
            console.log(userProfile)
            setUserProfile(userProfile)
        }

        fetchData()
    }, [])


    return (
        <>
            <h1>Yest</h1>
        <h1>{userProfile.diplayName}</h1>
        <h2>{userProfile.email}</h2>
        <h2>{userProfile.DOB}</h2>
        </>
    );

} 