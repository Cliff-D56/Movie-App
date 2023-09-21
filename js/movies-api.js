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

const renderMovie = (movieObj, target) => {
    const movieCard = document.createElement('article');
    movieCard.classList.add('movie-card');
    movieCard.innerHTML = `
        <div class="movie-card-title">${movieObj.title}</div>
        <p class="movie-card-year">${movieObj.year}</p>
        <p class="movie-card-description">${movieObj.description}</p>
        <div class="d-flex align-item-center justify-content-between">
            <span class="movie-card-rating">Rating</span>
            <span class="movie-card-span">${movieObj.rating}</span>
        </div>
        <meter value=${movieObj.rating} min="0" max="10" class="movie-card-meter"></meter>
        <div class="d-flex align-item-center justify-content-start gap-10 flex-wrap">
            ${renderCategories(movieObj.categories)}
        </div>
    `;

    target.appendChild(movieCard)
}


export {getMovies, getMovie, searchMovieByTitle, postMovie, deleteMovie, patchMovie, renderMovie, renderCategories, TMDB_KEY, pullMoviesFromApi}