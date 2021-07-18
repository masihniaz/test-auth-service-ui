import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Header } from "./components";
import { Grid } from "./components/Material";
import AuthContext from "./contexts/authContext";
import helper from "./utils/helper";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import { Home, Login, Signup, NotFound } from "./pages";

const useStyles = makeStyles((theme) => ({
  contentContainer: {
    marginRight: "auto",
    marginLeft: "auto",
    maxWidth: 1500,
    backgroundColor: "#eeeeee",
    height: "93vh",
    overflow: "scroll",
  },
}));

function App() {
  const classes = useStyles();
  const [user, setUser] = useState(helper.getUser());

  const handleLogin = (user) => {
    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ user }}>
      <Grid container>
        <Header />
        <Grid container className={classes.contentContainer}>
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route
              path="/login"
              exact={true}
              render={(props) => <Login {...props} handleLogin={handleLogin} />}
            />
            <Route path="/signup" exact={true} component={Signup} />
            <Route path="/not-found" exact={true} component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </Grid>
      </Grid>
    </AuthContext.Provider>
  );
}

export default App;
