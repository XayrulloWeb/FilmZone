import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const history = useHistory(); // Для редиректа

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            const token = localStorage.getItem('token'); // Получаем токен из localStorage

            if (!token) {
                setError('Foydalanuvchi autentifikatsiyalanmagan.');
                setLoading(false);
                history.push('/login'); // Перенаправляем на страницу входа, если токен отсутствует
                return;
            }

            try {
                const response = await axios.get('http://localhost:8080/api/data/get-users', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Передаем токен в заголовках
                    },
                });
                setUserData(response.data);
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError('Foydalanuvchi ma\'lumotlarini olishda xato.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [history]);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Удаляем токен
        history.push('/login'); // Перенаправляем на страницу входа
    };

    if (loading) {
        return <div>Loading...</div>; // Показываем загрузку
    }

    if (error) {
        return <div>{error}</div>; // Показываем ошибку
    }

    return (
        <div className="profile">
            <h2>Foydalanuvchi Profili</h2>
            {userData && (
                <div>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Ism:</strong> {userData.name}</p>
                    {/* Можно добавить другие данные пользователя */}
                </div>
            )}
            <button onClick={handleLogout}>Logout</button> {/* Кнопка выхода */}
        </div>
    );
};

export default Profile;
