import { Route, Routes } from 'react-router-dom';
import './App.css';
import Results from '../Results';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Results />} />
      </Routes>
    </>
  );
}

export default App;
