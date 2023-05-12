'use client'

import NavBar from "@/app/components/NavBar";
import Map from '../components/Map'
import {selectLocationState,setLocationState} from "@/app/store/locationSlice";
import {useDispatch, useSelector} from 'react-redux'
import {useState} from "react";
import PropertySearchFilter from "@/app/components/PropertySearchFilter";


export default function PropertySearch() {
    const locationState = useSelector(state =>state.location.locationState)
    console.log(locationState)
    const [radiusState,SetRadiusState] =useState(null)
    
    return (
        <>
            <NavBar></NavBar>
            <Map>location={locationState} radius = {radiusState}></Map>
            <PropertySearchFilter></PropertySearchFilter>
        </>
    )
}