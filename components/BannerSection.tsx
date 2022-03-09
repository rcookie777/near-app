import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material/styles'
import { Button, Grid, Typography } from '@mui/material'
import { useWallet } from '../services/providers/MintbaseWalletContext'

type Props = {}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        height: 200,
        backgroundColor: "#00000010",
    },
    title: {
        fontSize: 35,
        fontWeight: 600,
        marginBottom: 32,
        [theme.breakpoints.down("md")]: {
            fontSize: 30,
        },
    },
    button: {
        height: 55,
        width: 165,
        backgroundColor: "#FFF",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#4237C7",
        color: "#4237C7",
        textTransform: "none",
        fontSize: 18,
        fontWeight: 600,
    },
}))

const BannerSection = (props: Props) => {
    const classes = useStyles()
    const { wallet, isConnected, details } = useWallet()

    function handleConnect() {
        if (isConnected) {
            wallet?.disconnect()
            window.location.reload()
        } else {
            wallet?.connect({ requestSignIn: true })
        }
    }

    return (
        <Grid container className={classes.root} direction="column" justifyContent="center" alignItems="center">
            <Typography className={classes.title} variant="h4" align="center">
                {isConnected ? `Welcome, ${details.accountId}` : "Connect To Wallet"}
            </Typography>
            {!isConnected && (<Button className={classes.button} size="large" onClick={handleConnect}>
                Connect
            </Button>)}
        </Grid>
    )
}

export default BannerSection