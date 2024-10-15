import React, { useState, useEffect } from 'react';

const SearchComponent = () => {
    const [data, setData] = useState([]); // Данные из API
    const [searchTerm, setSearchTerm] = useState(''); // Текущий поисковый запрос
    const [loading, setLoading] = useState(false); // Индикатор загрузки

    // Используем эффект для получения данных при первом рендере
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=bc25b198a01dce97d9fbeb1bada0f375');
                const result = await response.json();
                setData(result.results); // Получаем массив фильмов из поля "results"
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    // Фильтруем данные на основе поискового запроса
    const filteredData = data.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) // Используем "title" для фильтрации
    );

    return (
        <div>
            <input className='search-inputjiofg'
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Обновляем поисковый запрос
            />

            {loading ? (
                <p>Loading...</p> // Показать сообщение о загрузке
            ) : (
                <ul>
                    {filteredData.map((item) => (
                        <li key={item.id}>{item.title}</li> // Отображение отфильтрованных фильмов
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchComponent;
