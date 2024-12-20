import React from 'react';
import axios from 'axios';

const LogoutButton = () => {
    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
            // Logout muvaffaqiyatli bo'lsa, foydalanuvchini boshqa sahifaga yo'naltiring
            window.location.href = '/login'; // kerakli sahifaga yo'naltirish
        } catch (error) {
            console.error('Logout xatosi:', error);
            // Xatolik haqida foydalanuvchiga xabar berish
        }
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
};

export default LogoutButton;