import {
    getMovies,
    getMovie,
    searchMovieByTitle,
    patchMovie,
    postMovie,
    deleteMovie,
    renderMovie,
    renderCategories,
    pullMoviesFromApi,
    searchLoop,
    movieLoop,
    yearOfMovie,
    modal} from "./movies-api.js";


//Main Method
(async () => {
    /////
    //GETS ALL CURRENT MOVIES IN JSON LIST
    let movies = await getMovies();

    //CREATES LIST FROM SEARCH VALUE
    const movie = await pullMoviesFromApi("Shrek")
    //LOOPS THROUGH SEARCH RESULTS AND DISPLAYS THEM
    searchLoop(movie)
    console.log(movies)
    movieLoop(movies)

    $(".deletebutton").on("click",async function () {
        $(this)
        deleteMovie(this.id)
        let movies = await getMovies()
        movieLoop(movies)
    })



    //adds a new movie to the list
    await modal()

})();