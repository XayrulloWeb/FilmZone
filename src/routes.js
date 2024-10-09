import Home from './Pages/Home/Home';
import Discover from "./Pages/Discover/discover";
import MovieDetails from "./Components/FilmsCategory/MovieDetails";
import login from "./Pages/Login/login";
import WatchListMode from "./Components/WatchList/WatchListMode";

const routes = [
    {
        id:1,
        path: '/',
        component: Home,
    },
    {
        id:2,
        path: '/discover',
        component: Discover,
    },
    {
        id:3,
        path: '/movie/:id',
        component: MovieDetails,
    },
    {
        id:4,
        path: '/login',
        component: login,
    },
    {
        id: 5,
        path: '/watchlist',
        component: WatchListMode, // Маршрут для WatchlistPage
    },
]
export default routes;