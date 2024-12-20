import React, { useEffect, useState } from 'react';
import axios from 'axios';
//Eweb Developer

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/auth/get-users');// mana shu apidan javob kelmadi!
                setUsers(response.data); // Foydalanuvchilarni holatga saqlash
            } catch (err) {
                setError(err.message); // Xato xabarini saqlash
            } finally {
                setLoading(false); // Yuklashni tugatish
            }
        };

        fetchUsers();
    }, []); // Bo'sh array - faqat komponent birinchi marta yuklanganda chaqiriladi tegilmasin!

    if (loading) {
        return <div>Yuklanmoqda...</div>;
    }

    if (error) {
        return <div>Xato: {error}</div>;
    }

    return (
        <div>
            <h1>Foydalanuvchilar ro'yxati</h1>
            <ul>
                {users.map(user => (
                    <li key={user.email}>{user.email}</li> // Foydalanuvchining ID va ismini ko'rsatish
                ))}
            </ul>
        </div>
    );
};

export default UsersList;