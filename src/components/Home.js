import React from "react";
import { Button, Container, Grid, Typography } from "@mui/material";

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
          <Button variant="contained" color="primary" style={styles.button}>
            Signup
          </Button>
          <Button variant="contained" color="secondary" style={styles.button}>
            Login
          </Button>
        </Grid>
      </Container>
    </div>
  );
}

export default Home;
