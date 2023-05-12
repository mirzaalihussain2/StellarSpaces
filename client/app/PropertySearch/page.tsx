'use client'

import NavBar from "@/app/components/NavBar";
import Map from '../components/Map'

import PropertySearchFilter from "@/app/components/PropertySearchFilter";
import PropertyList from "@/app/components/PropertyList";
export default function PropertySearch() {
   
    
    return (
        <>
            <NavBar></NavBar>
            <Map></Map>
            <PropertySearchFilter></PropertySearchFilter>
            <PropertyList></PropertyList>
        </>
    )
}