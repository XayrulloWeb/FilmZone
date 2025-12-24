import { GENRE_MAP, TMDB_IMAGE_BASE_URL } from '../config/constants';

/**
 * Get genre names from genre IDs
 */
export const getGenreNames = (genreIds, limit = 3) => {
    if (!genreIds || !Array.isArray(genreIds)) return '';
    return genreIds
        .map(id => GENRE_MAP[id])
        .filter(Boolean)
        .slice(0, limit)
        .join(', ');
};

/**
 * Get full image URL
 */
export const getImageUrl = (path) => {
    if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
    return `${TMDB_IMAGE_BASE_URL}${path}`;
};
