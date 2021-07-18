import React, { useState, useContext } from "react";
import {
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
} from "../../components/Material";
import AuthContext from "../../contexts/authContext";
import { Link, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import authService from "../../services/authService";
import helper from "../../utils/helper";
import decodeJwt from "jwt-decode";

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 250,
    maxWidth: 550,
    textAlign: "center",
    marginRight: 10,
    marginLeft: 10,
  },
}));

function Login({ handleLogin }) {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    id: "",
    password: "",
  });

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.id) return setError("ID is required.");
    if (!form.password) return setError("Password is required.");
    setError("");
    setLoading(true);

    try {
      const { data } = await authService.login(form.id, form.password);
      setLoading(false);
      handleLogin(decodeJwt(data.access_token));
      helper.setAccessToken(data.access_token);
      window.location.replace("/");
    } catch (ex) {
      setLoading(false);
      setError(ex.response.data.error);
    }
  };

  if (user) return <Redirect to="/" />;

  return (
    <Grid container direction="column" alignItems="center" justify="center">
      <Card className={classes.card}>
        <CardContent>
          <Typography
            variant="h5"
            style={{ marginBottom: 30, marginTop: 10, fontWeight: "bolder" }}
          >
            Sign In
          </Typography>
          {error && (
            <Alert severity="error" style={{ marginBottom: 20 }}>
              {error}
            </Alert>
          )}
          <form noValidate autoComplete="off">
            <TextField
              style={{ marginBottom: 15 }}
              id="id"
              label="ID"
              placeholder="email or username"
              variant="outlined"
              fullWidth
              type="text"
              color="secondary"
              size="small"
              onChange={handleFormChange}
            />
            <TextField
              style={{ marginBottom: 15 }}
              id="password"
              label="Password"
              placeholder="*******"
              variant="outlined"
              fullWidth
              type="password"
              color="secondary"
              size="small"
              onChange={handleFormChange}
            />
          </form>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleSubmit}
            style={{ textTransform: "none" }}
            disabled={loading}
          >
            Log In
          </Button>
        </CardContent>
      </Card>
      <Typography variant="body2" style={{ marginTop: 10 }}>
        Need an account?{" "}
        <Link to="/signup" style={{ textDecoration: "none" }}>
          Sign Up
        </Link>
      </Typography>
    </Grid>
  );
}

export default Login;
