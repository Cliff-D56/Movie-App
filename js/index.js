import {
    getMovies,
    getMovie,
    searchMovieByTitle,
    patchMovie,
    postMovie,
    deleteMovie,
    renderMovie,
    renderCategories, pullMoviesFromApi,searchLoop,movieLoop} from "./movies-api.js";




let ddlYears = document.getElementById("ddlYears");
let currentYear = (new Date()).getFullYear();

for (let i = 1950; i <= currentYear; i++) {
    let option = document.createElement("OPTION");
    option.innerHTML = i;
    option.value = i;
    ddlYears.appendChild(option);
}

let submit = document.querySelector('#add-btn');
submit.addEventListener('click', add)

    function add (e) {
        e.preventDefault();
        let title = document.querySelector("#title").value
        let summary = document.querySelector('#summary').value
        let year = document.querySelector("#ddlYears").value
        let rating = document.querySelector("#rating").value
        console.log(title);
        console.log(summary);
        console.log(year);
        console.log(rating);
    }


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
})();