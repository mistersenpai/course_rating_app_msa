import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reactLogo from '../assets/react.svg';
import viteLogo from '../../public/vite.svg';
import '../App.css';
import PrimarySearchAppBar from '../components/NavBar';
import Container from '../components/Container';
import DepartmentPage from '../pages/DepartmentPage'; // Create this component

function App() {
  return (
    <Router>
      <PrimarySearchAppBar />
      <div style={{ paddingTop: '64px' }}> {/* Ensure content is not hidden behind the fixed AppBar */}
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Course Rater</h1>

        <Routes>
          <Route path="/" element={<Container />} />
          <Route path="/department" element={<DepartmentPage />} />
        </Routes>

        <div className="card">
          <button>
            count is 0
          </button>
          <p>
            Edit <code>pages/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </Router>
  );
}

export default App;
