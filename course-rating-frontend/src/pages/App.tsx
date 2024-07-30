import { useState } from 'react';
import reactLogo from '../assets/react.svg';
import viteLogo from '../../public/vite.svg';
import '../App.css';
import PrimarySearchAppBar from '../components/NavBar';
import Container from '../components/Container';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
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

        <Container />

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
      </div>
    </>
  );
}

export default App;
