


export default async function uploadImages(images) {
    let imageURLS = []
    for (let image of images) {
        try{
            const data = new FormData();
            data.append('file', image);
            data.append('upload_preset', 'StellarSpaces');
            data.append('cloud_name', 'dgwarr7v8');

            const response = await fetch('https://api.cloudinary.com/v1_1/dgwarr7v8/image/upload', {
                method: 'POST',
                body: data,
            })
            const imageURL = await response.json()
            imageURLS.push(imageURL)
        }catch(e){
            console.log(e)
        }
    }
    return imageURLS
};
