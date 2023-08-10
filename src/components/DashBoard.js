import React, { Fragment, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Header from "./header/Header";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import axios from "axios";

function DashBoard() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const user = localStorage.getItem("userID");
  //   console.log("the current User is " , user);

  useEffect(()=>{
    if (!isLoggedIn) {
        navigate("/login");
      }
  },[isLoggedIn, navigate])

  useEffect(() => {
    const getRooms = async () => {
      try {
        const response = await axios.post("http://localhost:5000/getRooms", {
          user,
        });
        const orderDetails = response.data.orders
        console.log("all rooms orders", orderDetails);
        setOrders(orderDetails);
      } catch (error) {
        console.log(error.message);
      }
    };
    getRooms();
  }, [user]);

  const orderClickHandler = (id) => {
    navigate(`/chat/${id}`)
  }

  return (
    <Fragment>
      <Header />
      <br></br>
      <Container>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h4"> Your Messages</Typography>
          <div style={{ marginLeft: "auto" }}>
            <NavLink to="/newMessage">
              <Button variant="contained">New message</Button>
            </NavLink>
          </div>
        </Box>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={7}>
            {orders.length > 0 ? (
              orders.map((item) => (
                <Paper sx={{ margin: "10px", padding: "20px" }} onClick={() => orderClickHandler(item.room_id)}>
                  {item.post_id}
                </Paper>
              ))
            ) : (
              <Paper sx={{ margin: "10px", padding: "20px" }}>NO orders</Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}

export default DashBoard;
