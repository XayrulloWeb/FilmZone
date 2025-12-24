import React, { useEffect, useState } from "react";
import "../../assets/Style/style.css";
import MovieCard from "../../Components/MovieCard/MovieCard";
import tmdbService from "../../services/tmdbService";

const MovieRelease = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUpcoming = async () => {
            try {
                const results = await tmdbService.getUpcoming();
                setMovies(results);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching upcoming movies:", error);
                setLoading(false);
            }
        };

        fetchUpcoming();
    }, []);

    return (
        <div style={{ background: '#000', minHeight: '100vh', padding: '100px 0' }}>
            <div className="container">
                <h1 className="MovieText" style={{ marginBottom: "30px" }}>Upcoming Releases</h1>
                {loading ? (
                    <div className="loader">Loading...</div>
                ) : (
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                        gap: "30px",
                        justifyItems: "center"
                    }}>
                        {movies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieRelease;
