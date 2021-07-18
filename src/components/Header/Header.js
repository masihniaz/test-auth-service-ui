import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Button, Grid } from "../Material";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AuthContext from "../../contexts/authContext";
import authService from "../../services/authService";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  menuIconButton: {
    marginRight: theme.spacing(2),
    display: "none",
    [theme.breakpoints.down(600)]: {
      display: "block",
    },
  },
  loginButton: {
    marginLeft: 20,
    fontWeight: "bold",
    textTransform: "none",
  },
}));

function Header() {
  const classes = useStyles();
  const { user } = useContext(AuthContext);

  const handleLogout = async () => {
    authService.logout();
    window.location.replace("/");
  };

  return (
    <div className={classes.root}>
      <AppBar position="sticky" color="secondary">
        <Toolbar variant="dense">
          <Grid container alignItems="center" justify="flex-end">
            <Grid>
              {user ? (
                <Button
                  className={classes.loginButton}
                  variant="contained"
                  size="small"
                  color="primary"
                  onClick={handleLogout}
                >
                  <ExitToAppIcon style={{ marginRight: 10 }}></ExitToAppIcon>
                  Logout
                </Button>
              ) : null}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
