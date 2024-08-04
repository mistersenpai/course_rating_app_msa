import * as React from 'react';
import { Grid, Box, Paper } from '@mui/material';
import DisplayCard from './DisplayCard';
import { useEffect, useState } from 'react';

interface University {
  id: number;
  name: string;
}

const Container: React.FC = () => {
  const [universities, setUniversities] = useState<University[]>([]);

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5151/university');
        const data = await response.json();
        setUniversities(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box
      sx={{
        padding: '2%',
        backgroundColor: 'white',
        width: '100%',
        maxWidth: '1200px', // Ensure maxWidth is reasonable
        margin: 'auto',
      }}
    >
      <Paper elevation={3} sx={{ padding: '2%' }}>
        <Grid container spacing={2} justifyContent="flex-start">
          
          {universities.map((university) => (
            <Grid item xs={12} sm={6} md={4} lg={-1} key={university.id}>
              <DisplayCard name={university.name} />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default Container;
