import {
    getMovies,
    getMovie,
    searchMovieByTitle,
    patchMovie,
    postMovie,
    deleteMovie,
    renderMovie,
    renderCategories, pullMoviesFromApi,searchLoop,movieLoop,renderModal} from "./movies-api.js";




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
    const movies = await getMovies();

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
    $("button.editbutton").on("click",async function (e){
        let id = this.parentElement
            .parentElement
            .parentElement
            .parentElement
            .parentElement
            .parentElement.getAttribute("data-id")
        //.children[2]//.children;
        let summary = this.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].innerText
        let summary2 = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement//.children[2]//.children
        let title = this.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].children[0].innerText
        let year = this.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].children[1].innerText
        // // TODO: MAKE POPUP FORM'
        // let movies = await getMovies()
        console.log(id)
        $(".modal-body").html(
            `
<input type="hidden" id="hiddenID" value=${id}>
<input type="text" id="replacementtitle" value="${title}">
<input type="text" id="replacementyear" value="${year}">
<textarea id="replacementsummary" style="height: 200px;width: 400px;">${summary}</textarea>
        `
        )
        // movies = await getMovies()
        // movieLoop(movies)
    })
    $("#replace").on("click",async function(){
        const title = document.querySelector("#replacementtitle").value
        const year = document.querySelector("#replacementyear").value
        const summary = document.querySelector("#replacementsummary").value
        const id = document.querySelector("#hiddenID").value
        document.querySelector(`.card[data-id="${id}"] .movie-title`).innerText=title
        document.querySelector(`.card[data-id="${id}"] .movie-card-year`).innerText=year
        document.querySelector(`.card[data-id="${id}"] .movie-summary`).innerText=summary
    })
})();


// // Get the modal
// var modal = document.getElementById("myModal");
//
// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];
//
//
// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//     modal.style.display = "none";
// }
//
// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target === modal) {
//         modal.style.display = "none";
//     }
//
// }