import {
    getMovies,
    getMovie,
    searchMovieByTitle,
    patchMovie,
    postMovie,
    deleteMovie,
    renderMovie,
    renderCategories, pullMoviesFromApi} from "./movies-api.js";


//Main Method
(async () => {
    /////
    const movies = await getMovies();
    console.log(movies);

})();