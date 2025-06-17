// src/Pages/Login/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
// import { AuthContext } from '../../context/AuthContext'; // Пример импорта контекста
import '../../assets/Style/register.css'; // Используем тот же CSS файл

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const history = useHistory();
	// const { login } = useContext(AuthContext); // Пример использования контекста

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');

		try {
			const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
			console.log('Login response:', response.data);

			if (response.data && response.data.accessToken) {
				localStorage.setItem('token', response.data.accessToken);
				// Опционально: обновить глобальное состояние
				// login(response.data.user, response.data.accessToken);
				history.push('/'); // Перенаправляем на главную
				// Можно перезагрузить страницу для обновления хедера
				// window.location.reload();
			} else {
				setError('Kirishda xato: Token kelmadi');
			}
		} catch (err) {
			console.error("Login error:", err);
			if (err.response && err.response.data) {
				setError(err.response.data.message || 'Email yoki parol noto‘g‘ri');
			} else {
				setError('Tarmoqda xato yoki server javob bermayapti.');
			}
		}
	};

	// Используем разметку и классы ИЗ register.css
	return (
		<div className="login-page"> {/* Используем класс login-page */}
			<div className="underlay-photo"></div>
			<div className="underlay-black"></div>

			{/* Используем класс login-form */}
			<div className="login-form">
				{/* Используем класс login-text */}
				<div className="login-text">
					<span className="fa-stack fa-lg">
						<i className="fa fa-circle fa-stack-2x"></i>
						<i className="fa fa-sign-in fa-stack-1x"></i> {/* Иконка входа */}
					</span>
					Kirish
				</div>

				<form onSubmit={handleSubmit}>
					{/* Используем классы login-username/login-password */}
					<input
						type="email"
						className="login-username" // ИЗМЕНЕН КЛАСС
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<input
						type="password"
						className="login-password" // ИЗМЕНЕН КЛАСС
						placeholder="Parol"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					{/* Используем класс error из register.css */}
					{error && <div className="error">{error}</div>}

                    {/* Основная кнопка использует класс login-submit */}
					<button type="submit" className="login-submit">
						Kirish
					</button>
				</form>

                {/* Текст использует класс reg */}
                <span className="reg">
                    Hisobingiz yo'qmi?
                </span>

                {/* Ссылка на регистрацию, кнопка внутри использует класс secondary-submit */}
				<Link to="/register" style={{ textDecoration: 'none' }}>
                    {/* ИЗМЕНЕН КЛАСС КНОПКИ */}
					 <button type="button" className="secondary-submit">
                        Ro'yxatdan o'tish
                     </button>
				</Link>
			</div>
		</div>
	);
};

export default Login;