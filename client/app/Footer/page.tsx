'use client'
import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import logo from '../../public/logo.png'
import Link from 'next/link';
import './page.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
    return (
        <footer className="openrent-footer inherited-styles-for-exported-element">
            <div className="content-wrapper">
                <div className="float-right">
                    <ul className="social-new">
                        <li>
                            <a href="/ComingSoon" target="_blank">
                                <FontAwesomeIcon icon={faFacebookF} />
                            </a>
                        </li>
                        <li>
                            <a href="/ComingSoon" target="_blank" >
                                <FontAwesomeIcon icon={faTwitter} />
                            </a>
                        </li>
                        <li>
                            <a href="/ComingSoon" target="_blank" >
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="float-left">
                    <p className="cppyright">© 2023 - 2023 Stellar Spaces Ltd.</p>
                    <div className="bottom-menu">
                        <ul>
                            <li>
                                <a href="#top">
                                    Back to Top
                                </a>
                            </li>
                            <li>
                                <a href="/ComingSoon">Blog</a>
                            </li>
                            <li>
                                <a href="/ComingSoon">Help Centre</a>
                            </li>
                            <li>
                                <a href="/ComingSoon">Community</a>
                            </li>
                            <li>
                                <a href="/ComingSoon">Terms</a>
                            </li>
                            <li>
                                <a href="/ComingSoon">Privacy</a>
                            </li>
                            <li>
                                <a href="/ComingSoon">Affiliates</a>
                            </li>
                            <li>
                                <a href="/ComingSoon">
                                    Testimonials
                                </a>
                            </li>
                            <li>
                                <a href="/ComingSoon">Press</a>
                            </li>
                            <li>
                                <a href="/ComingSoon">Jobs</a>
                            </li>
                        </ul>
                    </div>
                    <div className="bottom-address">
                        <a className="useChatIfPossible" href="/ComingSoon">
                            Ask Question
                        </a>
                        &nbsp;-
                        <div className="vcard">
                            <div className="fn org">OpenRent</div>
                            <div className="adr">
                                <div className="extended-address">Office 5,</div>
                                <div className="street-address">50 HorseFerry Road,</div>
                                <div>
                                    <span className="locality">London</span>,
                                    <span className="postal-code">SW1 2AA</span>
                                </div>
                                <div className="country-name">United Kingdom</div>
                            </div>
                            <div className="photo" style={{ display: "none" }}>
                                https://d10hbub4nkludc.cloudfront.net/images/logos/meta/share-graphic-2.jpg
                            </div>
                        </div>
                    </div>
                    <div className="extra-menu">
                        <ul>
                            <li>
                                <a href="/ComingSoon">
                                    Landlords
                                </a>
                            </li>
                            <li>
                                <a href="/ComingSoon">
                                    Tenants
                                </a>
                            </li>
                            <li>
                                <a href="/ComingSoon">
                                    Search Houses for Rent
                                </a>
                            </li>
                            <li>
                                <a href="/ComingSoon">
                                    Properties in London
                                </a>
                            </li>
                            <li>
                                <a href="/ComingSoon">
                                    Properties in the UK
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <span style={{ display: "none" }} id="isViewOptimised">
                ✔
            </span>
        </footer>

    )
}