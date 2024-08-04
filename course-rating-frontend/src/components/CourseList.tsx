import React from 'react';
import { Box, Paper, Typography, Button, Card, CardContent, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';

interface Course {
  id: number;
  name: string;
  courseId: string;
  body: string;
  rating: number;
  departmentId: number;
}

interface CourseListProps {
  courses: Course[];
}

const CourseList: React.FC<CourseListProps> = ({ courses }) => {
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
        {courses.map((course) => (
          <Card key={course.id} sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {course.courseId}: {course.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {course.body}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" component={Link} to={`/course/${course.id}`}>
                More
              </Button>
            </CardActions>
          </Card>
        ))}
      </Paper>
    </Box>
  );
};

export default CourseList;
