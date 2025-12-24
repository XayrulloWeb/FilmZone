import { TMDB_API_KEY, TMDB_BASE_URL } from '../config/constants';

/**
 * Enhanced TMDB API Service
 * Comprehensive service for all TMDB API endpoints
 */
class TMDBService {
    /**
     * Generic fetch method with error handling
     */
    async fetchFromTMDB(endpoint, params = {}) {
        try {
            const queryParams = new URLSearchParams({
                api_key: TMDB_API_KEY,
                ...params
            });

            const response = await fetch(`${TMDB_BASE_URL}${endpoint}?${queryParams}`);

            if (!response.ok) {
                throw new Error(`TMDB API Error: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('TMDB Service Error:', error);
            throw error;
        }
    }

    // ==================== DISCOVER & LISTS ====================

    /**
     * Discover movies by genre
     */
    async discoverByGenre(genreId, language = 'en-US', page = 1) {
        const data = await this.fetchFromTMDB('/discover/movie', {
            with_genres: genreId,
            language,
            page
        });
        return data.results;
    }

    /**
     * Discover popular movies
     */
    async discoverPopular(language = 'en-US', page = 1) {
        const data = await this.fetchFromTMDB('/discover/movie', {
            language,
            sort_by: 'popularity.desc',
            page
        });
        return data.results;
    }

    /**
     * Get trending movies (day/week)
     */
    async getTrending(timeWindow = 'week', language = 'en-US') {
        const data = await this.fetchFromTMDB(`/trending/movie/${timeWindow}`, {
            language
        });
        return data.results;
    }

    /**
     * Get top rated movies
     */
    async getTopRated(language = 'en-US', page = 1) {
        const data = await this.fetchFromTMDB('/movie/top_rated', {
            language,
            page
        });
        return data.results;
    }

    /**
     * Get now playing movies
     */
    async getNowPlaying(language = 'en-US', page = 1) {
        const data = await this.fetchFromTMDB('/movie/now_playing', {
            language,
            page
        });
        return data.results;
    }

    /**
     * Get upcoming movies
     */
    async getUpcoming(language = 'en-US', page = 1) {
        const data = await this.fetchFromTMDB('/movie/upcoming', {
            language,
            page
        });
        return data.results;
    }

    // ==================== SEARCH ====================

    /**
     * Search movies
     */
    async searchMovies(query, language = 'en-US', page = 1) {
        const data = await this.fetchFromTMDB('/search/movie', {
            query: encodeURIComponent(query),
            language,
            page
        });
        return data.results.sort((a, b) => b.popularity - a.popularity);
    }

    /**
     * Multi-search (movies, TV, people)
     */
    async multiSearch(query, language = 'en-US', page = 1) {
        const data = await this.fetchFromTMDB('/search/multi', {
            query: encodeURIComponent(query),
            language,
            page
        });
        return data.results;
    }

    // ==================== MOVIE DETAILS ====================

    /**
     * Get complete movie details
     */
    async getMovieDetails(movieId, language = 'en-US') {
        return await this.fetchFromTMDB(`/movie/${movieId}`, {
            language,
            append_to_response: 'videos,credits,reviews,similar,recommendations,images,keywords'
        });
    }

    /**
     * Get movie credits (cast & crew)
     */
    async getMovieCredits(movieId) {
        return await this.fetchFromTMDB(`/movie/${movieId}/credits`);
    }

    /**
     * Get movie videos (trailers, teasers)
     */
    async getMovieVideos(movieId, language = 'en-US') {
        const data = await this.fetchFromTMDB(`/movie/${movieId}/videos`, {
            language
        });
        return data.results;
    }

    /**
     * Get movie reviews
     */
    async getMovieReviews(movieId, language = 'en-US', page = 1) {
        const data = await this.fetchFromTMDB(`/movie/${movieId}/reviews`, {
            language,
            page
        });
        return data.results;
    }

    /**
     * Get similar movies
     */
    async getSimilarMovies(movieId, language = 'en-US', page = 1) {
        const data = await this.fetchFromTMDB(`/movie/${movieId}/similar`, {
            language,
            page
        });
        return data.results;
    }

    /**
     * Get recommended movies
     */
    async getRecommendedMovies(movieId, language = 'en-US', page = 1) {
        const data = await this.fetchFromTMDB(`/movie/${movieId}/recommendations`, {
            language,
            page
        });
        return data.results;
    }

    /**
     * Get movie images (posters, backdrops)
     */
    async getMovieImages(movieId) {
        return await this.fetchFromTMDB(`/movie/${movieId}/images`);
    }

    /**
     * Get movie keywords
     */
    async getMovieKeywords(movieId) {
        const data = await this.fetchFromTMDB(`/movie/${movieId}/keywords`);
        return data.keywords;
    }

    // ==================== PEOPLE ====================

    /**
     * Get person details
     */
    async getPersonDetails(personId, language = 'en-US') {
        return await this.fetchFromTMDB(`/person/${personId}`, {
            language,
            append_to_response: 'movie_credits,tv_credits,images'
        });
    }

    /**
     * Get popular people
     */
    async getPopularPeople(language = 'en-US', page = 1) {
        const data = await this.fetchFromTMDB('/person/popular', {
            language,
            page
        });
        return data.results;
    }

    // ==================== GENRES ====================

    /**
     * Get all movie genres
     */
    async getMovieGenres(language = 'en-US') {
        const data = await this.fetchFromTMDB('/genre/movie/list', {
            language
        });
        return data.genres;
    }

    // ==================== COLLECTIONS ====================

    /**
     * Get collection details
     */
    async getCollectionDetails(collectionId, language = 'en-US') {
        return await this.fetchFromTMDB(`/collection/${collectionId}`, {
            language
        });
    }
}

// Export singleton instance
export default new TMDBService();
