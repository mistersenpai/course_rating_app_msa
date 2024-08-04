import * as React from 'react';
import { Box, Paper } from '@mui/material';
import DisplayCard from './DisplayCard';

interface ContainerProps {
  items: { id: number; name: string }[];
  learnMoreLink: (id: number) => string;
}

const Container: React.FC<ContainerProps> = ({ items, learnMoreLink }) => {
  return (
    <Box
      sx={{
        padding: '2%',
        backgroundColor: 'white',
        width: '100%',
        maxWidth: '1200px',
        margin: 'auto',
      }}
    >
      <Paper elevation={3} sx={{ padding: '2%' }}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          {items.map((item) => (
            <DisplayCard key={item.id} id={item.id} name={item.name} learnMoreLink={learnMoreLink(item.id)} />
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default Container;
