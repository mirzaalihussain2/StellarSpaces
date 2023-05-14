'use client'
import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import logo from '../../public/logo.png'
import Link from 'next/link';
import './page.css'

export default function NewNavBar() {
    return (
        <header className='navbar'>
            <ul className='navbar-ul'>
                <li>
                    <Link href="/">
                        <span>
                            <Image src={logo} alt="Logo" className='logo' />
                        </span>
                    </Link>
                </li>
            </ul>
            <ul>
                <li>
                    <Link href="/MyListings">
                        <span className='NavbarElement'>My Listings</span>
                    </Link>
                </li>
                <li>
                    <Link href="/Messages">
                        <span className='NavbarElement'>Messages</span>
                    </Link>
                </li>
                <li>
                    <Link href="/Bookings">
                        <span className='NavbarElement'>Bookings</span>
                    </Link>
                </li>
                <li>
                    <Link href="/Help">
                        <span className='NavbarElement'>Help</span>
                    </Link>
                </li>
                <li>
                    <Link href="/Dashboard">
                        <span className='NavbarElement'>Dashboard</span>
                    </Link>
                </li>
            </ul>
            <ul>
                <li>
                    <Link href="/Account">
                        <span className='NavbarElement'>Account</span>
                    </Link>
                </li>
                <li>
                    <Link href="/Favourites">
                        <span className='NavbarElement'>Favourites</span>
                    </Link>
                </li>
                <li>
                    <Link href="/SignOut">
                        <span className='NavbarElement'>Sign out</span>
                    </Link>
                </li>
            </ul>
        </header>
    )
}