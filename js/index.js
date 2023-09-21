import {
    getMovies,
    getMovie,
    searchMovieByTitle,
    patchMovie,
    postMovie,
    deleteMovie,
    renderMovie,
    renderCategories, pullMoviesFromApi,searchLoop} from "./movies-api.js";



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
    const movies = await getMovies();

    let userInput = "";

        let searchBtn = document.querySelector("button")
        searchBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            userInput = document.querySelector('#input-field').value
            //CREATES LIST FROM SEARCH VALUE
          const movie = await pullMoviesFromApi(userInput)
            //LOOPS THROUGH SEARCH RESULTS AND DISPLAYS THEM
          searchLoop(movie)
        })

})();