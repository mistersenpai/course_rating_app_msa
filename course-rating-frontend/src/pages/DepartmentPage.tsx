import React, { useState, useEffect } from 'react';
import { Box, Paper } from '@mui/material';
import DisplayCard from '../components/DisplayCard';
import { useParams } from 'react-router-dom';

interface Department {
  id: number;
  name: string;
  universityId: number;
}

const DepartmentPage: React.FC = () => {
  const { universityId } = useParams<{ universityId: string }>();
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5151/department?universityId=${universityId}`);
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [universityId]);

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
        <h2>Browse Departments:</h2>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          {departments.map((department) => (
            <DisplayCard key={department.id} id={department.id} name={department.name} learnMoreLink={`/department`} />
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default DepartmentPage;
