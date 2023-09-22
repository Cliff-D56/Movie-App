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
    const movieCard=document.createElement('div')
    movieCard.classList.add('card')
    movieCard.setAttribute("data-id",`${movie.id}`)
    movieCard.innerHTML = `
<img src=${movie.cover}>
<div class="card-body">
<div class="d-flex justify-content-between">
<h5 class="movie-title">${movie.title}</h5>
<p class="movie-card-year">${movie.year}</p>
<a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><img src="assets/dots-vertical.svg"></a>
<div class="nav-item dropdown">
<ul class="dropdown-menu">
<li><button class="dropdown-item btn editbutton" id="M${movie.id}"data-bs-toggle="modal" data-bs-target="#exampleModal">Edit Info</button></li>
<li><button class="dropdown-item btn deletebutton"  id="${movie.id}">Delete Movie</button></li>
</ul>
</div>
</div>
<p class="movie-summary">${movie.summary}</p>
</div>
        <div class="d-flex align-items-center justify-content-between gap-10 flex-wrap">
            ${movie.categories
        .map(
            (category)=>`
                <span class="movie-card-tag">${category} </span>
                `
        )
        .join('')}
      </div>
<meter class="movie-card-meter container-fluid" min="0" max="10" value=${movie.rating}></meter>
<a href="#" class="btn btn-primary">Add as Favorite</a>
<a href="#" class="btn btn-primary">Watch Trailer</a>
    `;
    target.appendChild(movieCard)
}

const searchLoop = (movie)=>{
    for (let i=0;i<movie.results.length;i++){
        console.log(movie.results[i].title)
    }
}
const movieLoop = (movies)=>{
    $(".movies-grid").html("")
    for (let movie of movies){
        const target = document.querySelector(".movies-grid");
        renderMovie(movie,target)
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

export {getMovies, getMovie, searchMovieByTitle, postMovie, deleteMovie, patchMovie, renderMovie, renderCategories, TMDB_KEY, pullMoviesFromApi,searchLoop,movieLoop, yearOfMovie, modal}

