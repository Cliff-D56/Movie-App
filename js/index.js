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

    let userInput = "";

        let searchBtn = document.querySelector("button")
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            userInput = document.querySelector('#input-field').value
            //CREATES LIST FROM SEARCH VALUE
          const movie = await pullMoviesFromApi(userInput)
            //LOOPS THROUGH SEARCH RESULTS AND DISPLAYS THEM
          searchLoop(movie)
        })

})();