import React, { useEffect, useState } from 'react'
import { makeStyles, useTheme } from "@mui/styles"
import { Theme } from '@mui/material/styles'
import { useWallet } from '../services/providers/MintbaseWalletContext'
import { Button, Grid, Modal, Typography } from '@mui/material'
import { useLazyQuery } from '@apollo/client'
import { gql } from "apollo-boost"
import TokenCard from './Cards/TokenCard'

type Props = {}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: "50px 75px",
        [theme.breakpoints.down(700)]: {
            padding: "50px 40px",
        },
    },
    title: {
        fontSize: 35,
        fontWeight: 600,
    },
    modal: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        backgroundColor: "yellow",
    },
}))


const Inventory = (props: Props) => {
    const classes = useStyles();
    const { wallet, isConnected, details } = useWallet()
    const [tokens, setTokens] = useState(new Array());
    const [isModalOpen, setModalState] = useState(false)
    const [hasModalBeenOpened, setModalBeenOpened] = useState(false)

    useEffect(() => {

        async function tokenFinder() {
            try {
                const account = await wallet?.api?.fetchAccount(details.accountId)
                if (account != undefined) {
                    setTokens(account?.data.token)
                }
            } catch (e: unknown) {
                console.log("Failed to fetch account")
            }

        }

        if (isConnected) {
            tokenFinder()
        }

    }, [wallet, isConnected, details, tokens])


    return (
        <Grid className={classes.root} container direction="row" spacing={4}>
            <Grid item xs={12}>
                <Typography className={classes.title} variant="h2" align="center">
                    Collection
                </Typography>
            </Grid>
            {isConnected && tokens.length > 0 && tokens.map((data, index: number) => (

                <TokenCard key={index} tokenId={data.id} thingId={data.thing.id} modalState={isModalOpen} toggleModal={setModalState} hasModalBeenOpened={hasModalBeenOpened} setModalBeenOpened={setModalBeenOpened} />
            ))}
            <Modal className={classes.modal} open={isModalOpen && !hasModalBeenOpened} onClose={() => {
                setModalState(false)
                setModalBeenOpened(true)
            }}>
                <Grid className={classes.modalContainer} container direction="column" justifyContent="center" alignItems="center">
                    <Typography variant="h3" align="center">
                        Can Not Wait To See You At SBIC!
                    </Typography>
                    <Button size="large">
                        Close
                    </Button>
                </Grid>
            </Modal>
        </Grid>

    )
}

export default Inventory