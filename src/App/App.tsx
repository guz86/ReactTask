import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Results from '../Results';
import NotFound from '../NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Results />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
