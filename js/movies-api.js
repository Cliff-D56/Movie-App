import {TMDB_KEY} from "./keys.js";


const pullMoviesFromApi = async (input) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${input}`
    const options = {
        "method": "GET",
        "headers": {
            "Content-Type": "application/json",
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYjQ4NTliZDBiNTRjZjQ4Nzc1OWExY2E4ZWQ5OGZjOCIsInN1YiI6IjY1MGM1OTYzOTNkYjkyMDEzOGU0YTY1NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XAqnd5heKBDaJYlCQ7XHsyi5yljKz4fSSAJxWRzHHl0',
            'accept': 'application/json'
        }
    }
    const response = await fetch(url, options)
    return await response.json()
}

const getMovies = async () => {
    const url = "http://localhost:3000/movies"
    const options = {
        "method": "GET",
        "headers": {
            "Content-Type": "application/json"
        }
    }

    let loader = document.createElement('div')
    loader.classList.add('loading')
    loader.innerText = 'loading...'

    document.getElementsByClassName(".movies-grid").innerHTML = loader

    const response = await fetch(url, options)
    return await response.json()
}


const getMovie = async (id) => {
    const url = `http://localhost:3000/movies/${id}`;
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await fetch(url, options);
    return await response.json();
}

const deleteMovie = async (id) => {
    const url = `http://localhost:3000/movies/${id}`;
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await fetch(url, options);
    return await response.json();
}

const postMovie = async  (movie) => {
    try {
        const searchResult = await searchMovieByTitle(movie.title);
        if (searchResult.length > 0) {
            throw new Error("Book already Exists in the database.")
        }
        const url = "http://localhost:3000/movies";
        const body = movie
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        }
        const response = await fetch(url, options);
        return await response.json();
    } catch(error) {
        console.log(error);
        return null;
    }

}

const patchMovie = async (movie) => {
    try {
        const url = `http://localhost:3000/movies/${movie.id}`;
        const body = movie
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        }
        const response = await fetch(url, options);
        return await response.json();
    } catch(error) {
        console.log(error);
        return null;
    }

}

const searchMovieByTitle = async (title) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${title}`
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYjQ4NTliZDBiNTRjZjQ4Nzc1OWExY2E4ZWQ5OGZjOCIsInN1YiI6IjY1MGM1OTYzOTNkYjkyMDEzOGU0YTY1NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XAqnd5heKBDaJYlCQ7XHsyi5yljKz4fSSAJxWRzHHl0',
            'accept': 'application/json'
        }
    }
    const response = await fetch(url, options);
    return await response.json();
}

const renderCategories = (categories) => {
    return categories
        .map(
            (category) =>
                `<span class="movie-card-tag">${category}</span>`
        ).join('')
}

const renderMovie = (movie,target)=>{
    //TODO:REFACTOR TO INCLUDE API SEARCH
    const movieCard=document.createElement('div')
    movieCard.classList.add('card')
    movieCard.setAttribute("data-id",`${movie.id}`)
    movieCard.innerHTML = `
<img src=${movie.cover}>
<div class="card-body">
<!--<div class="movie-header">-->
<a class="edit nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><img class="edit" src="assets/dots-vertical.svg"></a>
<p class="movie-title"><strong>${movie.title}</strong></p>
<div class="nav-item dropdown">
<ul class="dropdown-menu">
<li><button class="dropdown-item btn editbutton" id="M${movie.id}"data-bs-toggle="modal" data-bs-target="#exampleModal">Edit Info</button></li>
<li><button class="dropdown-item btn deletebutton"  id="${movie.id}">Delete Movie</button></li>
</ul>
</div>
<!--</div>-->
<p class="movie-summary">${movie.summary}</p>
<p class="movie-card-year">Filmed in: ${movie.year}</p>
</div>
        <div class="movie-category d-flex align-items-center justify-content-center">
            ${movie.categories
        .map(
            (category)=>`
                <span class="movie-card-tag">${category} </span>
                `
        )
        .join('')}
      </div>
<meter class="movie-card-meter container-fluid" min="0" max="10" value=${movie.rating}></meter>
<a href="#" class="btn btn-primary trailer" data-bs-toggle="modal" data-bs-target="#exampleModal">Watch Trailer</a>
<input type="hidden" id="trailerId" value=${movie.trailer}>
    `;
    target.appendChild(movieCard)
}
const renderMovie2 = (movie,target)=>{
    //TODO:REFACTOR TO INCLUDE API SEARCH
    const movieCard=document.createElement('div')
    movieCard.classList.add('card')
    movieCard.setAttribute("data-id",`${movie.id}`)
    let poster =`https://image.tmdb.org/t/p/original${movie.poster_path}`
    genreId(movie.genre_ids)
    movieCard.innerHTML = `
<img src=${poster}>
<div class="card-body">
<div class="movie-header">
<p class="movie-title"><strong>${movie.title}</strong></p>
<a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><img src="assets/dots-vertical.svg"></a>
<div class="nav-item dropdown">
<ul class="dropdown-menu">
<li><button class="dropdown-item btn editbutton" id="M${movie.id}"data-bs-toggle="modal" data-bs-target="#exampleModal">Edit Info</button></li>
<li><button class="dropdown-item btn deletebutton"  id="${movie.id}">Delete Movie</button></li>
</ul>
</div>
</div>
<p class="movie-summary">${movie.overview}</p>
<p class="movie-card-year">Filmed in: ${movie.release_date}</p>
</div>
        <div class="movie-category d-flex align-items-center justify-content-center">
            ${movie.genre_ids
        .map(
            (genre)=>`
                <span class="movie-card-tag">${genre} </span>
                `
        )
        .join('')}
      </div>
<!--TODO:MAKE VOTERS INTO RATING-->
<meter class="movie-card-meter container-fluid" min="0" max="10" value=${movie.vote_average.toFixed()}></meter>
<a href="#" class="btn btn-primary trailer" data-bs-toggle="modal" data-bs-target="#exampleModal">Watch Trailer</a>
<input type="hidden" id="trailerId" value=${movie.trailer}>
    `;
    target.appendChild(movieCard)
}



const searchLoop = (movie,target)=>{
    target.innerHTML="";
    for (let i=0;i<9;i++){
    const results= movie.results[i]
        const searchCard = document.createElement('div')
        searchCard.classList.add('card')
        searchCard.setAttribute("data-id",`${results.id}`)
        searchCard.innerHTML=`
        <img src="https://image.tmdb.org/t/p/original/${results.poster_path}" alt="Could not be found">
        <div class="card-body">
        <div class="d-flex justify-content-between">
        <h5 class="movie-title">${results.title}</h5>
        <button type="button" id="${results.id}" class="btn btn-primary" data-bs-dismiss="modal">Add as Favorite</button>
        `
        target.appendChild(searchCard)
        console.log(movie.results[i])
        document.getElementById(`${results.id}`).addEventListener("click",function (){
            postMovie(results)
        })
    }
}
const movieLoop = (movies)=>{
    $(".movies-grid").html("")
    for (let movie of movies){
        const target = document.querySelector(".movies-grid");
        renderMovie2(movie,target)
    }
}

const yearOfMovie = () => {
    let ddlYears = document.getElementById("ddlYears");
    let currentYear = (new Date()).getFullYear();

    for (let i = 1888; i <= currentYear; i++) {
        let option = document.createElement("OPTION");
        option.innerHTML = i;
        option.value = i;
        ddlYears.appendChild(option);
    }
}

const modal = async () => {

    // Get the modal
    let modal = document.getElementById("add-movie-modal");

    // Get the button that opens the modal
    let btn = document.getElementById("modalBtn");

    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0];

    let submit = document.getElementById("add-btn")
    // When the user clicks on the button, open the modal
    btn.onclick = function() {
        modal.style.display = "block";
        yearOfMovie()
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    submit.onclick = async (e) => {
        e.preventDefault();
        let title = document.querySelector("#title").value
        let summary = document.querySelector('#summary').value
        let year = document.querySelector("#ddlYears").value
        let categories = document.querySelector(".categories").checked
        let rating = document.querySelector("#rating").value
        let checkboxes = document.getElementsByName("category[]")
        let movie = {};
        let results = [];

        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                results.push(checkboxes[i].value)
            }
        }

        movie.title = title
        movie.cover = "https://www.themoviedb.org/t/p/w188_and_h282_bestv2/dyhaB19AICF7TO7CK2aD6KfymnQ.jpg"
        movie.year = year
        movie.summary = summary;
        movie.categories = results
        movie.rating = rating

        let newMovie = await postMovie(movie)
        let movies = await getMovies()
        movieLoop(movies)
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside the modal, close it
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
}
const trailer = async (movies)=>{
    let modalTitle=document.querySelector(".modal-title")
    let modalBody = document.querySelector(".modal-body")
    let modalFtr = document.querySelector(".modal-footer")
    //TODO CREATE FUNCTION TO GET ID BY BUTTON PRESS
    let trailers = document.getElementsByClassName("trailer")
    for (let trl of trailers){
        const trailerVideo = await trailervid(movies)
    let title = trl.parentElement.children[1].childNodes[1].children[0].innerText
        let video = trl.parentElement.children[5].value
        trl.addEventListener("click",function (){
            modalTitle.innerText=`${title}`
            modalBody.innerHTML=
                `
           ${trailerVideo}
        `
            modalFtr.innerHTML=
                `
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            `
        })
    }
}
// TODO COMPLETE TRAILER FUNCTION, PROMISE IS RETURNING UNDEFINED
const trailervid =async (movies)=>{
        const url = `https://api.themoviedb.org/3/movie/${movies[0].id}/videos?language=en-US`
        const options = {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYjQ4NTliZDBiNTRjZjQ4Nzc1OWExY2E4ZWQ5OGZjOCIsInN1YiI6IjY1MGM1OTYzOTNkYjkyMDEzOGU0YTY1NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XAqnd5heKBDaJYlCQ7XHsyi5yljKz4fSSAJxWRzHHl0',
                'accept': 'application/json'
            }
        }
        const response = await fetch(url, options)
        return await response.json()
}

const genreId =(genres_ids)=>{
    for (const genresId of genres_ids) {
        switch(genresId){
            case 28:
                genres_ids.splice(genres_ids.indexOf(genresId),1,"Action")
                break;
            case 12:
                genres_ids.splice(genres_ids.indexOf(genresId),1,"Adventure")
                break;
            case 16:
                genres_ids.splice(genres_ids.indexOf(genresId),1,"Animation")
                break;
            case 35:
                genres_ids.splice(genres_ids.indexOf(genresId),1,"Comedy")
                break;
            case 80:
                genres_ids.splice(genres_ids.indexOf(genresId),1,"Crime")
                break;
            case 99:
                genres_ids.splice(genres_ids.indexOf(genresId),1,"Documentary")
                break;
            case 18:
                genres_ids.splice(genres_ids.indexOf(genresId),1,"Drama")
                break;
            case 10751:
                genres_ids.splice(genres_ids.indexOf(genresId),1,"Family")
                break;
            case 14:
                genres_ids.splice(genres_ids.indexOf(genresId),1,"Fantasy")
                break;
            case 36:
                genres_ids.splice(genres_ids.indexOf(genresId),1,"History")
                break;
            case 27:
                genres_ids.splice(genres_ids.indexOf(genresId),1,"Horror")
                break;
            case 10402:
                genres_ids.splice(genres_ids.indexOf(genresId),1,"Music")
                break;
            case 9648:
                genres_ids.splice(genres_ids.indexOf(genresId),1,"Mystery")
                break;
            case 10749:
                genres_ids.splice(genres_ids.indexOf(genresId),1,"Romance")
                break;
            case 878:
                genres_ids.splice(genres_ids.indexOf(genresId),1,"Science Fiction")
                break;
            case 10770:
                genres_ids.splice(genres_ids.indexOf(genresId),1,"Action")
                break;
            case 53:
                genres_ids.splice(genres_ids.indexOf(genresId),1,"Thriller")
                break;
            case 10752:
                genres_ids.splice(genres_ids.indexOf(genresId),1,"War")
                break;
            case 37:
                genres_ids.splice(genres_ids.indexOf(genresId),1,"Western")
                break;
        }
    }
}

export {getMovies, getMovie, searchMovieByTitle, postMovie, deleteMovie, patchMovie, renderMovie2, renderCategories, TMDB_KEY, pullMoviesFromApi,searchLoop,movieLoop, yearOfMovie,trailer, modal}

