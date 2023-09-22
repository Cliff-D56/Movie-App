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

// const renderMovie = (movieObj, target) => {
//     const movieCard = document.createElement('article');
//     movieCard.classList.add('movie-card');
//     movieCard.innerHTML = `
//         <div class="movie-card-title">${movieObj.title}</div>
//         <p class="movie-card-year">${movieObj.year}</p>
//         <p class="movie-card-description">${movieObj.description}</p>
//         <div class="d-flex align-item-center justify-content-between">
//             <span class="movie-card-rating">Rating</span>
//             <span class="movie-card-span">${movieObj.rating}</span>
//         </div>
//         <meter value=${movieObj.rating} min="0" max="10" class="movie-card-meter"></meter>
//         <div class="d-flex align-item-center justify-content-start gap-10 flex-wrap">
//             ${renderCategories(movieObj.categories)}
//         </div>
//     `;
//
//     target.appendChild(movieCard)
// }
const renderMovie = (movie,target)=>{
    const movieCard=document.createElement('div')
    movieCard.classList.add('card')
    movieCard.innerHTML = `
<img src=${movie.cover}>
<div class="card-body">
<div class="d-flex justify-content-between">
<h5 class="movie-title">${movie.title}</h5>
<p class="movie-card-year">${movie.year}</p>
<a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><img src="assets/dots-vertical.svg"></a>
<div class="nav-item dropdown">
<ul class="dropdown-menu">
<li><a class="dropdown-item" href="#">Edit Info</a></li>
<li><button class="dropdown-item btnn deletebutton" id="${movie.id}">Delete Movie</button></li>
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
export {getMovies, getMovie, searchMovieByTitle, postMovie, deleteMovie, patchMovie, renderMovie, renderCategories, TMDB_KEY, pullMoviesFromApi,searchLoop,movieLoop}