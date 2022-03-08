import { AppBar, Button, Toolbar, Link } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useWallet } from '../services/providers/MintbaseWalletContext'


const useStyles = makeStyles({
  appBar: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#FFF",
    height: 100,
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: "#00000025",
  },
  buttonContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
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
});

const Header = () => {
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
    <AppBar className={classes.appBar} position="relative" elevation={0}>
      <Toolbar>
        <div className={classes.buttonContainer} />
        <Link style={{ marginRight: 8 }} href="https://spartanblockchain.org/" variant="subtitle1" underline="none">
          Become a Spartan!
        </Link>
        <Link style={{ marginLeft: 8 }} href="http://localhost:3000/QrCheck" variant="subtitle1" underline="none">
          Are you invited?
        </Link>
        <div className={classes.buttonContainer}>
          <Button className={classes.button} size="large" onClick={handleConnect}>
            {isConnected ? "Disconnect" : "Connect"}
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header
