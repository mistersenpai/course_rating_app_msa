import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import viteLogo from '../../public/vite.svg';
import '../App.css';
import PrimarySearchAppBar from '../components/NavBar';
import UniversityData from '../utils/UniversityData';
import DepartmentPage from '../pages/DepartmentPage';
import DepartmentDetails from '../pages/DepartmentDetails';
import CourseData from '../utils/CourseData';
import { Divider, Typography, Box, useMediaQuery, ThemeProvider, createTheme } from '@mui/material';
import React from 'react';

function App() {
  const [count, setCount] = useState(0);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <PrimarySearchAppBar />
        <Box sx={{ paddingTop: '64px', textAlign: 'center', color: 'text.primary' }}>
          <img src={viteLogo} className="logo" alt="Vite logo" />
          <Typography variant='h2'>Course Rater</Typography>
          <Divider sx={{ marginY: 2, borderColor: 'white' }} />
          <Routes>
            <Route path="/" element={<UniversityData />} />
            <Route path="/departments/:universityId" element={<DepartmentPage />} />
            <Route path="/department/:id" element={<DepartmentDetails />} />
            <Route path="/course/:id" element={<CourseData />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
