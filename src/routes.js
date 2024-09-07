import Home from './Pages/Home/Home';
import Discover from "./Pages/Discover/discover";
import MovieDetails from "./Components/FilmsCategory/MovieDetails";

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
]
export default routes;