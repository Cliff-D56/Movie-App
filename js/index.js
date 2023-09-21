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
    //GETS ALL CURRENT MOVIES IN LIST
    const movies = await getMovies();
    const movie = await pullMoviesFromApi()
    console.log(movie);

})();