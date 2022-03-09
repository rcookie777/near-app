import React, { useState } from "react";
import { useWallet } from '../services/providers/MintbaseWalletContext'
import NavBar from '../components/Navbar';
import BannerSection from '../components/BannerSection';
import Qr from '../components/Qr'
import Inventory from '../components/Inventory';



const QrCheck = () => {
    return <>
        <NavBar />
        <BannerSection />
        <Inventory />
    </>
}

export default QrCheck
