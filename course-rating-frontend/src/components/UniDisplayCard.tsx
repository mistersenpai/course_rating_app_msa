import * as React from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

interface UniDisplayCardProps {
  id: number;
  name: string;
}

const UniDisplayCard: React.FC<UniDisplayCardProps> = ({ id, name }) => {
  return (
    <Card sx={{ minWidth: 275, margin: 'auto', backgroundColor: 'white' }}>
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
        <Button size="small" component={Link} to={`/departments/${id}`}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default UniDisplayCard;
