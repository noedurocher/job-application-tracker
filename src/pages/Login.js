import {useState} from 'react';
import axios from 'axios';
import '../css/style.css';
import {Link, useNavigate} from 'react-router-dom';

function Login(){

    const [form, setForm] = useState({
        username:'',
        password:''
    });

    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('')

    const handleChange = (e) => {
        setForm({...form, [e.target.name]:e.target.value})
    };

    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();

        try{
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/users/user`, form);
            if(res.status === 200){
                setMessage(res.data.message);
                localStorage.setItem("userId", res.data.userId);
                navigate("/jobForm")
            }
        }catch(err){
            if(err.response && err.response.status===401){
                setMessage(err.response.data);
            }else{
                setMessage("Login failed. Please try again.");
            }
            setMessageType("error");
        }
    }

    return (
        <div className="main">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input name="username" placeholder="Username" value = {form.username} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value = {form.password} onChange={handleChange} required />
                <button>Login</button>
                <p className="switch-auth">
                   Don't have an account? <Link to="/signup">Sign Up here</Link>
                </p>
                {message && (
                    <div className={`message ${messageType}`}> {message}</div>)}
            </form>

        </div>
    );

}

export default Login;