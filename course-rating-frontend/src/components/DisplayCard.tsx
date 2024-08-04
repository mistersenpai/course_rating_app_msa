import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

interface DisplayCardProps {
  id: number;
  name: string;
  learnMoreLink: string;
}

const DisplayCard: React.FC<DisplayCardProps> = ({ id, name, learnMoreLink }) => {
  return (
    <Box sx={{ minWidth: 200, maxWidth: 200, margin: 'auto', mt: 2 }}>
      <Paper elevation={3}>
        <Card variant="outlined">
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Name
            </Typography>
            <Typography variant="h5" component="div">
              {name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              ID
            </Typography>
            <Typography variant="body2">
              More information can go here.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" component={Link} to={`${learnMoreLink}/${id}`}>
              Learn More
            </Button>
          </CardActions>
        </Card>
      </Paper>
    </Box>
  );
};

export default DisplayCard;
