import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SearchPage() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate()

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:5000/searchRooms', {
        searchType: 'orderID',
        searchValue: searchValue,
      });
      setSearchResults(response.data.orders);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
        <TextField
          label="Search by Order ID"
          variant="outlined"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Box>
      <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
        <Grid item xs={12} md={7}>
          {searchResults.length > 0 ? (
            searchResults.map((item) => (
              <Paper
                key={item.post_id}
                sx={{ margin: '10px', padding: '20px', cursor: 'pointer' }}
                onClick={() => {
                  // Handle navigation to the selected order's chat
                  navigate(`/chat/${item.post_id}`)
                }}
              >
                {item.post_id}
              </Paper>
            ))
          ) : (
            <Paper sx={{ margin: '10px', padding: '20px' }}>No orders found</Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default SearchPage;
