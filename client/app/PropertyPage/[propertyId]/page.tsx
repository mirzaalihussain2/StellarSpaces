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
import Listing from '../../listings/[listingId]/page'
import Footer from '@/app/Footer/page';
import NewNavBar from '@/app/NewNavBar/page';

const ContentString: string = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ultrices metus eget purus tempor facilisis. Nam leo lorem, eleifend sit amet ligula et, consectetur finibus turpis. Vivamus a nisl sed lorem volutpat aliquam quis id ipsum. Donec eget sapien et diam posuere volutpat vitae in metus. Curabitur quis justo vel purus mattis sollicitudin. Nam nisi neque, iaculis eu mi in, sollicitudin dignissim nisl. Curabitur non nisi sed mi accumsan venenatis. Phasellus at dapibus dui. Cras erat neque, tempus sed urna sit amet, tempor vulputate elit.

Praesent vitae arcu felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu posuere dui. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas enim felis, lacinia quis lectus posuere, mattis eleifend eros. Nulla sit amet diam vestibulum, varius lacus eget, varius nunc. Fusce varius felis nunc, et malesuada lectus pharetra ut. Sed vel ante turpis. Aliquam erat volutpat. Maecenas nec dictum velit, eu malesuada ante. Vestibulum ut semper metus.

Sed quis mauris a leo convallis facilisis. Proin cursus vestibulum sem a mollis. Suspendisse facilisis posuere cursus. Ut ornare risus sed nisi dapibus aliquam. Maecenas quis purus dignissim, ullamcorper risus eu, bibendum augue. Sed ornare ante non commodo eleifend. Donec euismod aliquam neque nec gravida. Integer dapibus quam elementum, bibendum nulla ac, ullamcorper odio. Cras erat nibh, finibus et dictum at, feugiat nec elit. Phasellus tincidunt nisi et neque gravida mollis. Aenean ac odio eros. In fermentum finibus libero mattis venenatis.

Vivamus eget maximus nibh. Sed ultricies nulla a pretium vulputate. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam viverra sollicitudin nisi, a bibendum lorem tristique sed. Suspendisse sed mi lorem. Fusce eleifend lacus ac orci gravida, non ultrices nulla congue. Nunc non commodo elit, non mollis dui. Quisque sapien arcu, finibus id tellus nec, luctus vestibulum tortor. In sodales urna nec diam scelerisque efficitur sit amet vitae lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla faucibus magna quis feugiat lacinia.

Ut orci augue, laoreet non arcu et, pulvinar elementum lacus. Maecenas consequat, ipsum sit amet dapibus congue, justo erat vestibulum dolor, at rutrum elit eros ut urna. Nulla quis nunc sit amet urna malesuada fringilla eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris elit ipsum, efficitur id aliquet et, lobortis ut enim. Cras eget gravida risus. Aliquam semper nisi lectus, et gravida elit eleifend non. Interdum et malesuada fames ac ante ipsum primis in faucibus.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tincidunt mauris lacinia nisl sagittis convallis. Integer vel nisi eleifend, egestas ligula ut, elementum nibh. Curabitur blandit orci in felis condimentum, sit amet elementum mauris blandit. Donec sit amet ante facilisis, euismod arcu ac, tincidunt mi. Suspendisse potenti. Nullam nec euismod tortor. Phasellus in nulla a purus mattis imperdiet. Mauris id sagittis turpis. Suspendisse nec posuere metus, facilisis sodales odio. Aenean imperdiet ultricies venenatis. Cras auctor massa non mauris convallis convallis. Suspendisse lacinia est nec mauris malesuada condimentum.

Suspendisse in pulvinar felis. Donec nec ullamcorper ligula. Mauris magna elit, pretium eu ornare id, gravida a mi. Aliquam tincidunt mollis dolor, in consequat justo blandit eu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin rhoncus, lectus at facilisis lacinia, est ex lacinia tortor, suscipit pulvinar erat magna sed tortor. Sed facilisis congue ex sed placerat. Aliquam erat volutpat. Duis sed scelerisque lectus. ENDS HERE!!!`;

const SmallContentString: string = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ultrices metus eget purus tempor facilisis. Nam leo lorem, eleifend sit amet ligula et, consectetur finibus turpis. Vivamus a nisl sed lorem volutpat aliquam quis id ipsum. Donec eget sapien et diam posuere volutpat vitae in metus. Curabitur quis justo vel purus mattis sollicitudin. Nam nisi neque, iaculis eu mi in, sollicitudin dignissim nisl. Curabitur non nisi sed mi accumsan venenatis. Phasellus at dapibus dui. Cras erat neque, tempus sed urna sit amet, tempor vulputate elit.

Suspendisse ornare urna non erat maximus, elementum tempor lectus accumsan. Donec libero metus, dictum at pulvinar a, tristique eget erat. In ultrices ante nec turpis vehicula, eu dignissim lectus semper. Cras tincidunt tortor a dui fringilla, ac ultricies ante molestie. Aenean iaculis id urna quis vestibulum. Cras mollis neque nunc, ac venenatis nisl volutpat at. Suspendisse ut ligula sapien.

Suspendisse in pulvinar felis. Donec nec ullamcorper ligula. Mauris magna elit, pretium eu ornare id, gravida a mi. Aliquam tincidunt mollis dolor, in consequat justo blandit eu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin rhoncus, lectus at facilisis lacinia, est ex lacinia tortor, suscipit pulvinar erat magna sed tortor. Sed facilisis congue ex sed placerat. Aliquam erat volutpat. Duis sed scelerisque lectus. ENDS HERE!!!`;

const MyGallery = () => {
    const [images, setImages] = useState<{ original: string; thumbnail: string; }[]>([]);

    useEffect(() => {
        const images = [
            {
                original: 'https://lid.zoocdn.com/u/1200/900/2ccda3fda47807074a9a42796f8841aed4890605.jpg:p',
                thumbnail: 'https://lid.zoocdn.com/u/1200/900/2ccda3fda47807074a9a42796f8841aed4890605.jpg:p',
            },
            {
                original: 'https://lid.zoocdn.com/u/1200/900/9920efd25784e0048490c640e858f3254fb2237c.jpg:p',
                thumbnail: 'https://lid.zoocdn.com/u/1200/900/9920efd25784e0048490c640e858f3254fb2237c.jpg:p',
            },
            {
                original: 'https://lid.zoocdn.com/u/1600/1200/40e8ea52aefcf251bc70182ba6a4e8a6555517d3.jpg:p',
                thumbnail: 'https://lid.zoocdn.com/u/1600/1200/40e8ea52aefcf251bc70182ba6a4e8a6555517d3.jpg:p',
            },
            {
                original: 'https://lid.zoocdn.com/u/1200/900/44ace4ee113d6da2815a04485a5769e8dd7b5922.jpg:p',
                thumbnail: 'https://lid.zoocdn.com/u/1200/900/44ace4ee113d6da2815a04485a5769e8dd7b5922.jpg:p',
            },
            {
                original: 'https://lid.zoocdn.com/u/1200/900/d2cfa2b23871d5e07452159ee4d00fa6144cdc05.jpg:p',
                thumbnail: 'https://lid.zoocdn.com/u/1200/900/d2cfa2b23871d5e07452159ee4d00fa6144cdc05.jpg:p',
            },
            {
                original: 'https://lid.zoocdn.com/u/1200/900/f383f7849b2b4fd9e836a5bb3ada4384b26c77ee.jpg:p',
                thumbnail: 'https://lid.zoocdn.com/u/1200/900/f383f7849b2b4fd9e836a5bb3ada4384b26c77ee.jpg:p',
            }
        ];
        setImages(images);
    }, []);

    return <ImageGallery autoPlay={true} items={images} showBullets={true} />;
};


interface CardProps {
    title: string;
    content: string;
}

const Card: React.FC<CardProps> = ({ title, content }) => {
    return (
        <div className="card">
            <Image src={profilePicture} alt={title} width={100} height={100} />
            <h1>{title}</h1>
            <p>{content}</p>


            <Space direction="vertical" style={{ width: "100%", }}>
                <Button type="primary" htmlType="submit" block>
                    Message Landlord
                </Button>
                <Button type="primary" htmlType="submit" block>
                    Book a Viewing
                </Button>
                <Button type="primary" htmlType="submit" block>
                    Save to Favourites
                </Button>
                <Button type="primary" htmlType="submit" block>
                    Share Link
                </Button>
                <Button type="primary" htmlType="submit" block>
                    View Similar Properties
                </Button>
            </Space>
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
                display: 'flex', justifyContent: 'space-around', color: 'black',
                backgroundImage: "url('https://images.pexels.com/photos/2904142/pexels-photo-2904142.jpeg')",
                backgroundSize: 'cover',
                paddingLeft: '100px',
                paddingRight: '100px',
            }}>
                <div style={{ width: '65%', marginTop: '50px' }}>
                    <MyGallery />
                    <p className='propertyDescription' style={{ fontSize: '20px' }}>
                        <Listing></Listing>
                        STARTS HERE!!! {ContentString}
                    </p>
                </div>
                <div style={{ width: '30%', marginTop: '30px' }}>
                    <p className='propertyDescription' style={{ fontSize: '20px' }}>
                        Your Property ID is {propertyId}!
                        {SmallContentString}
                    </p>
                    <div className="container">
                        <Card title="Mr LandLord" content="Give me your money." />
                    </div>
                </div>
            </div>
            <Footer />
        </body>
    )
}
