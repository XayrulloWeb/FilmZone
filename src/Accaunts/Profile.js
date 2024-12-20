import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            const token = localStorage.getItem('token'); // Tokenni localStorage'dan olish

            if (!token) {
                setError('Foydalanuvchi autentifikatsiyalanmagan.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('http://localhost:8080/api/data/get-users', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Tokenni so'rovga qo'shish
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
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Loaderni ko'rsatish
    }

    if (error) {
        return <div>{error}</div>; // Xatolikni ko'rsatish
    }

    return (
        <div className="profile">
            <h2>Foydalanuvchi Profili</h2>
            {userData && (
                <div>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Ism:</strong> {userData.name}</p>
                    {/* Boshqa foydalanuvchi ma'lumotlarini ham qo'shishingiz mumkin */}
                </div>
            )}
        </div>
    );
};

export default Profile;