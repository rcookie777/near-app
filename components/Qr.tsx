import NavBar from './Navbar'
import { useWallet } from '../services/providers/MintbaseWalletContext'
import React, { useState } from "react";


const Qr = () => {
    const { wallet, isConnected, details } = useWallet()
    const [clickedButton, setClickedButton] = useState('')
    const buttonHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (!isConnected) return
        console.log(wallet?.api?.isTokenOwner(`wallet?.activeAccount?.accountId`, `0:spartantest.mintspace2.testnet`))
        //if (wallet?.api?.isTokenOwner(details.accountId, "0:spartanblockchain.mintspace2.testnet")) return (alert('Welcome to spartan blockchain'))
        if (!wallet?.api?.isTokenOwner(`wallet?.activeAccount?.accountId`, `0:spartantest.mintspace2.testnet`)) return (alert('Not invited'))
    };



    return <>
        <div className="bg-gray-100">
            <div className="container mx-auto flex flex-col items-center py-12 sm:py-24">
                <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col  mb-5 sm:mb-10">
                    {!isConnected && (
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-gray-800 font-black leading-7 md:leading-10">
                            Connect to wallet
                        </h1>
                    )}
                    {isConnected && (
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-gray-800 font-black leading-7 md:leading-10">
                            Hi, {wallet?.activeAccount?.accountId}
                        </h1>
                    )}
                    {/* See if your invited
                            <span className="text-green-700">,</span>
                            Click Here */}

                    <p className="mt-5 sm:mt-10 lg:w-10/12 text-gray-400 font-normal text-center text-sm sm:text-lg"></p>
                </div>
                <div className="flex justify-center items-center">
                    <button name="qr" onClick={buttonHandler} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 lg:text-xl lg:font-bold  rounded text-white px-4 sm:px-10 border border-indigo-700 py-2 sm:py-4 text-sm ">
                        {!isConnected && (
                            <p className="text-sm py-2 px-3">
                                Connect Wallet
                            </p>
                        )}
                        {isConnected && (
                            <p className="text-sm py-2 px-3">
                                Click me to enter
                                {/* Click here to enter {wallet?.activeAccount?.accountId} */}
                            </p>
                        )}
                    </button>
                </div>
            </div>
        </div>
    </>

}


export default Qr
