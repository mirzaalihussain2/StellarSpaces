'use client'

import NavBar from "@/app/components/NavBar";
import AccountSideNavigation from "@/app/components/AccountSideNavigation";
import Footer from '../../Footer/page'
import UserListings from "@/app/components/UserListings";
import NewNavBar from "@/app/NewNavBar/page";
export default function AccountPage() {
    
    return (
        <>  
            <NewNavBar></NewNavBar>
            <AccountSideNavigation></AccountSideNavigation>
            <Footer></Footer>
        </>
        
    )
}