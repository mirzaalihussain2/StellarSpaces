'use client'
import Image from 'next/image'
import styles from './page.module.css'

import Head from 'next/head'

import NavBar from '../components/NavBar'
import banner from '../../public/wood.jpg'
import Link from "next/link";
import {Button, Checkbox, Input} from "antd";
import FormItem from "antd/es/form/FormItem";
import {useState} from "react";

import {useDispatch, useSelector} from 'react-redux'
import {updateLocation} from "@/app/store/store";

export default function HomePage() {

    // const dispatch = useDispatch();
    // const location = useSelector((state) => state.location.location);
    //
    // function handleLocation(e) {
    //     const newLocation = e.target.value
    //     dispatch(updateLocation(newLocation))
    // }

    return (
        <>
            <NavBar></NavBar>
            <div className={styles.container}>
                <Head>
                    <title></title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                </Head>
                <header>
                    <Image style={{width: '100%'}} src={banner} alt='banner, shows image'/>
                    <h1 className={styles.tagline}>Where renters and landlords meet</h1>
                </header>
                <main>
                    <section className={styles.cardContainer}>
                        <div className={styles.card}>
                            <h2 className={styles.cardLabel}>Rent a space</h2>
                            <lottie-player src="https://assets9.lottiefiles.com/packages/lf20_DDeczlewjT.json"
                                           background="transparent" speed="1"
                                           style={{
                                               paddingTop: '10px',
                                               position: 'absolute',
                                               width: '40vw',
                                               height: '30vw'
                                           }}
                                           loop autoplay></lottie-player>
                            <FormItem value={location} label='Enter location'>
                                <Input onChange={(e) => {
                                    handleLocation(e)
                                }}></Input>
                            </FormItem>
                            or
                            <Checkbox>My current location</Checkbox>
                            <Link href={'/PropertySearch'} to={{
                                pathname: "/PropertySearch",
                                state: {location}
                            }} className={styles.cardButton}>View Properties</Link>
                        </div>
                        <div className={styles.card}>
                            <h2 className={styles.cardLabel}>List a space</h2>
                            <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_fwykef3x.json"
                                           background="transparent" speed="1"
                                           style={{
                                               paddingTop: '10px',
                                               position: 'absolute',
                                               width: '40vw',
                                               height: '30vw'
                                           }}
                                           loop autoplay></lottie-player>

                            <Link href={'/AddListing'} className={styles.cardButton}>Add Listing</Link>
                        </div>
                    </section>
                    <section className={styles.featured}>

                        <h2 className={styles.featuredLabel}>Featured properties</h2>

                        <div className={styles.carousel}>
                            <div className={styles.carouselCardFeatured}>
                                <img className={styles.carouselCardImage}
                                     src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                     alt="Image 1"/>
                                <h3>Title 1</h3>
                                <p>Location 1</p>
                            </div>
                            <div className={styles.carouselCardFeatured}>
                                <img className={styles.carouselCardImage}
                                     src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                     alt="Image 1"/>
                                <h3>Title 1</h3>
                                <p>Location 1</p>
                            </div>
                            <div className={styles.carouselCardFeatured}>
                                <img className={styles.carouselCardImage}
                                     src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                     alt="Image 1"/>
                                <h3>Title 1</h3>
                                <p>Location 1</p>
                            </div>
                            <div className={styles.carouselCardFeatured}>
                                <img className={styles.carouselCardImage}
                                     src="https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                     alt="Image 1"/>
                                <h3>Title 1</h3>
                                <p>Location 1</p>
                            </div>
                            <button className={styles.arrowButtonLeft}
                                    onClick={() => handleChangeFeatured(-1)}>&#8249;</button>
                            <button className={styles.arrowButtonRight}
                                    onClick={() => handleChangeFeatured(1)}>&#8250;</button>
                        </div>
                    </section>
                    <section className={styles.recentlyAdded}>
                        <h2 className={styles.recentlyAddedLabel}>Recently Added</h2>
                        <div className={styles.carousel}>
                            <div className={styles.carouselCardRecentlyAdded}>
                                <img className={styles.recentlyAddedImage}
                                     src="https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                     alt="Image 5"/>
                                <h3>Title 5</h3>
                                <p>Location 5</p>
                            </div>
                            <div className={styles.carouselCardRecentlyAdded}>
                                <img className={styles.recentlyAddedImage}
                                     src="https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                     alt="Image 5"/>
                                <h3>Title 5</h3>
                                <p>Location 5</p>
                            </div>
                            <div className={styles.carouselCardRecentlyAdded}>
                                <img className={styles.recentlyAddedImage}
                                     src="https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                     alt="Image 5"/>
                                <h3>Title 5</h3>
                                <p>Location 5</p>
                            </div>
                            <div className={styles.carouselCardRecentlyAdded}>
                                <img className={styles.recentlyAddedImage}
                                     src="https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                     alt="Image 5"/>
                                <h3>Title 5</h3>
                                <p>Location 5</p>
                            </div>
                            <button className={styles.arrowButtonLeft}
                                    onClick={() => handleChangeFeatured(-1)}>&#8249;</button>
                            <button className={styles.arrowButtonRight}
                                    onClick={() => handleChangeFeatured(1)}>&#8250;</button>
                        </div>
                    </section>
                </main>
            </div>
        </>
    )
}
