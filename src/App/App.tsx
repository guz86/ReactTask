import { Route, Routes } from 'react-router-dom';
import './App.css';
import Results from '../Results';
import NotFound from '../NotFound';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Results />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
