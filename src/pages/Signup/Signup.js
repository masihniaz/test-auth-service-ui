import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
} from "../../components/Material";
import { useHistory, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import authService from "../../services/authService";

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 250,
    maxWidth: 550,
    textAlign: "center",
    marginRight: 10,
    marginLeft: 10,
  },
}));

function Signup() {
  const classes = useStyles();
  const history = useHistory();
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const handleSubmit = async () => {
    if (!form.email) return setError("Email is required.");
    if (!form.username) return setError("Username is required.");
    if (!form.password) return setError("Password is required.");
    if (!form.passwordConfirm)
      return setError("Password confirmation is required.");
    if (form.password !== form.passwordConfirm)
      return setError("Passwords do not match");

    try {
      setError("");
      setLoading(true);
      await authService.signup(form);
      setSuccess(true);
      setTimeout(() => {
        history.push("/login");
      }, 2000);
    } catch (ex) {
      setError(ex.response.data.error);
    }

    setLoading(false);
  };

  return (
    <Grid container direction="column" alignItems="center" justify="center">
      <Card className={classes.card}>
        <CardContent>
          <Typography
            variant="h5"
            style={{ marginBottom: 30, marginTop: 10, fontWeight: "bolder" }}
          >
            Sign Up
          </Typography>
          {error && (
            <Alert severity="error" style={{ marginBottom: 20 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" style={{ marginBottom: 20 }}>
              Account created successfully, redirecting to login page...
            </Alert>
          )}
          <form noValidate autoComplete="off">
            <TextField
              style={{ marginBottom: 15 }}
              id="email"
              label="Email"
              variant="outlined"
              fullWidth
              type="email"
              color="secondary"
              size="small"
              onChange={handleFormChange}
            />
            <TextField
              style={{ marginBottom: 15 }}
              id="username"
              label="Username"
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
              variant="outlined"
              fullWidth
              type="password"
              color="secondary"
              size="small"
              onChange={handleFormChange}
            />
            <TextField
              style={{ marginBottom: 15 }}
              id="passwordConfirm"
              label="Confirm Password"
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
            Submit
          </Button>
        </CardContent>
      </Card>
      <Typography variant="body2" style={{ marginTop: 10 }}>
        Already have an account?{" "}
        <Link to="/login" style={{ textDecoration: "none" }}>
          Log In
        </Link>
      </Typography>
    </Grid>
  );
}

export default Signup;
