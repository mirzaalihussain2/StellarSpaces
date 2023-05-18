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
         <div style={{marginLeft:'-35vw'}}> 
        <h1 style={{fontSize:'2vw'}}>{` name : ${userProfile.firstName} ${userProfile.lastName}`}</h1>
        <h3>{`email : ${userProfile.email}`}</h3>
         </div>
        </>
            
    );

} 