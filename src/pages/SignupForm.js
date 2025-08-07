import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../css/style.css';


function SignupForm(){

    const [form, setForm] = useState({
        username: '',
        email:'',
        password: '',
        confirmPassword:''
    });

    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('')
    const navigate = useNavigate();

    const handleChange = (e) =>{
        setForm({...form, [e.target.name]: e.target.value})
    };

    const handleSubmit = async(e)=>{
        e.preventDefault();
         const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`]).{8,}$/;

         if(!regex.test(form.password)){
            setMessage("Password must have at least 1 letter, 1 number, 1 symbol, and be at least 8 characters long.");
            setMessageType("error");
            return;
         }

        if (form.password !== form.confirmPassword){
            setMessage('Password do not match');
            setMessageType('error');
            return;
        }
        try{
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/users/add`, form);
            if (res.status === 200){
                setMessage(res.data.message);
                setMessageType('success');
                localStorage.setItem("userId", res.data.userId);
                navigate("/jobForm")
                //setForm({username:'', email:'', password:'', confirmPassword:''});
            }

        }catch(err){
            if(err.response && err.response.status === 400){
                setMessage(err.response.data);
            }else{
                setMessage("Signup failed. Please try again.");
            }

            setMessageType("error");
            //console.error(err);
        }
    };

    return (
        <div className="main">
            <h2>Sign Up </h2>
            <form onSubmit={handleSubmit}>
                <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required/>
                <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required/>
                <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required/>
                <input type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required/>
                <button type="submit">Sign Up</button>
                <p className="switch-auth">
                   Already have an account? <Link to="/login">Login here</Link>
                </p>
                {message && (
                    <div className={`message ${messageType}`}>{message}</div>
                )}
            </form>
        </div>
    )

}

export default SignupForm;