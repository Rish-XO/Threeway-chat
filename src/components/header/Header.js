import { Button, Container } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { logoutHandler } from "../../utils/store/authSlice";
import { useNavigate } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userType = localStorage.getItem("role");
  const logoutFunction = () => {
    dispatch(logoutHandler());
    navigate("/login");
  };
  return (
    <Container>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Welcome {userType}</h1>
        <div style={{ marginLeft: "auto" }}>
          <Button onClick={logoutFunction}>Logout</Button>
        </div>
      </div>
    </Container>
  );
}

export default Header;
