import React from 'react';
import Slider from "react-slick";

const CastSlider = ({ cast, settings }) => {
    return (
        <div className="MovieActyors">
            <h4 className="MovieText">Главные актёры</h4>
            <ul>
                <Slider {...settings}>
                    {cast.map(actor => (
                        <li key={actor.cast_id}>
                            <div className="MovieActyors-content">
                                {actor.profile_path ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                                        alt={actor.name}
                                    />
                                ) : (
                                    <div></div>
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
