'use client'
import React, { useRef, useState, useEffect } from 'react'
import { AppstoreOutlined, HomeOutlined, LoginOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import Image from 'next/image'
import logo from '../../public/logo.png'
import Link from 'next/link';
import './page.css'
import Login from '../components/login';

export default function NewNavBar() {
    const [signedIn, setSignedIn] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    //non-dry repeats in ApiServices>backend>CreateListing.tsx
    function getCookie(name) {
        const value = "; " + document.cookie;
        const parts = value.split("; " + name + "=");
        if (parts.length === 2) return parts.pop().split(";").shift();
    }

    //non-dry repeats in componenets>login.tsx
    function handleSignout() {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        localStorage.removeItem('userId');
        
    }

    const token = getCookie('token');

    const toggleSignIn = () => {
        setSignedIn(!signedIn);
    }

    const togglePop = () => {
        setShowLogin(!showLogin);
    }

    const userId = localStorage.getItem('userId')
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
                {token ?
                    <>
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
                            <Link href={'/AccountPage/'+userId}>
                                <span className='NavbarElement'>Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/AccountPage/'+userId}>
                                <span className='NavbarElement'>Account</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/AccountPage/'+userId}>
                                <span className='NavbarElement'>Favourites</span>
                            </Link>
                        </li>
                    </>
                    : null
                }
            </ul>
            <ul>
                {/*<li>*/}
                {/*    <Link href="/PropertySearch">*/}
                {/*        <span className='NavbarElement'>Search</span>*/}
                {/*    </Link>*/}
                {/*</li>*/}
                <li>
                    <Link href="/Help">
                        <span className='NavbarElement'>Help</span>
                    </Link>
                </li>
                {token ?
                    <li>
                        <Link href="/">
                            <span className='NavbarElement' onClick={handleSignout}>Sign Out</span>
                        </Link>
                    </li>
                    :
                    <li>
                        <span className='NavbarElement' onClick={togglePop}>Sign in/ Sign up</span>
                    </li>
                }
            </ul>
            {showLogin ? <Login toggle={togglePop} toggleSignIn={toggleSignIn} /> : null}
        </header>
    )
}