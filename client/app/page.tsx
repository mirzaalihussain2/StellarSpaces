'use client'
import Image from 'next/image'
import styles from './page.module.css'
import { useState, useEffect } from 'react'
import Login from './components/login'
import Head from 'next/head'
import Script from 'next/script'



export default function Home() {
  const [seen, setSeen] = useState(false);

  const togglePop = () => {
    setSeen(!seen);
  }
  // return (
  //   <div>
  //     <button onClick={togglePop}>Log In</button>
  //     {seen ? <Login toggle={togglePop} /> : null}
  //   </div>
  // )

  // ////////////////////////////////////////////////
  // useEffect(()=> {
  //   const script = document.createElement('script')
  //   script.src = "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
  //   document.head.appendChild(script);


  // },[]);

  return (

    <div className={styles.container}>
      <Head>
        <title></title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" />
      </Head>
      <header>
        <h1 className={styles.tagline}>Where renters and landlords meet</h1>
      </header>
      <main>
        <section className={styles.cardContainer}>
          <div className={styles.card}>
            <h2 className={styles.cardLabel}>Rent a space</h2>
            <lottie-player src="https://assets9.lottiefiles.com/packages/lf20_DDeczlewjT.json" background="transparent" speed="1" style={{ paddingTop: '10px', position: 'absolute', width: '40vw', height: '30vw' }} loop autoplay></lottie-player>
            <button className={styles.cardButton}>View properties</button>
          </div>
          <div className={styles.card}>
            <h2 className={styles.cardLabel}>List a space</h2>
            <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_fwykef3x.json" background="transparent" speed="1" style={{ paddingTop: '10px', position: 'absolute', width: '40vw', height: '30vw' }} loop autoplay></lottie-player>
            <button className={styles.cardButton}>Add Listing</button>
          </div>
        </section>
        <section className={styles.featured}>
          <h2 className={styles.featuredLabel}>Featured properties</h2>
          <div className={styles.carousel}>
            <div className={styles.carouselCardFeatured}>
              <img className={styles.carouselCardImage} src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Image 1" />
              <h3>Title 1</h3>
              <p>Location 1</p>
            </div>
            <div className={styles.carouselCardFeatured}>
              <img className={styles.carouselCardImage} src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Image 1" />
              <h3>Title 1</h3>
              <p>Location 1</p>
            </div>
            <div className={styles.carouselCardFeatured}>
              <img className={styles.carouselCardImage} src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Image 1" />
              <h3>Title 1</h3>
              <p>Location 1</p>
            </div>
            <div className={styles.carouselCardFeatured}>
              <img className={styles.carouselCardImage} src="https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Image 1" />
              <h3>Title 1</h3>
              <p>Location 1</p>
            </div>
          </div>

        </section>
        <section className={styles.recentlyAdded}>
          <h2>Recently Added</h2>
          <div className={styles.carouselCardRecentlyAdded}>
            <div className={styles['card-small']}>
              <img className={styles.recentlyAddedImage} src="https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Image 5" />
              <h3>Title 5</h3>
              <p>Location 5</p>
            </div>
            <div className={styles.carouselCardRecentlyAdded}>
              <img className={styles.recentlyAddedImage} src="https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Image 5" />
              <h3>Title 5</h3>
              <p>Location 5</p>
            </div>
            <div className={styles.carouselCardRecentlyAdded}>
              <img className={styles.recentlyAddedImage} src="image5.jpg" alt="Image 5" />
              <h3>Title 5</h3>
              <p>Location 5</p>
            </div>
            <div className={styles.carouselCardRecentlyAdded}>
              <img className={styles.recentlyAddedImage} src="image5.jpg" alt="Image 5" />
              <h3>Title 5</h3>
              <p>Location 5</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
