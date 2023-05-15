

export default async function fetchListings(queryObject) {

    try {
   
        const response = await fetch ('http://localhost:3010/listings/filtered',{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(queryObject)
        })
        return response.json();
    } catch (error) {
        console.error(error);
    }
    
}
