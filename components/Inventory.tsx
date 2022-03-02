import React, { useEffect, useState } from 'react'
import { makeStyles, useTheme } from "@mui/styles"
import { useWallet } from '../services/providers/MintbaseWalletContext'
import { Button, Grid, Typography } from '@mui/material'
import { useLazyQuery } from '@apollo/client'
import { gql } from "apollo-boost"
import TokenCard from './Cards/TokenCard'

type Props = {}

const useStyles = makeStyles({
    root: {
        padding: "50px 75px",
    },
    title: {
        fontSize: 35,
        fontWeight: 600,
    },
})


const Inventory = (props: Props) => {
    const classes = useStyles();
    const { wallet, isConnected, details } = useWallet()
    const [tokens, setTokens] = useState(new Array());


    useEffect(() => {

        async function tokenFinder() {
            const account = await wallet?.api?.fetchAccount(details.accountId)
            setTokens(account?.data.token)
        }

        if (isConnected) {
            tokenFinder()
        }

    }, [wallet, isConnected, details])


    return (
        <Grid className={classes.root} container direction="row" spacing={4}>
            <Grid item xs={12}>
                <Typography className={classes.title} variant="h2" align="center">
                    Collection
                </Typography>
            </Grid>
            {isConnected && tokens.map((data, index: number) => (

                <TokenCard key={index} tokenId={data.id} thingId={data.thing.id} />
            ))}

        </Grid>

    )
}

export default Inventory