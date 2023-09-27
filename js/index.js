import {
    getMovies,
    pullMoviesFromApi,
    searchLoop,
    movieLoop} from "./movies-api.js";



//Main Method
(async () => {
    /////
    const movies = await getMovies();
    const searchbtn = document.getElementById("searchbtn")
    let modalHeader = document.querySelector(".modal-title")
    let modalBody = document.querySelector(".modal-body")
    let modalFtr = document.querySelector(".modal-footer")
    // let modal = document.querySelector("")
    searchbtn.addEventListener("click",function (){
            modalHeader.innerHTML=`Search Function`
            modalFtr.innerHTML=`
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            `;
            modalBody.innerHTML= `
            <input id="input-field" type="search">
            <div class="container d-flex flex-wrap" id="search-grid"></div>
            `;
            const input = document.getElementById("input-field")
            input.addEventListener("keyup",async function (e){
                const movies = await pullMoviesFromApi(input.value)
                //TODO:TURN SEARCHLOOP INTO CARD POPULATING FUNCTION
                const target = document.querySelector("#search-grid")
                console.log(input)
                searchLoop(movies,target)
            })
    })
    //CREATES LIST FROM SEARCH VALUE
    movieLoop(movies)
    $(".nav-link").on("click",function (){
        $(".modal-body").html(`
        <h2>
        <span class="loader let1">l</span>
        <span class="loader let2">o</span>
        <span class="loader let3">a</span>
        <span class="loader let4">d</span>
        <span class="loader let5">i</span>
        <span class="loader let6">n</span>
        <span class="loader let7">g</span>
        </h2>
        `)
    })
})();