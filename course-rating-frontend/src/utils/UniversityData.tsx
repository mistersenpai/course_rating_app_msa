import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Typography, Grid, TextField, useMediaQuery, ThemeProvider, createTheme } from '@mui/material';
import UniDisplayCard from '../components/UniDisplayCard';

interface University {
  id: number;
  name: string;
}

const UniversityData: React.FC = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

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

  const filteredUniversities = universities.filter((university) =>
    university.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          padding: '2%',
          margin: 'auto',
          color: 'text.primary',
        }}
      >
        <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
          <Typography variant="h4" component="div" gutterBottom>
            University Page
          </Typography>
        </Box>

        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 4, backgroundColor: 'background.paper' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Grid container spacing={4} justifyContent="center">
          {filteredUniversities.map((university) => (
            <Grid item key={university.id}>
              <UniDisplayCard id={university.id} name={university.name} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default UniversityData;
