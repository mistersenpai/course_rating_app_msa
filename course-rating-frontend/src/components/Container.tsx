import * as React from 'react';
import { Grid, Box, Paper } from '@mui/material';
import OutlinedCard from './DisplayCard';

const Container: React.FC = () => {
  const numberOfCards = 10; // Set the number of cards you want to display

  // Generate an array of OutlinedCard components
  const cardsArray = Array.from({ length: numberOfCards }, (_, index) => (
    <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
      <OutlinedCard />
    </Grid>
  ));

  return (
    <Box
      sx={{
        padding: '2%',
        backgroundColor: 'white',
        width: '100%%', // 100% - 2*6% padding on the sides
        maxWidth: '2000px', // so it doesnt look too weird with large displays
        margin: 'auto',
      }}
    >
      <Paper elevation={3} sx={{ padding: '2%' }}>
        <Grid container spacing={2} justifyContent="center" wrap="wrap">
          {cardsArray}
        </Grid>
      </Paper>
    </Box>
  );
};

export default Container;
