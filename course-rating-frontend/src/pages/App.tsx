import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import reactLogo from '../assets/react.svg';
import viteLogo from '../../public/vite.svg';
import '../App.css';
import PrimarySearchAppBar from '../components/NavBar';
import UniversityData from '../utils/UniversityData';
import DepartmentPage from '../pages/DepartmentPage';
import DepartmentDetails from '../pages/DepartmentDetails';
import CourseData from '../utils/CourseData';
import { Divider, Typography, Box } from '@mui/material';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <PrimarySearchAppBar />

      <Box sx={{ paddingTop: '64px', textAlign: 'center', color: 'white' }}> {/* Ensure content is not hidden behind the fixed AppBar */}
        <img src={viteLogo} className="logo" alt="Vite logo" />
        <Typography variant='h2' sx={{ color: 'white' }}>Course Rater</Typography>

        <Divider sx={{ marginY: 2, borderColor: 'white' }} />
        
        <Routes>
          <Route path="/" element={
            <>
              <UniversityData />            
            </>
          } />
          <Route path="/departments/:universityId" element={<DepartmentPage />} />
          <Route path="/department/:id" element={<DepartmentDetails />} />
          <Route path="/course/:id" element={<CourseData />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
