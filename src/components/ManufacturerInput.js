import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Container,
} from "@mui/material";
import axios from "axios";
import Header from "./header/Header";
import socket from "../utils/socket/socket";
import { useNavigate } from "react-router-dom";

const generateOrderID = () => {
  const randomLetters = Math.random().toString(36).substr(2, 2).toUpperCase();
  const randomNumbers = Math.random().toString(10).substr(2, 3);
  return `${randomLetters}${randomNumbers}`;
};

const MInputForm = ({ onSubmit }) => {
  const [orderID, setOrderID] = useState(generateOrderID());
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [quantity, setQuantity] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [transporter, setTransporter] = useState("");
  const [transportersFromDB, setTransportersFromDB] = useState([]);

  const navigate = useNavigate();

  const user_id = localStorage.getItem("userID");
  //   console.log(user_id);

  useEffect(() => {
    try {
      const getAddress = async () => {
        const response = await axios.get(
          `http://localhost:5000/getAddress/${user_id}`
        );
        const address = response.data.address;
        const transporters = response.data.transporters;
        // console.log(address,response.data.transporters);
        setPickupAddress(address);
        setTransportersFromDB(transporters);
      };
      getAddress();
    } catch (error) {
      console.log(error.message);
    }
  }, [user_id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const message = {
      orderID,
      from,
      to,
      quantity,
      pickupAddress,
      transporter,
    };
    console.log(message);

    socket.emit("joinRoom", { orderID });
    console.log("joining the room");
    socket.emit("chatMessage", { orderID, message });


    // to create new orderID chat room
    const body = {ownerID: user_id, post_id: orderID, user_id: transporter, orderData: message}
    try {
        const response = await axios.post("http://localhost:5000/roomId", body);
        const roomID = response.data.roomID;
        console.log(roomID); 
        navigate(`/chat/${orderID}`);
      } catch (error) {
        console.log(error.message)
      }
     // Clear the form after sending
     setFrom("");
     setTo("");
     setQuantity("");
     setPickupAddress("");
     setTransporter("");
  };

  return (
    <>
      <Header />
      <Container maxWidth="sm" sx={{ marginTop: 10 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField label="Order ID" value={orderID} disabled />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="From"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="To"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Quantity</InputLabel>
                <Select
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                  fullWidth
                >
                  <MenuItem value={1}>1 ton</MenuItem>
                  <MenuItem value={2}>2 ton</MenuItem>
                  <MenuItem value={3}>3 ton</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Pickup Address"
                value={pickupAddress}
                onChange={(e) => setPickupAddress(e.target.value)}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Transporter</InputLabel>
                <Select
                  value={transporter}
                  onChange={(e) => setTransporter(e.target.value)}
                  required
                  fullWidth
                >
                  {transportersFromDB.map((item) => (
                    <MenuItem key={item.user_id} value={item.user_id}>
                      {item.firstname}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Send Request
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default MInputForm;
