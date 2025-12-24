import Home from './Pages/Home/Home';
import Discover from "./Pages/Discover/discover";
import MovieDetails from "./Components/FilmsCategory/MovieDetails";
import login from "./Pages/Login/login";
import WatchListMode from "./Components/WatchList/WatchListMode";
import search from "./Components/search component/search";
import RegisterPage from './Pages/Register/Register';
import Profile from './Accaunts/Profile';
import UsersList from './Pages/UserList/Users';
import About from './Layout/About/About';
import MovieRelease from './Pages/MovieRelease/MovieRelease';
import Trending from './Pages/Trending/Trending';
import TopRated from './Pages/TopRated/TopRated';
import NowPlaying from './Pages/NowPlaying/NowPlaying';

const routes = [
    {
        id: 1,
        path: '/',
        component: Home,
    },
    {
        id: 2,
        path: '/discover',
        component: Discover,
    },
    {
        id: 3,
        path: '/movie/:id',
        component: MovieDetails,
    },
    {
        id: 4,
        path: '/login',
        component: login,
    },
    {
        id: 5,
        path: '/watchlist',
        component: WatchListMode, // Маршрут для WatchlistPage
    },
    {
        id: 6,
        path: '/search',
        component: search, // Маршрут для WatchlistPage
    },
    {
        id: 7,
        path: '/register',
        component: RegisterPage, // men qo'shgan marshrut
    },
    {
        id: 8,
        path: '/profile',
        component: Profile, // men qo'shgan marshrut-2
    },
    {
        id: 9,
        path: '/users',
        component: UsersList, // men qo'shgan marshrut-3
    },
    {
        id: 10,
        path: '/about',
        component: About,
    },
    {
        id: 12,
        path: '/movie-release',
        component: MovieRelease,
    },
    {
        id: 13,
        path: '/trending',
        component: Trending,
    },
    {
        id: 14,
        path: '/top-rated',
        component: TopRated,
    },
    {
        id: 15,
        path: '/now-playing',
        component: NowPlaying,
    },
    {
        id: 11,
        component: require('./Pages/NotFoundPage').default,
    }
]
export default routes;