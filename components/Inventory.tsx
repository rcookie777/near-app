import React, { useEffect, useState } from 'react'
import { makeStyles, useTheme } from "@mui/styles"
import { useWallet } from '../services/providers/MintbaseWalletContext'
import { Typography } from '@mui/material'
import { useLazyQuery } from '@apollo/client'
import { gql } from "apollo-boost"

type Props = {}

const useStyles = makeStyles({

});


const Inventory = (props: Props) => {
    const classes = useStyles();
    const { wallet, isConnected, details } = useWallet()


    useEffect(() => {

        async function tokenFinder() {
            const account = await wallet?.api?.fetchTokenById("14:sbic.mintspace2.testnet")
            console.log(account)
            // const tokens = account?.data.token
            // for (var token of tokens) {
            //     console.log(token.id)
            // }
        }

        if (isConnected) {
            tokenFinder()
        }

    }, [wallet, isConnected])


    return (
        <div>
            {isConnected && (<Typography style={{ color: "black" }}>
                {details.balance}
            </Typography>)}
            {!isConnected && (<Typography style={{ color: "black" }}>
                Connect wallet to see inventory
            </Typography>)}
        </div>

    )
}

export default Inventory