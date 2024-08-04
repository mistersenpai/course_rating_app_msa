import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

interface Course {
  id: number;
  name: string;
  courseId: string;
  body: string;
  rating: number;
  departmentId: number;
}

interface Department {
  id: number;
  name: string;
  universityId: number;
  courses: Course[];
}

const DepartmentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [department, setDepartment] = useState<Department | null>(null);

  useEffect(() => {
    const fetchDepartmentDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5151/Department/${id}`);
        const data = await response.json();
        setDepartment(data);
      } catch (error) {
        console.error('Error fetching department details:', error);
      }
    };

    fetchDepartmentDetails();
  }, [id]);

  if (!department) {
    return <p>Loading...</p>;
  }

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
        <Typography variant="h4" component="div" gutterBottom>
          {department.name}
        </Typography>
        <Typography variant="h6" component="div" gutterBottom>
          Courses
        </Typography>
        <List>
          {department.courses.map((course) => (
            <ListItem key={course.id}>
              <ListItemText
                primary={`${course.courseId}: ${course.name}`}
                secondary={course.body}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default DepartmentDetails;
