'use client'

import NavBar from "@/app/components/NavBar";
import Map from '../components/Map'
import Footer from '../Footer/page'
import PropertySearchFilter from "@/app/components/PropertySearchFilter";
import PropertyList from "@/app/components/PropertyList";
import {useEffect} from "react";
import fetchListings from "@/app/ApiServices/backend/FetchListings";
import NewNavBar from "@/app/NewNavBar/page";

export default function PropertySearch() {
   
    
    return (
        <>
            <NewNavBar></NewNavBar>
            <Map></Map>
            <PropertySearchFilter></PropertySearchFilter>
            <PropertyList></PropertyList>
            <Footer></Footer>
        </>
    )
}