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

function toRadians(degrees: number) {
    return degrees * (Math.PI / 180);
}

export function getSphericalDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    console.log(lat1)
    console.log(lat2)
    console.log(lon1)
    console.log(lon2)
    const earthRadiusKm = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadiusKm * c;
    return distance * 1000;

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




