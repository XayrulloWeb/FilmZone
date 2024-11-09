// import React from 'react';
// import { Redirect, Route } from 'react-router-dom';

// const ProtectedRoute = ({ component: Component, ...rest }) => {
//     const token = localStorage.getItem('token'); // Получаем токен из localStorage

//     return (
//         <Route
//             {...rest}
//             render={props =>
//                 token ? (
//                     <Component {...props} /> // Если токен есть, показываем защищённую страницу
//                 ) : (
//                     <Redirect to="/login" /> // Если нет токена, перенаправляем на страницу логина
//                 )
//             }
//         />
//     );
// };

// export default ProtectedRoute;
