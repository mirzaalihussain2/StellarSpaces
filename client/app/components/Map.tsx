'use client'
import {useEffect} from "react";
import {useRef} from "react";

export default function Map(){
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
                zoom: 11
            });
            
        }, 50);
    }
    
    return (  
        
        <div ref={mapRef} style={{ height: '100vh', width: '100%' }}></div>

       )           
}