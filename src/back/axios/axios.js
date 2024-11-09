// const handleLogin = async (event) => {
//     event.preventDefault(); // Останавливаем перезагрузку страницы

//     try {
//         // Отправляем данные формы на бэкенд
//         const response = await axios.post(
//             'http://localhost:5000/login', // Адрес твоего бэкенда
//             { email, password }, // Данные формы
//             { withCredentials: true } // Если работаешь с куками
//         );

//         console.log('Успешный вход:', response.data);

//         // Сохраняем токен в localStorage
//         localStorage.setItem('token', response.data.token);

//         // Перенаправляем пользователя на защищённую страницу
//         props.history.push('/dashboard');
//     } catch (error) {
//         console.error('Ошибка входа:', error.response ? error.response.data : error.message);
//         alert('Login failed. Please try again.');
//     }
// };
