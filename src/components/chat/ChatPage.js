import React, { useContext, useEffect, useState } from "react";
import { Container, Grid, Paper, TextField, Button } from "@mui/material";
import "./ChatPage.css";
import { SocketContext } from "../../utils/socket/chatContext";
import { NavLink, useParams } from "react-router-dom";

function ChatPage() {
  const { roomID } = useParams();
  const [messageInput, setMessageInput] = useState("");
  const { messages, setMessages } = useContext(SocketContext);

  const handleSend = () => {
  };

  return (
    <Container>
      <NavLink to= "/dashboard">
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
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
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
