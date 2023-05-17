'use client'
import AddListingForm from '../components/AddListingForm'
import NavBar from "@/app/components/NavBar";
import Footer from '../Footer/page'
import NewNavBar from "@/app/NewNavBar/page";

export default function AddListing() {
    return (
        <>
            <NewNavBar></NewNavBar>
            <AddListingForm></AddListingForm>
            <Footer></Footer>
        </>
    )
}