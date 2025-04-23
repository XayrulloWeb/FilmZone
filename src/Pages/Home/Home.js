// src/Pages/Home/Home.js
import React from 'react'; // Убрали useState, useEffect
import Movies from "../../Components/FilmsCategory/Movies";
import Banner from "../../Header/Navbar/Banner";
// Убрали axios

function Home(props) {
	// Логика получения пользователя и ошибки теперь не здесь
	// const [user, setUser] = useState(null);
	// const [error, setError] = useState(null);
	// useEffect(() => { ... }); // Убрали useEffect

	return (
		<div className='home'>
			<div className="navbar_back">
				{/* Banner может требовать ID пользователя или другую информацию,
				    которую теперь нужно передавать через props или Context */}
				<Banner movieId={1} />
			</div>

			{/* Убрали отображение user/error/logout отсюда. Это должно быть в Header/Navbar */}
			{/* {user ? ( ... ) : error ? ( ... ) : ( ... )} */}

			<Movies /> {/* Компонент Movies может также зависеть от статуса пользователя */}
		</div>
	);
}

export default Home;