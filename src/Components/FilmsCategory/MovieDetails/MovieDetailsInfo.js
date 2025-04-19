import React from 'react';
import { useTranslation } from 'react-i18next';

const MovieInfo = ({ movieDetails, video, cast }) => {
    return (
        <div className="MovieContent">
            {video ? (
                <iframe height="315" src={video} title="Трейлер фильма" frameBorder="0" allowFullScreen></iframe>
            ) : (
                <p>Трейлер отсутствует</p>
            )}
            <div className="details">
                <h1 className="MovieText">{movieDetails.title}</h1>
                <div className="ratings">
                    <span className="rating">{movieDetails.vote_average} <i className="fa-brands fa-imdb"></i></span>
                    <span className="age">{movieDetails.adult ? "18+" : "PG-13"}</span>
                </div>
                <p><strong>Год:</strong> {movieDetails.release_date.split('-')[0]}</p>
                <p><strong>Страна:</strong> {movieDetails.production_countries.map(country => country.name).join(', ')}</p>
                <p><strong>Жанр:</strong> {movieDetails.genres.map(genre => genre.name).join(', ')}</p>
                <p><strong>Описание:</strong> {movieDetails.overview}</p>
                <p><strong>Актёры:</strong> {cast.map(actor => actor.name).join(', ')}</p>
            </div>
        </div>
    );
};

export default MovieInfo;
