'use client'
import Image from 'next/image'
import styles from './page.module.css'
import { useState, useEffect } from 'react'
import Login from './components/login'
import HomePage from './HomePage/page'

export default function Home() {
  const [seen, setSeen] = useState(false);

  const togglePop = () => {
    setSeen(!seen);
  }
  return (
    <div>
      <button onClick={togglePop}>Log In</button>
      {seen ? <Login toggle={togglePop} /> : null}
      <HomePage />
    </div>
  )
}
