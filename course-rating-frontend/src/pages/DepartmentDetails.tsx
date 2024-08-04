import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Paper, Typography, Grid, Divider, Button } from '@mui/material';
import { Link } from 'react-router-dom';

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
        const response = await fetch(`http://localhost:5151/department/${id}`);
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
    <Box sx={{ padding: '2%', backgroundColor: 'white', width: '80%', margin: 'auto' }}>
      <Paper elevation={3} sx={{ padding: '2%' }}>
        <Typography variant="h4" component="div" gutterBottom>
          {department.name}
        </Typography>
        <Divider sx={{ marginY: 2 }} />
        <Typography variant="h6" component="div" gutterBottom>
          Courses
        </Typography>
        <Grid container spacing={2}>
          {department.courses.map((course) => (
            <Grid item xs={12} key={course.id}>
              <Paper elevation={3} sx={{ padding: 2, display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="div">
                    {course.courseId}: {course.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course.body}
                  </Typography>
                  <Button size="small" component={Link} to={`/course/${course.id}`}>
                    More
                  </Button>
                </Box>
                <Box sx={{ marginLeft: 2 }}>
                  <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                    <Typography variant="h6">Rating</Typography>
                    <Typography variant="h4" color="green">{course.rating}</Typography>
                  </Paper>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default DepartmentDetails;
