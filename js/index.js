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

for (let i = 1888; i <= currentYear; i++) {
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
    let categories = document.querySelector(".categories").checked
    let rating = document.querySelector("#rating").value
    let checkboxes = document.getElementsByName("category[]")
    let movie = {};
    let results = '';

    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            results += `${checkboxes[i].value} `
        }
    }

    movie.title = title
    movie.cover = "https://www.themoviedb.org/t/p/w188_and_h282_bestv2/dyhaB19AICF7TO7CK2aD6KfymnQ.jpg"
    movie.year = year
    movie.summary = summary;
    movie.categories = results
    movie.rating = rating


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