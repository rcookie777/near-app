import React from 'react'
import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material/styles'
import { Button, Divider, Link, List, ListItem, SwipeableDrawer, Typography } from '@mui/material';
import { useWallet } from '../services/providers/MintbaseWalletContext'
import Image from 'next/image'

interface Props {
    drawerState: boolean;
    toggleDrawer: (state: boolean, isDrawer?: boolean) => any;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-end",
        marginBottom: 32,
    },
    title: {
        minHeight: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

    },
    sideMenuButton: {
        width: 250,
        height: 50,
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
    buttonText: {
        color: "#4237C7",
        fontSize: 16,
        fontWeight: 400,
        textTransform: "none",
    },
    paper: {
        height: "100%",
        display: "flex",
        width: 220,
        [theme.breakpoints.up("sm")]: {
            width: 280,
        },
    },
    link: {
        width: "100%",
        "&:hover": {
            backgroundColor: "lightblack",
        },
    },
}));

export default function SideMenu(props: Props) {
    const classes = useStyles();
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
        <div >
            <SwipeableDrawer
                anchor={"left"}
                open={props.drawerState}
                disableDiscovery={true}
                onClose={props.toggleDrawer(props.drawerState)}
                onClick={props.toggleDrawer(props.drawerState)}
                onOpen={props.toggleDrawer(props.drawerState)}
            >
                <div className={classes.title}>
                    <Image src="/sbs-logo.png" width={200} height={60} objectFit="contain" objectPosition="left center" alt="Spartan Blockchain" />
                </div>
                <Divider />
                <List>
                    <ListItem button className={classes.sideMenuButton}>
                        <Link rel="noopener" className={classes.link} href="https://spartanblockchain.org/" underline="none">
                            <Typography className={classes.buttonText} variant="button">
                                Become a Spartan!
                            </Typography>
                        </Link>
                    </ListItem>
                    <ListItem button className={classes.sideMenuButton}>
                        <Link rel="noopener" className={classes.link} href="/" underline="none">
                            <Typography className={classes.buttonText} variant="button">
                                Mint a Ticket
                            </Typography>
                        </Link>
                    </ListItem>
                    <ListItem button className={classes.sideMenuButton}>
                        <Link rel="noopener" className={classes.link} href="/Qr" underline="none">
                            <Typography className={classes.buttonText} variant="button">
                                Am I Invited?
                            </Typography>
                        </Link>
                    </ListItem>
                </List>
                <div className={classes.root}>
                    <Button className={classes.button} size="large" onClick={handleConnect}>
                        {isConnected ? "Disconnect" : "Connect"}
                    </Button>
                </div>
            </SwipeableDrawer>
        </div>
    );
}