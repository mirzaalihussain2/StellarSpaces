'use client'

import NavBar from "@/app/components/NavBar";
import AccountSideNavigation from "@/app/components/AccountSideNavigation";
import Footer from '../../Footer/page'
export default function AccountPage() {
    
    return (
        <>  
            <NavBar></NavBar>
            <AccountSideNavigation></AccountSideNavigation>
            <Footer></Footer>
        </>
    )
}