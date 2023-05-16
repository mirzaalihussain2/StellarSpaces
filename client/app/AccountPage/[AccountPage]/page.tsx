'use client'

import NavBar from "@/app/components/NavBar";
import AccountSideNavigation from "@/app/components/AccountSideNavigation";
import Footer from '../../Footer/page'
import UserListings from "@/app/components/UserListings";
export default function AccountPage() {
    
    return (
        <>  
            <NavBar></NavBar>
            <AccountSideNavigation></AccountSideNavigation>
            <UserListings></UserListings>
            <Footer></Footer>
        </>
    )
}