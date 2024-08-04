import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import reactLogo from '../assets/react.svg';
import viteLogo from '../../public/vite.svg';
import '../App.css';
import PrimarySearchAppBar from '../components/NavBar';
import UniversityData from '../utils/UniversityData';
import DepartmentPage from '../pages/DepartmentPage';
import DepartmentDetails from '../pages/DepartmentDetails';

function App() {
  const [count, setCount] = useState(0);

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
        <h1>Vite + React</h1>

        <Routes>
          <Route path="/" element={
            <>
              <UniversityData />
              <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                  count is {count}
                </button>
                <p>
                  Edit <code>pages/App.tsx</code> and save to test HMR
                </p>
              </div>
              <p className="read-the-docs">
                Click on the Vite and React logos to learn more
              </p>
            </>
          } />
          <Route path="/departments/:universityId" element={<DepartmentPage />} />
          <Route path="/department/:id" element={<DepartmentDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
