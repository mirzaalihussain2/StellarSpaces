export async function CreateListing(listing) {
 

    try {

        const token = getCookie('token')

        const response = await fetch('http://localhost:3010/listings', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(listing)
        })
        return response.json();
    } catch (error) {
        console.error(error);
    }

}



export async function postImageURLs(URLs,listingId) {
    try {

        const token = getCookie('token')

        const response = await fetch(`http://localhost:3010/images/listings/${listingId}/images`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({URLs,listingId})
        })
        return response.json();
    } catch (error) {
        console.error(error);
    }

}

function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}