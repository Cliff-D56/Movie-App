import {
    getMovies,
    getMovie,
    searchMovieByTitle,
    patchMovie,
    postMovie,
    deleteMovie,
    renderMovie,
    renderCategories, pullMoviesFromApi,searchLoop} from "./movies-api.js";







//Main Method
(async () => {
    /////
    //GETS ALL CURRENT MOVIES IN JSON LIST
    const movies = await getMovies();
    //CREATES LIST FROM SEARCH VALUE
    const movie = await pullMoviesFromApi("Avengers")
    //LOOPS THROUGH SEARCH RESULTS AND DISPLAYS THEM
    searchLoop(movie)
    console.log(movies)
    for (let movie of movies){
        const target = document.querySelector(".movies-grid");
        renderMovie(movie,target)
    }

})();