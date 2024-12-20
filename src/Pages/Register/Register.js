import React, { useState } from 'react';
import axios from 'axios';
import '../../assets/Style/register.css';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';




//Eweb Developer 


const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState('');
    const history = useHistory();

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess('');
        

        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', { email, password });
            localStorage.setItem('token', response.data.accessToken);
            setSuccess('Siz muvaffaqiyatli ro"yxatdan o"tdingiz!');
            setEmail('');
            setPassword('');
            history.push('/');
           

        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.message || 'Ro"yxatdan o"tishda xato!');
            } else {
                setError('Tarmoqda xato!');
            }
        }
    };

    return (
        <div className="login-page">
            <div className="underlay-photo"></div>
            <div className="underlay-black"></div>

            <div className="register-form">
                <div className="register-text">
                <span className="fa-stack fa-lg">
                        <i className="fa fa-circle fa-stack-2x"></i>
                        <i className="fa fa-id-card fa-stack-1x"></i>
                    </span>
                    Ro'yxatdan o'tish
                </div>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        className="register-email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        className="register-password"
                        placeholder="Parol"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {error && <div className="error">{error}</div>}
                    {success && <div className="success">{success}</div>}

                    <button type="submit" className="register-submit">
                        Ro'yxatdan o'tish
                    </button>
                </form>
                <span className="reg">
                    Avval ro'yhatdan o'tganmisiz?
                </span>

                <Link to="/login" className="register-forgot-pass">
                   <button className="login-submit">Kirish</button>
                </Link>

            </div>
        </div>
    );
    
};

export default RegisterPage;