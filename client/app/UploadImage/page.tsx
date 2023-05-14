'use client'
import React, { useState } from 'react';
import './page.css';

interface ImageData {
    file: File;
    url: string;
}

const CloudinaryUpload: React.FC = () => {
    const [images, setImages] = useState<ImageData[]>([]);
    const [imageURLs, setImageURLs] = useState<string[]>([]);
    
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newImages: ImageData[] = [];
            for (let i = 0; i < e.target.files.length; i++) {
                const file = e.target.files[i];
                newImages.push({ file, url: URL.createObjectURL(file) });
            }
            setImages([...images, ...newImages]);
        }
    };

    const uploadImages = () => {
        console.log(images)
        images.forEach((image) => {
            const data = new FormData();
            data.append('file', image.file);
            data.append('upload_preset', 'StellarSpaces');
            data.append('cloud_name', 'dgwarr7v8');
            console.log(data)
            fetch('https://api.cloudinary.com/v1_1/dgwarr7v8/image/upload', {
                method: 'POST',
                body: data,
            })
                .then((resp) => resp.json())
                .then((data) => {
                    setImageURLs(prevImageURLs => [...prevImageURLs, data.url]);
                })
                .catch((err) => console.log(err));
        });
        console.log(imageURLs);
    };


    return (
        <div className="upload">
            <input type="file" onChange={handleImageChange} multiple />
            <button onClick={uploadImages}>
                Upload Images
            </button>
        </div>
    );
};

export default CloudinaryUpload;