import {BrowserRouter, Routes, Route} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import SignupForm from './pages/SignupForm';
import Login from './pages/Login';
import Home from './pages/Home';
import JobForm from './pages/JobForm';


function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/signup" element={<SignupForm/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/jobForm" element={<JobForm />} />
            </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;
