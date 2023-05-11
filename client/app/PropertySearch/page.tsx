'use client'

import NavBar from "@/app/components/NavBar";
import Map from '../components/Map'
export default function PropertySearch({location}) {
    console.log(location)
    return (
        <>
            <NavBar></NavBar>
            <Map></Map>
        </>
    )
}