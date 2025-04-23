// src/Pages/Register/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import '../../assets/Style/register.css'; // Используем CSS для логина/регистрации
import { Link, useHistory } from 'react-router-dom';

const RegisterPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	// --- ДОБАВЛЕНО СОСТОЯНИЕ ДЛЯ USERNAME ---
	const [username, setUsername] = useState('');
	// ---------------------------------------
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState('');
	const history = useHistory();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		setSuccess('');
		try {
			// --- ДОБАВЛЕНО ПОЛЕ USERNAME В ЗАПРОС ---
			const response = await axios.post('http://localhost:5000/api/auth/register', {
				email,
				password,
				username // Отправляем username на бэкенд
			});
			// ---------------------------------------

			if (response.data && response.data.accessToken) {
				localStorage.setItem('token', response.data.accessToken); // Сохраняем токен
				setSuccess('Siz muvaffaqiyatli ro"yxatdan o"tdingiz!'); // Сообщение об успехе
				setError(null);
				// Очищаем поля формы
				setEmail('');
				setPassword('');
				setUsername(''); // <-- Очищаем поле username
				// Перенаправляем на главную через 1.5 секунды
				setTimeout(() => {
					history.push('/');
					// Возможно, потребуется перезагрузка для обновления хедера, если он не следит за localStorage
					// window.location.reload();
				}, 1500);
			} else {
				// Если бэкенд вернул 2xx статус, но без токена (маловероятно при правильной настройке)
				setError('Ro"yxatdan o"tishda noma\'lum xato: Token kelmadi');
				setSuccess('');
			}
		} catch (err) {
			console.error("Register error:", err);
			setSuccess('');
			// Обрабатываем ошибки от бэкенда (валидация, существующий email/username и т.д.)
			if (err.response && err.response.data && err.response.data.message) {
				// Если есть конкретное сообщение об ошибке от бэкенда
				setError(err.response.data.message);
			} else if (err.response && err.response.data && err.response.data.errors) {
                // Если бэкенд вернул массив ошибок валидации (от express-validator)
                const validationErrors = err.response.data.errors.map(e => e.msg).join(', ');
                setError(`Xatolik: ${validationErrors}`);
            }
             else {
				// Общая ошибка сети или сервера
				setError('Tarmoqda xato yoki server javob bermayapti.');
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
						<i className="fa fa-id-card fa-stack-1x"></i>
					</span>
					Ro'yxatdan o'tish
				</div>

				<form onSubmit={handleSubmit}>
					{/* --- ДОБАВЛЕНО ПОЛЕ ВВОДА ДЛЯ USERNAME --- */}
					<input
						type="text"
						className="login-username" // Используем тот же стиль, что и для email
						placeholder="Username" // Плейсхолдер
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required // Делаем обязательным
						// Можно добавить атрибуты для валидации на клиенте, если нужно
						minLength="3"
                        maxLength="20"
                        pattern="^[a-zA-Z0-9_]+$" // Соответствует валидации на бэкенде
                        title="Username can only contain letters, numbers, and underscores (3-20 characters)." // Подсказка при неверном вводе
					/>
					{/* --------------------------------------- */}

					<input
						type="email"
						className="login-username" // Используем тот же стиль
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<input
						type="password"
						className="login-password" // Используем стиль для пароля
						placeholder="Parol"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						minLength="3" // Минимальная длина пароля
					/>
					{/* Отображение ошибок/успеха */}
					{error && <div className="error">{error}</div>}
					{success && <div className="success">{success}</div>}

					<button type="submit" className="login-submit">
						Ro'yxatdan o'tish
					</button>
				</form>

				<span className="reg">
					Avval ro'yhatdan o'tganmisiz?
				</span>

				<Link to="/login" style={{ textDecoration: 'none' }}>
					<button type="button" className="secondary-submit">
						Kirish
					</button>
				</Link>
			</div>
		</div>
	);
};

export default RegisterPage;