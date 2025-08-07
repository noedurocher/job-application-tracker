<<<<<<< HEAD
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import SignupForm from './pages/SignupForm';
import Login from './pages/Login';
import Home from './pages/Home';
import JobForm from './pages/JobForm';


function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/signup" element={<SignupForm/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/jobForm" element={<JobForm />} />
        </Routes>
    </BrowserRouter>
=======
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
>>>>>>> saved-work
  );
}

export default App;
