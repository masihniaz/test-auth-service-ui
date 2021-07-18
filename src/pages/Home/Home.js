import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/authContext";
import { Redirect } from "react-router-dom";
import {
  Grid,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "../../components/Material";
import { makeStyles } from "@material-ui/core/styles";
import authService from "../../services/authService";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function Home() {
  const classes = useStyles();
  const [error, setError] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const { user } = useContext(AuthContext);

  const getAllPermissions = async () => {
    try {
      const { data } = await authService.getAllPermissions();
      const permissionIds = data.map((permission) => permission.id);
      checkPermissions(permissionIds);
    } catch (ex) {
      setError("Failed to load permissions.");
    }
  };

  const checkPermissions = async (permissionIds) => {
    try {
      const { data } = await authService.checkPermissions(
        user.sub,
        permissionIds
      );
      setPermissions(data);
    } catch (ex) {
      setError("Failed to load permissions.");
    }
  };

  useEffect(() => {
    if (user) {
      getAllPermissions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!user) return <Redirect to="/login" />;

  return (
    <Grid container direction="column" alignItems="center" justify="center">
      {error && (
        <Alert severity="error" style={{ marginBottom: 20 }}>
          {error}
        </Alert>
      )}
      <TableContainer
        style={{ width: 580, textAlign: "center" }}
        component={Paper}
      >
        <Typography
          variant="h5"
          style={{ marginBottom: 30, marginTop: 10, fontWeight: "bolder" }}
        >
          Permissions
        </Typography>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Code</TableCell>
              <TableCell align="left">Allowed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {permissions.map((permission) => (
              <TableRow key={permission.id}>
                <TableCell component="th" scope="row">
                  {permission.id}
                </TableCell>
                <TableCell align="left">{permission.name}</TableCell>
                <TableCell align="left">{permission.code}</TableCell>
                <TableCell align="left">{permission.isAllowed}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default Home;
