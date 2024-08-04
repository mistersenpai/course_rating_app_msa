import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Paper } from '@mui/material';
import DisplayCard from '../components/DisplayCard';

interface University {
  id: number;
  name: string;
}

const UniversityData: React.FC = () => {
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
        width: '88%',
        maxWidth: '1200px',
        margin: 'auto',
      }}
    >
      <Paper elevation={3} sx={{ padding: '2%' }}>
        <h2>University Page</h2>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          {universities.map((university) => (
            <DisplayCard key={university.id} id={university.id} name={university.name} learnMoreLink={`/departments`} />
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default UniversityData;
