'use client'
import './page.css';
import NavBar from '../components/NavBar'
import React, { useRef } from 'react'
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax'
//import star from './stars.svg'
import './page.css'
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
// import 'antd/dist/antd.css';
import profilePicture from './profile-picture.png'
import Image from 'next/image';
import { Button, Space } from "antd";

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

export default function App() {
    const parallax = useRef<IParallax>(null!)
    return (
        <>
            <div style={{ width: '100%', height: '100%', background: '#2596be' }}>
                <Parallax ref={parallax} pages={4}>
                    <ParallaxLayer offset={1} speed={1} style={{ backgroundColor: '#805E73' }} />
                    <ParallaxLayer offset={3} speed={1} style={{ backgroundColor: '#B2FFD6' }} />
                    <ParallaxLayer offset={0} speed={0} factor={3}
                        style={{
                            backgroundImage: 'url("https://awv3node-homepage.surge.sh/build/assets/stars.svg")',
                            backgroundSize: 'cover',
                        }}
                    />
                    <ParallaxLayer offset={0} speed={0}>
                        < NavBar />
                        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start', color: 'black' }}>
                            <div style={{ width: '65%' }}>
                                <img className='house' src={"https://i.imgur.com/y0l7pBS.jpeg"} />
                                <p className='propertyDescription' style={{ fontSize: '20px' }}>
                                    STARTS HERE!!!
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ultrices metus eget purus tempor facilisis. Nam leo lorem, eleifend sit amet ligula et, consectetur finibus turpis. Vivamus a nisl sed lorem volutpat aliquam quis id ipsum. Donec eget sapien et diam posuere volutpat vitae in metus. Curabitur quis justo vel purus mattis sollicitudin. Nam nisi neque, iaculis eu mi in, sollicitudin dignissim nisl. Curabitur non nisi sed mi accumsan venenatis. Phasellus at dapibus dui. Cras erat neque, tempus sed urna sit amet, tempor vulputate elit.

                                    Suspendisse ornare urna non erat maximus, elementum tempor lectus accumsan. Donec libero metus, dictum at pulvinar a, tristique eget erat. In ultrices ante nec turpis vehicula, eu dignissim lectus semper. Cras tincidunt tortor a dui fringilla, ac ultricies ante molestie. Aenean iaculis id urna quis vestibulum. Cras mollis neque nunc, ac venenatis nisl volutpat at. Suspendisse ut ligula sapien.

                                    Phasellus tempus quam ut dui egestas auctor. Vestibulum sollicitudin nulla nec pulvinar vestibulum. Aenean efficitur dapibus elit. Ut eu mauris orci. Sed blandit, nisi eget pretium interdum, neque orci sollicitudin neque, sit amet aliquet ex neque at risus. Donec vitae sapien lacus. Mauris pretium arcu vel odio consequat, eu faucibus odio viverra. In vestibulum augue id diam facilisis tristique. Donec sit amet rhoncus nibh. In non felis quis libero imperdiet vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis bibendum lectus diam, ut ullamcorper nunc feugiat ut. Aliquam tristique ligula ac est porta, vitae aliquam sapien lacinia. Suspendisse tempor at dolor id tristique.

                                    Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer commodo, orci ac consequat facilisis, odio nunc convallis ligula, in interdum erat leo eu ante. Curabitur ac facilisis odio. Nulla pellentesque volutpat ultrices. Ut et fringilla tellus. Curabitur eleifend condimentum mollis. Nam vitae mi in ligula sagittis tristique. Sed gravida tortor ut erat accumsan fringilla. Morbi ultricies mi quis molestie molestie. In id arcu nisi. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse faucibus aliquet mauris, maximus placerat orci. Cras fermentum maximus lacus at dignissim. Mauris accumsan nisl eu metus maximus aliquet. Mauris congue leo eget ullamcorper tincidunt. Maecenas aliquet egestas arcu sit amet porttitor.

                                    Donec accumsan ultrices fermentum. Praesent tempus metus ut turpis consectetur, a sagittis lectus ornare. Ut varius non velit non porttitor. Integer quam ipsum, auctor at purus ut, sollicitudin porttitor est. Morbi hendrerit rutrum ex, a sodales nulla cursus et. Maecenas at posuere odio, sed ullamcorper augue. Aenean laoreet nisi eu libero accumsan vulputate. Ut convallis nisi a arcu viverra, a commodo ligula accumsan. Suspendisse eget magna eu est volutpat tincidunt venenatis a nunc. Nunc eu risus augue.

                                    Donec vestibulum lorem ut tincidunt interdum. Donec interdum sodales erat quis sollicitudin. Donec in diam eget velit sollicitudin pellentesque. Proin scelerisque laoreet augue, a ornare lorem malesuada at. Vestibulum id lorem dapibus, luctus risus nec, vehicula eros. Donec sit amet tellus nec sem sagittis laoreet. Curabitur est nibh, ultrices non ligula ac, interdum rutrum nibh. Phasellus sit amet mollis erat, ac fermentum urna. In sed turpis tellus. Cras finibus auctor dui, non accumsan lectus facilisis rutrum. Maecenas dignissim risus vel interdum viverra. Fusce laoreet odio nec orci dictum semper. Nunc tincidunt purus libero, pretium eleifend augue pellentesque id. Quisque ornare nulla sed luctus hendrerit. Suspendisse convallis consequat dolor sodales pretium. Donec tempor semper turpis.

                                    Proin elit massa, consequat condimentum odio ac, gravida maximus eros. Fusce volutpat ex libero, elementum maximus massa vestibulum id. Sed id metus dolor. Nam ac justo augue. Etiam a finibus ante. Donec egestas aliquam odio at feugiat. Quisque enim turpis, porta a accumsan nec, pellentesque id mi. Aliquam dapibus mollis nisl ullamcorper venenatis. Integer tempus auctor orci laoreet sollicitudin. Sed consequat viverra scelerisque. Duis commodo mi vel orci interdum venenatis.

                                    Praesent vitae arcu felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu posuere dui. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas enim felis, lacinia quis lectus posuere, mattis eleifend eros. Nulla sit amet diam vestibulum, varius lacus eget, varius nunc. Fusce varius felis nunc, et malesuada lectus pharetra ut. Sed vel ante turpis. Aliquam erat volutpat. Maecenas nec dictum velit, eu malesuada ante. Vestibulum ut semper metus.

                                    Sed quis mauris a leo convallis facilisis. Proin cursus vestibulum sem a mollis. Suspendisse facilisis posuere cursus. Ut ornare risus sed nisi dapibus aliquam. Maecenas quis purus dignissim, ullamcorper risus eu, bibendum augue. Sed ornare ante non commodo eleifend. Donec euismod aliquam neque nec gravida. Integer dapibus quam elementum, bibendum nulla ac, ullamcorper odio. Cras erat nibh, finibus et dictum at, feugiat nec elit. Phasellus tincidunt nisi et neque gravida mollis. Aenean ac odio eros. In fermentum finibus libero mattis venenatis.

                                    Vivamus eget maximus nibh. Sed ultricies nulla a pretium vulputate. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam viverra sollicitudin nisi, a bibendum lorem tristique sed. Suspendisse sed mi lorem. Fusce eleifend lacus ac orci gravida, non ultrices nulla congue. Nunc non commodo elit, non mollis dui. Quisque sapien arcu, finibus id tellus nec, luctus vestibulum tortor. In sodales urna nec diam scelerisque efficitur sit amet vitae lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla faucibus magna quis feugiat lacinia.

                                    Ut orci augue, laoreet non arcu et, pulvinar elementum lacus. Maecenas consequat, ipsum sit amet dapibus congue, justo erat vestibulum dolor, at rutrum elit eros ut urna. Nulla quis nunc sit amet urna malesuada fringilla eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris elit ipsum, efficitur id aliquet et, lobortis ut enim. Cras eget gravida risus. Aliquam semper nisi lectus, et gravida elit eleifend non. Interdum et malesuada fames ac ante ipsum primis in faucibus.

                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tincidunt mauris lacinia nisl sagittis convallis. Integer vel nisi eleifend, egestas ligula ut, elementum nibh. Curabitur blandit orci in felis condimentum, sit amet elementum mauris blandit. Donec sit amet ante facilisis, euismod arcu ac, tincidunt mi. Suspendisse potenti. Nullam nec euismod tortor. Phasellus in nulla a purus mattis imperdiet. Mauris id sagittis turpis. Suspendisse nec posuere metus, facilisis sodales odio. Aenean imperdiet ultricies venenatis. Cras auctor massa non mauris convallis convallis. Suspendisse lacinia est nec mauris malesuada condimentum.

                                    Suspendisse in pulvinar felis. Donec nec ullamcorper ligula. Mauris magna elit, pretium eu ornare id, gravida a mi. Aliquam tincidunt mollis dolor, in consequat justo blandit eu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin rhoncus, lectus at facilisis lacinia, est ex lacinia tortor, suscipit pulvinar erat magna sed tortor. Sed facilisis congue ex sed placerat. Aliquam erat volutpat. Duis sed scelerisque lectus. ENDS HERE!!!
                                </p>
                            </div>
                            <div style={{ width: '30%' }}>

                                <p className='propertyDescription' style={{ fontSize: '20px' }}>
                                    STARTS HERE!!!
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ultrices metus eget purus tempor facilisis. Nam leo lorem, eleifend sit amet ligula et, consectetur finibus turpis. Vivamus a nisl sed lorem volutpat aliquam quis id ipsum. Donec eget sapien et diam posuere volutpat vitae in metus. Curabitur quis justo vel purus mattis sollicitudin. Nam nisi neque, iaculis eu mi in, sollicitudin dignissim nisl. Curabitur non nisi sed mi accumsan venenatis. Phasellus at dapibus dui. Cras erat neque, tempus sed urna sit amet, tempor vulputate elit.

                                    Suspendisse ornare urna non erat maximus, elementum tempor lectus accumsan. Donec libero metus, dictum at pulvinar a, tristique eget erat. In ultrices ante nec turpis vehicula, eu dignissim lectus semper. Cras tincidunt tortor a dui fringilla, ac ultricies ante molestie. Aenean iaculis id urna quis vestibulum. Cras mollis neque nunc, ac venenatis nisl volutpat at. Suspendisse ut ligula sapien.

                                    Suspendisse in pulvinar felis. Donec nec ullamcorper ligula. Mauris magna elit, pretium eu ornare id, gravida a mi. Aliquam tincidunt mollis dolor, in consequat justo blandit eu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin rhoncus, lectus at facilisis lacinia, est ex lacinia tortor, suscipit pulvinar erat magna sed tortor. Sed facilisis congue ex sed placerat. Aliquam erat volutpat. Duis sed scelerisque lectus. ENDS HERE!!!
                                </p>
                                <div className="container">
                                    <Card title="Mr LandLord" content="Message Landlord" />
                                </div>

                            </div>
                        </div>
                    </ParallaxLayer>
                </Parallax>
            </div>
        </>
    )
}
