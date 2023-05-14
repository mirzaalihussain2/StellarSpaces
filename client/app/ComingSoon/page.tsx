'use client'
import Image from 'next/image'
import './page.css'
import NewNavBar from '../NewNavBar/page'
import Footer from '../Footer/page'
import comingSoon from '../../public/comingsoon.jpeg'
import Link from 'next/link'

export default function ComingSoon() {
    return (
        <div>
            <NewNavBar />
            <div></div>
            <Image src={comingSoon} alt="Coming Soon" className="comingSoonImg" />
            <div className="middle">
                <h1>COMING SOON</h1>
                <hr />
                <Link href="/" className='homeLink'>Back to Home</Link>
            </div>
            <Footer />
        </div>
    )
}
