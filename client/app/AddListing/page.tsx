'use client'
import AddListingForm from '../components/AddListingForm'
import NavBar from "@/app/components/NavBar";
import Footer from '../Footer/page'

export default function AddListing() {
    return (
        <>
            <NavBar></NavBar>
            <AddListingForm></AddListingForm>
            <Footer></Footer>
        </>
    )
}