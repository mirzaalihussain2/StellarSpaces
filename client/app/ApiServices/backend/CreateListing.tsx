

export default async function CreateListing(listing) {

    try {
        console.log(listing)
        const response = await fetch ('http://localhost:3010/listings',{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(listing)
        })
        return response.json();
    } catch (error) {
        console.error(error);
    }

}
