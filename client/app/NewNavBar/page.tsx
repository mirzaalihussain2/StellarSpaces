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
    const [current, setCurrent] = useState('mail');
    const [showLogin, setShowLogin] = useState(false);

    const togglePop = () => {
        setShowLogin(!showLogin);
    }

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
                        <span className='NavbarElement'>Sign Out</span>
                    </Link>
                </li>
                <li>
                    <button onClick={togglePop}>Sign in/ Sign up</button>
                </li>
            </ul>
            {showLogin ? <Login toggle={togglePop} /> : null}
        </header>
    )
}