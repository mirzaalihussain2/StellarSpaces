'use client'
import React, { useRef, useState, useEffect } from 'react'
import './page.css'

export default function NewNavBar() {
    return (
        <header className="_1opucjz1 inherited-styles-for-exported-element">
            <div className="_1ljm00uj _1ljm00uw">
                <div className="g92dj60">
                    <div className="g92dj61">
                        <a
                            aria-live="polite"
                            className="x8jo560 x8jo562 x8jo56a _1ftx2fq8"
                            href="https://www.zoopla.co.uk/#main-content"
                        >
                            <div className="_1ljm00u7 _1ljm00u1n _1ljm00ur    ">
                                Skip to main content
                            </div>
                        </a>
                    </div>
                    <nav className="g92dj62" aria-label="main" data-testid="header">
                        <div className="g92dj6c">
                            <div className="g92dj6d">
                                <a
                                    href="https://www.zoopla.co.uk/"
                                    aria-label="Zoopla's Homepage"
                                    data-testid="zoopla-logo"
                                >
                                    <svg
                                        width={110}
                                        height={20}
                                        viewBox="0 0 110 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g xmlns="http://www.w3.org/2000/svg" clipPath="url(#a)">
                                            <path
                                                className="_1ujpbds0"
                                                d=""
                                            ></path>
                                        </g>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div className="g92dj6e">
                            <div className="    g92dj6f">
                                <div>
                                    <button
                                        className="g92dj63"
                                        aria-label="Open Menu"
                                        data-testid="header-mobile-hamburger"
                                        data-state="closed"
                                    >
                                        <svg className="_1n3szym1 _1n3szym9">
                                            <use href="https://www.zoopla.co.uk/#menu-medium" />
                                        </svg>
                                        <span className="_1ftx2fqc">Menu</span>
                                    </button>
                                </div>
                            </div>
                            <div className="g92dj6g">
                                <ul className="g92dj64 _1ftx2fq8">
                                    <li data-testid="header-menu0">
                                        <a
                                            href="https://www.zoopla.co.uk/for-sale/"
                                            className="dxqb3s0 dxqb3s3 dxqb3s5 dxqb3s8"
                                        >
                                            For sale
                                        </a>
                                    </li>
                                    <li data-testid="header-menu1">
                                        <a
                                            href="https://www.zoopla.co.uk/to-rent/"
                                            className="dxqb3s0 dxqb3s3 dxqb3s5 dxqb3s8"
                                        >
                                            To rent
                                        </a>
                                    </li>
                                    <li data-testid="header-menu2">
                                        <a
                                            href="https://www.zoopla.co.uk/house-prices/"
                                            className="dxqb3s0 dxqb3s3 dxqb3s5 dxqb3s8"
                                        >
                                            House prices
                                        </a>
                                    </li>
                                    <li data-testid="header-menu3">
                                        <a
                                            href="https://www.zoopla.co.uk/valuation/"
                                            className="dxqb3s0 dxqb3s3 dxqb3s5 dxqb3s8"
                                        >
                                            Agent valuation
                                        </a>
                                    </li>
                                    <li data-testid="header-menu4">
                                        <a
                                            href="https://www.zoopla.co.uk/home-values/"
                                            className="dxqb3s0 dxqb3s3 dxqb3s5 dxqb3s8"
                                        >
                                            Instant valuation
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className=" " style={{ gridArea: "headerright" }}>
                            <div className="_1ljm00u1n _1ljm00u1y _1ljm00us    ">
                                <ul className="g92dj65 _1ftx2fqc">
                                    <li className="g92dj66">
                                        <a
                                            href="https://www.zoopla.co.uk/my-home/"
                                            data-testid="my-home-mobile-link"
                                            className="dxqb3s0 dxqb3s3 dxqb3s4 dxqb3s5 "
                                        >
                                            <span className="ug0m3l0">
                                                <svg className="_1n3szym1 _1n3szym9">
                                                    <use href="https://www.zoopla.co.uk/#home-medium" />
                                                    <title>My Home</title>
                                                </svg>
                                            </span>
                                            <span style={{ gridRowStart: 2 }}>My Home</span>
                                        </a>
                                    </li>
                                    <li className="g92dj66">
                                        <a
                                            href="https://www.zoopla.co.uk/favourites/properties/"
                                            className="dxqb3s0 dxqb3s3 dxqb3s4 dxqb3s5 "
                                        >
                                            <span className="ug0m3l0">
                                                <svg className="_1n3szym1 _1n3szym9">
                                                    <use href="https://www.zoopla.co.uk/#save-medium" />
                                                    <title>Saved</title>
                                                </svg>
                                            </span>
                                            <span style={{ gridRowStart: 2 }}>Saved</span>
                                        </a>
                                    </li>
                                    <li className="g92dj66">
                                        <a
                                            href="https://www.zoopla.co.uk/signin/?page_after_login=%2Findex%2F&return_url=%2Findex%2F&with_confirmation=true"
                                            className="dxqb3s0 dxqb3s3 dxqb3s4 dxqb3s5 "
                                        >
                                            <span className="ug0m3l0">
                                                <svg className="_1n3szym1 _1n3szym9">
                                                    <use href="https://www.zoopla.co.uk/#user-medium" />
                                                    <title>Sign in</title>
                                                </svg>
                                            </span>
                                            <span style={{ gridRowStart: 2 }}>Sign in</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="_1ljm00u1v _1ljm00u1q _1ljm00us">
                                <ul className="g92dj64 _1ftx2fq8">
                                    <li className="g92dj68">
                                        <a
                                            href="https://www.zoopla.co.uk/my-home/"
                                            data-testid="my-home-desktop-link"
                                            className="dxqb3s0 dxqb3s3 dxqb3s5 dxqb3s8"
                                        >
                                            My Home
                                        </a>
                                    </li>
                                    <li className="g92dj68">
                                        <a
                                            href="https://www.zoopla.co.uk/favourites/properties/"
                                            className="dxqb3s0 dxqb3s3 dxqb3s5 dxqb3s8"
                                        >
                                            Saved
                                        </a>
                                    </li>
                                    <li className="g92dj68">
                                        <a
                                            href="https://www.zoopla.co.uk/signin/?page_after_login=%2Findex%2F&return_url=%2Findex%2F&with_confirmation=true"
                                            className="dxqb3s0 dxqb3s3 dxqb3s5 dxqb3s8"
                                        >
                                            Sign in
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>

    )
}