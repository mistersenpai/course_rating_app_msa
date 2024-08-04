import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Paper, Typography } from '@mui/material';

interface Course {
  id: number;
  name: string;
  courseId: string;
  body: string;
  rating: number;
  departmentId: number;
}

const CourseData: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5151/Course/${id}`);
        const data = await response.json();
        setCourse(data);
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    fetchCourseDetails();
  }, [id]);

  if (!course) {
    return <p>Loading...</p>;
  }

  return (
    <Box
      sx={{
        padding: '2%',
        backgroundColor: 'white',
        width: '80%',
        margin: 'auto',
      }}
    >
      <Paper elevation={3} sx={{ padding: '2%' }}>
        <Typography variant="h4" component="div" gutterBottom>
          {course.courseId}: {course.name}
        </Typography>
        <Typography variant="body1" component="div" gutterBottom>
          {course.body}
        </Typography>
        <Typography variant="body2" color="text.secondary" component="div" gutterBottom>
          Rating: {course.rating}
        </Typography>
      </Paper>
    </Box>
  );
};

export default CourseData;
