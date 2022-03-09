import { Wallet } from 'mintbase'
import {useForm} from 'react-hook-form'
import {useWallet} from '../services/providers/MintbaseWalletContext'
import { MetadataField } from 'mintbase'
import { makeStyles } from '@mui/styles'
import { Button, Grid, Typography, TextField } from '@mui/material'

type Props = {}

const useStyles = makeStyles({
    root: {
        height: 400,
        backgroundColor: "#00000010",
    },
    title: {
        fontSize: 35,
        fontWeight: 600,
        marginBottom: 32,
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
        margin: "16px 16px 0px 16px",
    },
})

const  Form = (props: Props) => {
    const classes = useStyles()
    const {wallet,isConnected,details} = useWallet()
    const {register, handleSubmit,formState: { errors },} = useForm()
    const onSubmit = async (data: any) => {
        if(!isConnected) return
        if(!wallet) return
        const coverImage = 'https://ipfs.io/ipfs/bafkreid5m5n7wcb64zqyiuhu4l3npv46x3sx3cilc5qy3jvxsjwchscmyu'
        // wallet?.minter?.setMetadata({
        //     title: data.Name,
        //     description: 'SBIC Ticket',
        //     media: coverImage,
        // })
        console.log(wallet.minter?.currentMint)
        wallet.makeOffer(
            "0:spartan.mintspace2.testnet",  
            "1000000000000000000000000",
            )
    }
    console.log(isConnected)
    return (<div className="w-full">
         <Grid container className={classes.root} direction="column" justifyContent="center" alignItems="center">
            <Typography className={classes.title} variant="h4" align="center">
                Mint a pass to SBIC!
            </Typography>
            {/* <TextField {...register('Name',{required: true})} id="filled-basic" label="Name" variant="filled" /> */}
                {isConnected ? (<Button className={classes.button} size="large" onClick={handleSubmit(onSubmit)}>Mint</Button>):(<Button className={classes.button} size="large" onClick={isConnected ? () => {wallet?.disconnect(); window.location.reload()}: () => {wallet?.connect({ requestSignIn: true })}}>Connect</Button>)}
        </Grid>
    </div>
    )
}

export default Form


