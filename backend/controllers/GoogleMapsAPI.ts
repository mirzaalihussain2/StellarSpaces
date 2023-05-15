const apiKey = 'AIzaSyAGpf3gwawGK3DfP6JwycdkT4G_okHONm4'

export async function getLatLng(address: string) {
    try {
      
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}&sensor=false`;
        const response = await fetch(url);
        const data = await response.json();
        const result = data.results[0];
        const {lat, lng} = result.geometry.location;
        return ({lat, lng});
    } catch (e) {
        console.log(e)
    }
}

export async function getSphericalDistance(listingPos:any,centerPos :any) {
    try {
        const listingCoords = `${listingPos.lat},${listingPos.lng}`;
        const centerCoords = `${centerPos.lat},${centerPos.lng}`;
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${listingCoords}&destinations=${centerCoords}&key=${apiKey}`;
        const response = await fetch(url);
        const responseData = await response.json();
        const distance = responseData.rows[0].elements[0].distance.value;
        return distance;
    } catch (e) {
        console.log(e)
    }
}



//
// async function determineDefaultRadius(locationInput) {
//     try {
//         const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(locationInput)}&key=${apiKey}&sensor=false`;
//         const response = await fetch(url);
//         const data = await response.json();
//         const result = data.results[0];
//         const types = result.types;
//         if (types.includes('locality') || types.includes('administrative_area_level_3')) {
//             // Input corresponds to a city
//             return 10;
//         } else if (types.includes('postal_code')) {
//             // Input corresponds to a postal code
//             return 1;
//         }
//     } catch (error) {
//         console.error('Error geocoding address:', error);
//         throw error;
//     }
// }
//
// export async function filterHousesOnRadius(){
//    
// }




