import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
//Eweb Developer
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            // Muvaffaqiyatli login bo'lsa, tokenni saqlash va sahifani o'zgartirish
            localStorage.setItem('token', response.data.token); // Tokenni localStorage'ga saqlash
            setSuccess('Muvaffaqiyatli kirdingiz!');
            history.push('/'); // Bosh sahifaga o'tish
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.message || 'Loginda xato!');
            } else {
                setError('Tarmoqda xato!');
            }
        }
    };

    return (
        <div className="login-page">
            <div className="underlay-photo"></div>
            <div className="underlay-black"></div>

            <div className="login-form">
                <div className="login-text">
                    <span className="fa-stack fa-lg">
                        <i className="fa fa-circle fa-stack-2x"></i>
                        <i className="fa fa-lock fa-stack-1x"></i>
                    </span>
                    Kirish
                </div>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        className="login-username"
                        autoFocus
                        required
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        className="login-password"
                        required
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="login-submit">
                        Kirish
                    </button>
                </form>

                {error && <div className="error">{error}</div>}
                {success && <div className="success">{success}</div>}
                
               

              
                   <span className="reg"> Hisobingiz yo'qmi?</span>
                    <Link to="/register" className="login-signup-link">
                        <button className="login-submit">Ro'yhatdan o'tish</button>
                    </Link>
               
                     <Link to='/forgot-password' className="reg">
                 <button className="login-forgot-pass">
                     Parolni unutdingizmi?
                 </button>
                </Link>
                
            </div>

        </div>
    );
};

export default Login;