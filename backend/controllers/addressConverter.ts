
export default async function getLatLng(address:string) {
    const apiKey = 'AIzaSyAGpf3gwawGK3DfP6JwycdkT4G_okHONm4'
    try {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}&sensor=false`;
        const response = await fetch(url);
        const data = await response.json();
        const result = data.results[0];
        const { lat, lng } = result.geometry.location;
        return { lat, lng };
    } catch (e) {
        console.log(e)
    }
}



const addresses  = [
    "33-35 Brewer Street, London, W1F 0RJ",
    "18-20 Green Lanes, London, N16 9NB",
    "13-14 Leicester Square, London, WC2H 7NG",
    "32 London Bridge Street, London, SE1 9SG",
    "53-57 Tottenham Court Road, London, W1T 2EQ",
    "22-24 Bishopsgate, London, EC2N 4AJ",
    "1-3 Strand, London, WC2N 5EJ",
    "126-128 Camden High Street, London, NW1 0LU",
    "2-4 Langham Place, London, W1B 3DG",
    "52 New Bond Street, London, W1S 1SJ",
    "62-65 Chandos Place, London, WC2N 4HG",
    "31-33 Oxford Street, London, W1D 2DR",
    "31-35 Cochrane Street, London, NW8 7AJ",
    "5-7 Station Road, London, NW4 4PN",
    "40-42 Great Eastern Street, London, EC2A 3EP",
    "196-198 Tottenham Court Road, London, W1T 7PJ",
    "32-38 Scrutton Street, London, EC2A 4RQ",
    "1 Oxford Street, London, W1D 2DA",
    "12-14 Bedford Street, London, WC2E 9HE",
    "32-38 Piccadilly, London, W1J 0QJ",
    "19-23 Tottenham Court Road, London, W1T 1BJ",
    "21 New Globe Walk, London, SE1 9DT",
    "203-205 Tottenham Court Road, London, W1T 7PP",
    "1-5 Broadgate Circle, London, EC2M 2QS",
    "1 St Katharine's Way, London, E1W 1TW",
    "28-30 Pembridge Road, London, W11 3HL",
    "10-12 Exhibition Road, London, SW7 2HF",
    "56-58 Commercial Road, London, E1 1LP",
    "54-56 Great Eastern Street, London, EC2A 3QR",
    "10-12 New Fetter Lane, London, EC4A 1AZ",
    "92-94 Tottenham Court Road, London, W1T 4TR",
    "20 Bedford Street, London, WC2E 9HP",
    "8-10 New Fetter Lane, London, EC4A 1RS",
    "32-34 Earlham Street, London, WC2H 9LN",
    "54-56 Commercial Street, London, E1 6LT",
    "6-7 Langham Place, London, W1B 3DG",
    "48-50 Commercial Street, London, E1 6LT",
    "93-99 Upper Richmond Road, London, SW15 2TG",
    "59-61 Piccadilly, London, W1J 0DX",
    "29-31 Oxford Street, London, W1D 2DR",
    "33-35 Oxford Street, London, W1D 2DF"
] 
