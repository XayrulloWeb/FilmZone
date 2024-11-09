    import Home from './Pages/Home/Home';
    import Discover from "./Pages/Discover/discover";
    import MovieDetails from "./Components/FilmsCategory/MovieDetails";
    import login from "./Pages/Login/login";
    import WatchListMode from "./Components/WatchList/WatchListMode";
    import search from "./Components/search component/search";
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
        {
            id: 6,
            path: '/search',
            component: search, // Маршрут для WatchlistPage
        },
    ]
    export default routes;