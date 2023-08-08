import React from "react";
import { Button, Container, Grid, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const styles = {
  root: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  heading: {
    marginBottom: "1rem",
  },
  button: {
    margin: "0.5rem",
  },
};

function Home() {
  return (
    <div style={styles.root}>
      <Container>
        <Typography variant="h4" align="center" style={styles.heading}>
          Threeway Trade Chat
        </Typography>
        <Grid container justifyContent="center">
          <NavLink to="/signup">
            <Button variant="contained" color="primary" style={styles.button}>
              Signup
            </Button>
          </NavLink>
          <NavLink to= "/login">
            <Button variant="contained" color="secondary" style={styles.button}>
              Login
            </Button>
          </NavLink>
        </Grid>
      </Container>
    </div>
  );
}

export default Home;
