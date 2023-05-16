import fetchListings from "@/app/ApiServices/backend/FetchListings";
import {useEffect} from "react";


export default function UserListings() {
    const userId = localStorage.getItem('userId')
    console.log(userId)
    let userListings = []
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
            userListings = await fetchListings(queryObject)
            console.log(userListings)
        }
        fetchData()
        
    })
        
    
    return (<h1>{userListings[0]}</h1>)
} 