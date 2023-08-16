import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SearchPage() {
  const [searchType, setSearchType] = useState("orderID");
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("userID");

  const handleSearch = async () => {
    // console.log(currentUser);
    try {
      const response = await axios.post("http://localhost:5000/searchRooms", {
        searchType: searchType,
        searchValue: searchValue,
        currentUser: currentUser,
      });
      setSearchResults(response.data.orders);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Container>
      <Box sx={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
        <FormControl sx={{ marginRight: "20px" }}>
          <InputLabel>Search By</InputLabel>
          <Select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <MenuItem value="orderID">Order ID</MenuItem>
            <MenuItem value="from">From</MenuItem>
            <MenuItem value="to">To</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label={`Search by ${
            searchType === "orderID" ? "Order ID" : searchType
          }`}
          variant="outlined"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button
          sx={{ marginLeft: "20px" }}
          variant="contained"
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
      <Grid container justifyContent="center" style={{ marginTop: "20px" }}>
        <Grid item xs={12} md={7}>
          {searchResults.length > 0 ? (
            searchResults.map((item) => (
              <Paper
                key={item.order_id}
                sx={{ margin: "10px", padding: "20px", cursor: "pointer" }}
                onClick={() => {
                  // Handle navigation to the selected order's chat
                  navigate(`/chat/${item.order_id}`);
                }}
              >
                {item.order_id}
              </Paper>
            ))
          ) : (
            <Paper sx={{ margin: "10px", padding: "20px" }}>
              No orders found
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default SearchPage;
