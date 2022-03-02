import { Grid, Typography } from '@mui/material'
import { List } from 'mintbase'
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import Image from 'next/image'
import { useWallet } from '../../services/providers/MintbaseWalletContext'

type Props = {
    tokenId: string,
    thingId: string,
}

const useStyles = makeStyles({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        width: 350,
        paddingBottom: 16,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#4237C7",
        borderRadius: 10,
        boxShadow: "0px 10px 20px 3px #00000026",
    },
    imgContainer: {
        display: "flex",
        maxHeight: 250,
        borderRadius: 10,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderBottomStyle: "solid",
        borderBottomColor: "#00000050",
        borderBottomWidth: 2.0,
    },
    img: {
        borderRadius: 9,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,

    },
    descriptionText: {
        fontSize: 18,
        fontWeight: 600,
        lineHeight: 1.0,
        margin: "16px 16px 0px 16px"
    },
})

const TokenCard = (props: Props) => {
    const classes = useStyles()
    const { wallet, isConnected, details } = useWallet()
    const [tokenImage, setTokenImage] = useState("");

    useEffect(() => {

        async function thingFinder() {
            const thing = await wallet?.api?.fetchThingById(props.thingId)
            setTokenImage(thing?.data.thing[0].metadata.media);
        }

        if (isConnected) {
            thingFinder()
        }

    }, [wallet, isConnected, props])

    return (
        <Grid className={classes.root} item sm={6} xs={12}>
            <Grid className={classes.card} container direction="column">
                <div className={classes.imgContainer}>
                    {tokenImage != "" ? <Image className={classes.img} src={tokenImage} height={250} width={350} objectPosition="bottom center" objectFit="cover" alt={props.tokenId} /> : <div />}
                </div>
                <Typography className={classes.descriptionText} variant="subtitle1">
                    Token Id: <span><Typography style={{ fontSize: 16 }} variant="body1">{props.tokenId}</Typography></span>
                </Typography>
            </Grid>
        </Grid>

    )
}

export default TokenCard