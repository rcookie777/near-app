import { CircularProgress, Grid, Typography, Modal } from '@mui/material/'
import { List } from 'mintbase'
import React, { useState, useEffect } from 'react'
import { Theme } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import Image from 'next/image'
import { useWallet } from '../../services/providers/MintbaseWalletContext'

type Props = {
    tokenId: string,
    thingId: string,
    modalState: boolean,
    toggleModal: (state: boolean) => any,
    hasModalBeenOpened: boolean,
    setModalBeenOpened: (state: boolean) => any,
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        display: "flex",
        maxWidth: 350,
        minHeight: 350,
        paddingBottom: 16,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#4237C7",
        borderRadius: 10,
        boxShadow: "0px 10px 20px 3px #00000026",
    },
    imgContainer: {
        display: "flex",
        justifyContent: "center",
        minHeight: 250,
        borderRadius: 10,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderBottomStyle: "solid",
        borderBottomColor: "#00000050",
        borderBottomWidth: 2.0,
        overflow: "clip",
    },
    img: {
        borderRadius: 9,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,

    },
    descriptionTitle: {
        fontSize: 18,
        fontWeight: 600,
        lineHeight: 1.0,
        margin: "16px 16px 4px 16px"
    },
    descriptionText: {
        fontSize: 16,
        fontWeight: 400,
        lineHeight: 1.0,
        margin: "0px 16px 0px 16px",
        [theme.breakpoints.down("md")]: {
            fontSize: 13,
        },
        [theme.breakpoints.down(675)]: {
            fontSize: 11,
        },
    },
    circularProgressContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 350,
    },
}))

const TokenCard = (props: Props) => {
    const classes = useStyles()
    const { wallet, isConnected, details } = useWallet()
    const [tokenImage, setTokenImage] = useState("")
    const [isInventoryLoading, setInventoryLoading] = useState(true)

    useEffect(() => {

        async function thingFinder() {
            try {
                const thing = await wallet?.api?.fetchThingById(props.thingId)
                if (thing != undefined && thing?.data.thing.length > 0 && tokenImage == "") {
                    setTokenImage(thing?.data.thing[0].metadata.media);

                    const storeId = thing?.data.thing[0].storeId
                    if (storeId == "spartan.mintspace2.testnet" && !props.modalState && !props.hasModalBeenOpened) {
                        props.toggleModal(true)
                    }
                }

                setInventoryLoading(false)

            } catch (e: unknown) {
                setInventoryLoading(false)
                console.log("Failed to fetch thing by id")
            }

        }

        if (isConnected&& tokenImage == "") {
            thingFinder()
        }

    }, [wallet, isConnected, props, tokenImage])

    return (
        <Grid className={classes.root} item sm={6} xs={12}>
            {isInventoryLoading && (
                <div className={classes.circularProgressContainer}>
                    <CircularProgress />
                </div>
             )} 
             {!isInventoryLoading && (
                <Grid className={classes.card} container direction="column">
                    <div className={classes.imgContainer}>
                        {tokenImage != "" ? <Image className={classes.img} src={tokenImage} height={250} width={350} objectPosition="center center" objectFit="cover" alt={props.tokenId} /> : <div />}
                    </div>
                    <Typography className={classes.descriptionTitle} variant="subtitle1">
                        Token Id:
                    </Typography>
                    <Typography className={classes.descriptionText} variant="body1">{props.tokenId}</Typography>
                </Grid>
            )}
        </Grid>

    )
}

export default TokenCard