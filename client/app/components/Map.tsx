'use client'
import {useEffect} from "react";
import {useRef} from "react";

export default function Map({radius,location}){
    let map;
    let google;
    const mapRef = useRef(null);
   
    useEffect(()=> {
        const apiKey = 'AIzaSyAGpf3gwawGK3DfP6JwycdkT4G_okHONm4'
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry&callback=initMap`;
        script.async = true;
        window.initMap = initMap;
        document.head.appendChild(script);
        console.log('test')
    },[]);

    async function initMap() {
        setTimeout(async () => {
            google = window.google
            map = new google.maps.Map(mapRef.current, {
                center: {lat: 59.95, lng: 30.33},
                zoom: 15
            });
            
            moveMapToLocation(location,radius)

            
        }, 50);
        
       
        
    }


    function moveMapToLocation(location,radius) {
        if(!radius) radius = 1000
        const geocoder = new google.maps.Geocoder();
        // Use the geocoder to get the latitude and longitude of the postcode
        geocoder.geocode({ address: location }, (results, status) => {
            if (status === "OK") {
                // Set the center of the map to the latitude and longitude of the postcode
                map.setCenter(results[0].geometry.location);
            } else {
                alert("Geocode was not successful for the following reason: " + status);
            }

            const circle = new google.maps.Circle({center:results[0].geometry.location,
                radius: radius,
                fillOpacity: 0.15,
                fillColor: "#FF0000",
                map: map});
        });
    }
    
    return (
        <div ref={mapRef} style={{ height: '40vw', width: '100%' }}></div>
       )           
}