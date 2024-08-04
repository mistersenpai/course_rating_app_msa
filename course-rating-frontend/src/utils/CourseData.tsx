import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Paper, Typography, Chip, Grid, Divider, Avatar, List, ListItem, ListItemText, ListItemAvatar } from '@mui/material';

interface Course {
  id: number;
  name: string;
  courseId: string;
  body: string;
  rating: number;
  departmentId: number;
}

interface Review {
  id: number;
  title: string;
  rating: number;
  reviewText: string;
  reviewer: string;
}

const dummyReviews: Review[] = [
  {
    id: 1,
    title: "Easiest course on offer",
    rating: 4.3,
    reviewText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    reviewer: "User3908"
  },
  {
    id: 2,
    title: "Great introduction",
    rating: 4.0,
    reviewText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    reviewer: "User1234"
  },
  {
    id: 3,
    title: "Very informative",
    rating: 4.5,
    reviewText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    reviewer: "User5678"
  }
];

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
        <Typography variant="h3" component="div" gutterBottom>
          {course.courseId}: {course.name}
        </Typography>
        <Typography variant="h4" component="div" gutterBottom>
          {course.body}
        </Typography>
        <Typography variant='body1' align="left">
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        </Typography>

        <Box sx={{ marginTop: 4, marginBottom: 4 }}>
          <Typography variant="h6" component="div" gutterBottom>
            Course Score
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                <Typography variant="h6">Overall</Typography>
                <Typography variant="h4" color="green">{course.rating}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                <Typography variant="h6">Difficulty</Typography>
                <Typography variant="h4" color="green">4.5</Typography>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                <Typography variant="h6">Engagement</Typography>
                <Typography variant="h4" color="green">4.5</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ marginTop: 4, marginBottom: 4 }} />

        <Typography variant="h6" component="div" gutterBottom>
          User Reviews:
        </Typography>

        <List>
          {dummyReviews.map((review) => (
            <ListItem key={review.id} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={review.reviewer} src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={`${review.title} - Rating: ${review.rating}`}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {review.reviewText}
                    </Typography>
                    {" — " + review.reviewer}
                  </React.Fragment>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default CourseData;
