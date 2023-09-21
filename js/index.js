import {
    getMovies,
    getMovie,
    searchMovieByTitle,
    patchMovie,
    postMovie,
    deleteMovie,
    renderMovie,
    renderCategories} from "./movies-api.js";


//Main Method
(async () => {
    /////
    const movies = await getMovies();
    const movie = await getMovie(1)
    console.log(movies);
    // for (let movie of movies) {
        const target = document.querySelector(".movies-grid")
        renderMovie(movie, target)
    // }
})();