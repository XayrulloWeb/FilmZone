import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function MovieDetails() {
    const { id } = useParams();  // Получаем ID фильма из URL
    const [movieDetails, setMovieDetails] = useState(null);
    const [video, setVideo] = useState(null);
    const [providers, setProviders] = useState(null);  // Для хранения данных о платформах

    useEffect(() => {
        // Получаем детали фильма
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=bc25b198a01dce97d9fbeb1bada0f375`)
            .then(res => res.json())
            .then(data => setMovieDetails(data))
            .catch(err => console.error("Error fetching movie details: ", err));

        // Получаем видео (например, трейлер)
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=bc25b198a01dce97d9fbeb1bada0f375`)
            .then(res => res.json())
            .then(data => {
                const trailer = data.results.find(video => video.type === 'Trailer');
                setVideo(trailer ? `https://www.youtube.com/embed/${trailer.key}` : null);
            })
            .catch(err => console.error("Error fetching movie video: ", err));

        // Получаем информацию о стриминговых сервисах
        fetch(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=bc25b198a01dce97d9fbeb1bada0f375`)
            .then(res => res.json())
            .then(data => setProviders(data.results))
            .catch(err => console.error("Error fetching movie providers: ", err));
    }, [id]);

    if (!movieDetails) return <div>Loading...</div>;

    return (
        <div className="MovieDetails">
            {/*<h1>{movieDetails.title}</h1>*/}
            {/*<p>{movieDetails.overview}</p>*/}
            {/*<div>*/}
            {/*    {video ? <iframe width="560" height="315" src={video} title="Movie Trailer" frameBorder="0" allowFullScreen></iframe> : <p>No trailer available</p>}*/}
            {/*</div>*/}
            {/*<p>Rating: {movieDetails.vote_average}</p>*/}
            {/*<p>Release date: {movieDetails.release_date}</p>*/}
            {/*<p>Genres: {movieDetails.genres.map(genre => genre.name).join(', ')}</p>*/}

            {/*/!* Отображение информации о доступных платформах *!/*/}
            {/*{providers && providers.US && (*/}
            {/*    <div>*/}
            {/*        <h3>Watch on:</h3>*/}
            {/*        <ul>*/}
            {/*            {providers.US.flatrate && providers.US.flatrate.map(provider => (*/}
            {/*                <li key={provider.provider_id}>*/}
            {/*                    {provider.provider_name}*/}
            {/*                </li>*/}
            {/*            ))}*/}
            {/*        </ul>*/}
            {/*    </div>*/}
            {/*)}*/}

            
        </div>
    );
}

export default MovieDetails;
