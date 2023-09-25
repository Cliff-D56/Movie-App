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
    trailer,
    yearOfMovie,
    modal} from "./movies-api.js";



//Main Method
(async () => {
    /////

    // TODO:SEARCH FUNCTION
    const searchbtn = document.getElementById("searchbtn")
    let modalBody = document.querySelector(".modal-body")
    let modalFtr = document.querySelector(".modal-footer")
    searchbtn.addEventListener("click",function (){
        modalFtr.innerHTML=
            `
            
        `
        modalBody.innerHTML=
            `
            <input id="input-field" type="search">
            <div class="container d-flex" id="search-grid"></div>
            `
    const input = document.getElementById("input-field")
    input.addEventListener("keyup",async function (e){
        const movies = await pullMoviesFromApi(input.value)
        //TODO:TURN SEARCHLOOP INTO CARD POPULATING FUNCTION
        const target = document.querySelector("#search-grid")
        searchLoop(movies,target)
    })
    })


    //GETS ALL CURRENT MOVIES IN JSON LIST
    const movies = await getMovies();


    //CREATES LIST FROM SEARCH VALUE

    movieLoop(movies)

    $(".deletebutton").on("click",async function () {
        $(this)
        deleteMovie(this.id)
        let movies = await getMovies()
        movieLoop(movies)
    })

    //adds a new movie to the list
    await modal()

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
    trailer()
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