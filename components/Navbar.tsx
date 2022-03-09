import React, { useState } from 'react'
import { AppBar, Button, Toolbar, Link, IconButton } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from "@mui/styles"
import { Theme } from '@mui/material/styles'
import { useWallet } from '../services/providers/MintbaseWalletContext'
import Image from 'next/image'
import SideMenu from './SideMenu';


const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#FFF",
    height: 100,
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: "#00000025",
  },
  logo: {
    display: "flex",
    flex: 1,
  },
  buttonContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
    [theme.breakpoints.down("sm")]: {
      display: "none",
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
  link: {
    color: "#4237C7",
    margin: "0px 16px",
    [theme.breakpoints.down("sm")]: {
      display: "none",
      margin: 0,
    },
  },
  menuIcon: {
    height: 30,
    width: 30,
    color: "#000",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}))

const NavBar = () => {
  const classes = useStyles()
  const { wallet, isConnected, details } = useWallet()
  const [drawerState, setDrawerState] = useState(false);

  const toggleDrawer = (toggle: boolean, isDrawer: boolean = true) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event &&
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setDrawerState(!toggle);
  };

  function handleConnect() {
    if (isConnected) {
      wallet?.disconnect()
      window.location.reload()
    } else {
      wallet?.connect({ requestSignIn: true })
    }
  }

  return (
    <AppBar className={classes.appBar} position="relative" elevation={0}>
      <Toolbar>
        <div className={classes.logo}>
          <Image src="/sbs-logo.png" width={200} height={60} objectFit="contain" objectPosition="left center" alt="Spartan Blockchain" />
        </div>
        <Link className={classes.link} href="https://spartanblockchain.org/" variant="subtitle1" underline="none">
          Become a Spartan!
        </Link>
        <Link className={classes.link} href="/" variant="subtitle1" underline="none">
          Mint a Ticket
        </Link>
        <div className={classes.buttonContainer}>
          <Button className={classes.button} size="large" onClick={handleConnect}>
            {isConnected ? "Disconnect" : "Connect"}
          </Button>
        </div>
        <IconButton onClick={toggleDrawer(drawerState)}>
          <MenuIcon className={classes.menuIcon} />
        </IconButton>

      </Toolbar>
      <SideMenu drawerState={drawerState} toggleDrawer={toggleDrawer} />
    </AppBar>
  )
}

export default NavBar
