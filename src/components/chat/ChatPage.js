import React, { useContext, useEffect, useState } from "react";
import { Container, Grid, Paper, TextField, Button } from "@mui/material";
import "./ChatPage.css";
import { SocketContext } from "../../utils/socket/chatContext";
import { NavLink, useParams } from "react-router-dom";
import socket from "../../utils/socket/socket";
import axios from "axios";

function ChatPage() {
  const { orderID } = useParams();
  const [message, setMessage] = useState("");
  const { messages, setMessages } = useContext(SocketContext);
  const userID = localStorage.getItem("userID");
  const role = localStorage.getItem("role");

  useEffect(() => {
    socket.emit("joinRoom", { orderID });
  }, [orderID]);

  const handleSend = async () => {
    console.log("current message is", message);
    socket.emit("chatMessage", { orderID, message });

    try {
      await axios.post("http://localhost:5000/saveMessage", {
        message,
        orderID,
        userID,
        role,
      });
    } catch (error) {
      console.log(error.message);
    }
    setMessage("");
  };

  // chat details fetching
  useEffect(() => {
    const getChats = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/getMessages/${orderID}`
        );
        console.log(response.data);
        setMessages(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    if (orderID) {
      getChats();
    }
  }, [orderID, setMessages]);
  

  return (
    <Container>
      <NavLink to="/dashboard">
        <Button>HOME</Button>
      </NavLink>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <Grid item xs={12} sm={8} md={6}>
          <Paper className="chat-content" elevation={3}>
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "10px",
                  backgroundColor: "#d9d4d4",
                  padding: "5px",
                }}
              >
                {typeof message === "object" ? (
                  <>
                    <p>From: {message.from} </p>
                    <p>To: {message.to} </p>
                    <p>Quantity: {message.quantity} </p>
                    <p>pickupAddress: {message.pickupAddress} </p>
                  </>
                ) : (
                  <p>{message}</p>
                )}
              </div>
            ))}
          </Paper>
          <div style={{ display: "flex", marginTop: "10px" }}>
            <TextField
              fullWidth
              variant="outlined"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSend}
              style={{ marginLeft: "10px" }}
            >
              Send
            </Button>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ChatPage;
