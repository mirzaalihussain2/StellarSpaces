export default async function GetPropertyImages(listingId: number) {
    console.log(listingId)
    try {
        const response = await fetch(`http://localhost:3010/images/listings/${listingId}/images/get`, {
            method: "GET"
        })
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
}
