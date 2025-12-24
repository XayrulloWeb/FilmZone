import React from 'react';
import Slider from "react-slick";

const CastSlider = ({ cast, crew, settings }) => {
    if (!cast || cast.length === 0) return null;

    return (
        <div className="MovieActyors">
            <h4 className="MovieText">Главные актёры</h4>
            <ul>
                <Slider {...settings}>
                    {cast.map(actor => (
                        <li key={actor.id || actor.cast_id}>
                            <div className="MovieActyors-content">
                                {actor.profile_path ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                                        alt={actor.name}
                                    />
                                ) : (
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '50%',
                                        backgroundColor: '#333',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#666'
                                    }}>
                                        <i className="fa-solid fa-user"></i>
                                    </div>
                                )}
                                <div className="MovieActyors-name">
                                    <p>{actor.name}</p>
                                    <span>{actor.character}</span>
                                </div>
                            </div>
                        </li>
                    ))}
                </Slider>
            </ul>
        </div>
    );
};

export default CastSlider;
