'use client'
import './page.css';
import NavBar from '../../components/NavBar'
import React, { useRef, useState, useEffect } from 'react'
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax'
//import star from './stars.svg'
import './page.css'
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
// import 'antd/dist/antd.css';
import profilePicture from './profile-picture.png'
import Image from 'next/image';
import { Button, Space } from "antd";
import ImageGallery from 'react-image-gallery';
//Check character limit and change pages accordingly
import Listing from '../../components/Listing'
import Footer from '@/app/Footer/page';
import NewNavBar from '@/app/NewNavBar/page';
import { createFavourite, deleteFavourite, getFavourites } from '@/app/ApiServices/backend/favouritesService';


import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ButtonMui from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IconButton } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import { useRouter } from 'next/router';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import SendIcon from '@mui/icons-material/Send';
import GetPropertyImages from "@/app/ApiServices/backend/getPropertyImages";

const ContentString: string = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ultrices metus eget purus tempor facilisis. Nam leo lorem, eleifend sit amet ligula et, consectetur finibus turpis. Vivamus a nisl sed lorem volutpat aliquam quis id ipsum. Donec eget sapien et diam posuere volutpat vitae in metus. Curabitur quis justo vel purus mattis sollicitudin. Nam nisi neque, iaculis eu mi in, sollicitudin dignissim nisl. Curabitur non nisi sed mi accumsan venenatis. Phasellus at dapibus dui. Cras erat neque, tempus sed urna sit amet, tempor vulputate elit.

Praesent vitae arcu felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu posuere dui. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas enim felis, lacinia quis lectus posuere, mattis eleifend eros. Nulla sit amet diam vestibulum, varius lacus eget, varius nunc. Fusce varius felis nunc, et malesuada lectus pharetra ut. Sed vel ante turpis. Aliquam erat volutpat. Maecenas nec dictum velit, eu malesuada ante. Vestibulum ut semper metus.

Sed quis mauris a leo convallis facilisis. Proin cursus vestibulum sem a mollis. Suspendisse facilisis posuere cursus. Ut ornare risus sed nisi dapibus aliquam. Maecenas quis purus dignissim, ullamcorper risus eu, bibendum augue. Sed ornare ante non commodo eleifend. Donec euismod aliquam neque nec gravida. Integer dapibus quam elementum, bibendum nulla ac, ullamcorper odio. Cras erat nibh, finibus et dictum at, feugiat nec elit. Phasellus tincidunt nisi et neque gravida mollis. Aenean ac odio eros. In fermentum finibus libero mattis venenatis.

Vivamus eget maximus nibh. Sed ultricies nulla a pretium vulputate. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam viverra sollicitudin nisi, a bibendum lorem tristique sed. Suspendisse sed mi lorem. Fusce eleifend lacus ac orci gravida, non ultrices nulla congue. Nunc non commodo elit, non mollis dui. Quisque sapien arcu, finibus id tellus nec, luctus vestibulum tortor. In sodales urna nec diam scelerisque efficitur sit amet vitae lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla faucibus magna quis feugiat lacinia.

Ut orci augue, laoreet non arcu et, pulvinar elementum lacus. Maecenas consequat, ipsum sit amet dapibus congue, justo erat vestibulum dolor, at rutrum elit eros ut urna. Nulla quis nunc sit amet urna malesuada fringilla eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris elit ipsum, efficitur id aliquet et, lobortis ut enim. Cras eget gravida risus. Aliquam semper nisi lectus, et gravida elit eleifend non. Interdum et malesuada fames ac ante ipsum primis in faucibus.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tincidunt mauris lacinia nisl sagittis convallis. Integer vel nisi eleifend, egestas ligula ut, elementum nibh. Curabitur blandit orci in felis condimentum, sit amet elementum mauris blandit. Donec sit amet ante facilisis, euismod arcu ac, tincidunt mi. Suspendisse potenti. Nullam nec euismod tortor. Phasellus in nulla a purus mattis imperdiet. Mauris id sagittis turpis. Suspendisse nec posuere metus, facilisis sodales odio. Aenean imperdiet ultricies venenatis. Cras auctor massa non mauris convallis convallis. Suspendisse lacinia est nec mauris malesuada condimentum.

Suspendisse in pulvinar felis. Donec nec ullamcorper ligula. Mauris magna elit, pretium eu ornare id, gravida a mi. Aliquam tincidunt mollis dolor, in consequat justo blandit eu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin rhoncus, lectus at facilisis lacinia, est ex lacinia tortor, suscipit pulvinar erat magna sed tortor. Sed facilisis congue ex sed placerat. Aliquam erat volutpat. Duis sed scelerisque lectus. ENDS HERE!!!`;

const SmallContentString: string = `Lorem Donec nec ullamcorper ligula. Mauris magna elit, pretium eu ornare id, gravida a mi. Aliquam tincidunt mollis dolor, in consequat justo blandit eu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin rhoncus, lectus at facilisis lacinia, est ex lacinia tortor, suscipit pulvinar erat magna sed tortor. Sed facilisis congue ex sed placerat. Aliquam erat volutpat. Duis sed scelerisque lectus. ENDS HERE!!!`;

const MyGallery = ({propertyId}) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        
        
        async function fetchImages(){
            let images =[]
            console.log(propertyId)
            const fetchedImages = await GetPropertyImages(propertyId)
            fetchedImages.forEach((image)=>{
                images.push({original:image.url,thumbnail:image.url})
            })
            setImages(images)
        }
        fetchImages()
        
       
    }, []);

    return <ImageGallery autoPlay={true} items={images} showBullets={true} />;
};


interface CardProps {
    title: string;
    content: string;
    currentUrl: string;
}

const Card: React.FC<CardProps> = ({ title, content, currentUrl }) => {
    const [copied, setCopied] = useState(false);
    //track visibility of snackbar/alert
    const [open, setOpen] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleClose = () => {
        setOpen(false);
        setSaved(false);
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText("localhost:3000/PropertyPage/" + currentUrl);
            setCopied(true);
            setOpen(true);
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    const handleSave = async () => {
        try {
            //save to favourites
            console.log('saving');
        } catch (error) {
            console.error('Failed to save:', error);
        }
    }

    const handleFavourite = async () => {
        try {
            //save to favourites
            console.log('favouriting');
            let userId = localStorage.getItem('userId');
            let listingId = Number(currentUrl);
            createFavourite(Number(userId), listingId);
        } catch (error) {
            console.error('Failed to favourite:', error);
        }
    }


    return (
        <div className="card">
            <Image src={profilePicture} alt={title} width={100} height={100} />
            <h1>{title}</h1>
            <p>{content}</p>

            <div className='cardButtons'>
                <Space direction="vertical" style={{ width: "100%", }}>
                    <ButtonMui variant="contained" endIcon={<SendIcon />} fullWidth={true} color="success">
                        Message Landlord
                    </ButtonMui>
                    <ButtonMui variant="contained" fullWidth={true}>
                        Book a Viewing
                    </ButtonMui>
                    <ButtonMui variant="contained" fullWidth={true}>
                        View Similar Properties
                    </ButtonMui>
                    <div className='shareSave'>
                        <ButtonMui variant="contained" startIcon={<ShareIcon />} onClick={handleCopy} fullWidth={true}>
                            Share
                        </ButtonMui>
                        <ButtonMui variant="contained" startIcon={<FavoriteBorderIcon />} fullWidth={true} color='secondary'
                            style={{ marginLeft: '5px' }} onClick={handleFavourite}>
                            Save
                        </ButtonMui>
                        <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
                            <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="success">
                                Link copied to clipboard
                            </MuiAlert>
                        </Snackbar>
                        <Snackbar open={saved} autoHideDuration={1000} onClose={handleClose}>
                            <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="success">
                                Saved Listing to Favourites
                            </MuiAlert>
                        </Snackbar>
                    </div>
                </Space>
            </div>
        </div>
    );
};

type Props = {
    params: {
        propertyId: string;
    };
};

export default function App({ params }: Props) {
    const parallax = useRef<IParallax>(null!)
    //this is the dynamic route of the property page
    let propertyId = params.propertyId;
    // useState true or false

    return (
        <body style={{}}>
            {/* < NavBar /> */}
            <NewNavBar />
            <div style={{
                display: 'flex', justifyContent: 'center', color: 'black',
                // backgroundImage: "url('https://images.pexels.com/photos/2904142/pexels-photo-2904142.jpeg')",
                // backgroundSize: 'cover',
                // paddingLeft: '100px',
                // paddingRight: '100px',
                backgroundColor: '#eff7fa',
            }}>
                <div style={{ width: '50%', marginTop: '50px', marginRight: '30px' }}>
                    <MyGallery propertyId ={propertyId} />
                    <p className='propertyDescription' style={{ fontSize: '20px' }}>
                        <Listing listingId={propertyId}></Listing>
                        Welcome to this charming London property located in the heart of the city. This beautifully designed home offers a perfect blend of modern elegance and classic style. With its spacious living areas and tasteful decor, you will feel right at home the moment you step through the door. The property features stunning views of the city skyline, providing a picturesque backdrop for your daily activities. Enjoy the convenience of the nearby amenities, including trendy cafes, fine dining restaurants, and vibrant shopping districts. The bustling city life is just a stone's throw away, allowing you to explore all that London has to offer. Don't miss the opportunity to make this remarkable property your own and experience the epitome of urban living in the vibrant capital city
                    </p>
                </div>
                <div style={{ width: '20%', marginTop: '30px' }}>
    
                    <div className="container">
                        <Card title="Mr LandLord" content="Give me your money." currentUrl={propertyId} />
                    </div>
                </div>
            </div>
            <Footer />
        </body>
    )
}
