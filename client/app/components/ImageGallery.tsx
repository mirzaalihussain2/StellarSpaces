import React, {useEffect, useState} from 'react';
import {Carousel} from 'antd';
import GetPropertyImages from "@/app/ApiServices/backend/getPropertyImages";

const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const ImageGallery: React.FC = ({propertyId}) => {
    const onChange = (currentSlide: number) => {
        console.log(currentSlide);
    };
    const [images, setImages] = useState([]);
    useEffect(() => {
        async function fetchImages() {
            const fetchedImages = await GetPropertyImages(propertyId);
            setImages(fetchedImages);
        }
        fetchImages();
    }, [propertyId]);
    return (
        <Carousel style={{width: '19vw', height: '16vw',marginTop:'1.5vw'}} afterChange={onChange}>
            {images.map((image) => {
                console.log(image.url)
                return (
                    <div >
                        <img style={{height:'16vw',width:'19'}} src={image.url}/>
                    </div>)
            })}
        </Carousel>
    );
};

export default ImageGallery;