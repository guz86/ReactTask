import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Main } from './components/Main/Main';
import { UncontrolledForm } from './components/Uncontrolled/UncontrolledForm';
import ReactHookForm from './components/ReactHookForm/ReactHookForm';
import { Header } from './components/Header/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/uncontrolled-form" element={<UncontrolledForm />} />
        <Route path="/react-hook-form" element={<ReactHookForm />} />
      </Routes>
    </Router>
  );
}

export default App;
