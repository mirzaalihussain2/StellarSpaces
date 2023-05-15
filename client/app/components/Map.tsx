'use client'
import {useEffect, useState} from "react";
import {useRef} from "react";
import {useSelector, useDispatch} from 'react-redux'
import {setRadiusState} from "@/app/store/radiusSlice";
import {setPropertyListState} from "@/app/store/propertyListSlice";
import isEqual from 'lodash/isEqual';




export default function Map() {
    const dispatch = useDispatch()
    let map;
    let google;
    const mapRef = useRef(null);

    const location = useSelector(state => state.location.locationState)
    const radius = useSelector(state => state.radius.radiusState)
    
    const listings = useSelector(state => state.propertyList.propertyListState)
   
   
    useEffect(() => {
            console.log('testDanB')
            const apiKey = 'AIzaSyAGpf3gwawGK3DfP6JwycdkT4G_okHONm4'
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry&callback=initMap`;
            script.async = true;
            window.initMap = initMap;
            document.head.appendChild(script);
            
    }, [listings]);  // map is re initialized when listings is updated 



    async function initMap() {
        setTimeout(async () => {
            google = window.google
            map = new google.maps.Map(mapRef.current, {
                center: {lat: 59.95, lng: 30.33},
                zoom: 12
            });
            moveMapToLocation(location)
            createHouseMarkers(listings)
        }, 50);

    }

    function calculateZoomLevel(radius) {
        console.log(radius)
        const zoomLevel = Math.log2((360 * 640 * 2 * 1000) / (256 * radius));
        console.log(zoomLevel)
        return Math.floor(zoomLevel) + 4.5
    }

    function createHouseMarkers(listings) {
        for (let listing of listings) {
            const latitude = listing.addressLatitude
            const longitude = listing.addressLongitude

            const marker = new google.maps.Marker({
                position: {lat: latitude, lng: longitude},
                map: map,
                icon: {
                    url: 'https://cdn-icons-png.flaticon.com/512/1670/1670080.png',
                    anchor: new google.maps.Point(25, 25),
                    scaledSize: new google.maps.Size(50, 30),
                },
            });
        }
    }

    async function moveMapToLocation(location) {
        let addressComponents
        let center
        const geocoder = new google.maps.Geocoder();
        // Use the geocoder to get the latitude and longitude of the postcode
        await geocoder.geocode({address: location}, (results, status) => {
            if (status === "OK") {
                // Set the center of the map to the latitude and longitude of the postcode
                addressComponents = results[0].address_components;
                center = results[0].geometry.location
            }
        })
        // Check if any address component has "locality" or "postal_code" type
        const isCity = addressComponents.some(component =>
            component.types.includes("locality")
        );
        const isPostalCode = addressComponents.some(component =>
            component.types.includes("postal_code")
        );
        if (!radius) {
            if (isCity) {
                dispatch(setRadiusState(16093.4))
            } else if (isPostalCode) {
                dispatch(setRadiusState(1609.34))
            }
        }
        const circle = new google.maps.Circle({
            center: center,
            radius: JSON.parse(radius),
            fillOpacity: 0.15,
            fillColor: "#FF0000",
            map: map
        });
        map.zoom = calculateZoomLevel(radius)
        map.setCenter(center);
    }

    return (
        <div ref={mapRef} style={{height: '40vw', width: '100%'}}></div>
    )
}