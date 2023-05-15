
export default async function getListing(listingId: string) {

    try {
        const response = await fetch(`http://localhost:3010/listings/${listingId}`, {
            method: "GET"
        })
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
}