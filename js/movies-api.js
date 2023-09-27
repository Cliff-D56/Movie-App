import {BEARER_TOKEN} from "./keys.js";


const pullMoviesFromApi = async (input) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${input}`
    const options = {
        "method": "GET",
        "headers": {
            "Content-Type": "application/json",
            'Authorization': `${BEARER_TOKEN}`,
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
        console.log(searchResult)
        if (searchResult.length > 0) {
            throw new Error("Book already Exists in the database.")
        }
        const trailers = await getTrailers(movie.id)
        console.log(trailers)
        const url = "http://localhost:3000/movies";
        const body = {
            ...movie,
            trailers: trailers.results
        }
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
const getTrailers = async (id) => {
    try {
        const url =`https://api.themoviedb.org/3/movie/${id}/videos`;
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `${BEARER_TOKEN}`,
                'accept': 'application/json'

            },
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
        const body = {...movie}
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
            'Authorization': `${BEARER_TOKEN}`,
            'accept': 'application/json'
        }
    }
    const response = await fetch(url, options);
    return await response.json();
}

const renderMovie2 = (movie,target)=>{
    //TODO:REFACTOR TO INCLUDE API SEARCH
    const rating = 0;
    const movieCard=document.createElement('div')
    movieCard.classList.add('card')
    movieCard.classList.add('text-bg-dark')
    movieCard.setAttribute("data-id",`${movie.id}`)
    let poster =`https://image.tmdb.org/t/p/original${movie.poster_path}`
    genreId(movie.genre_ids)
    movieCard.innerHTML = `
        <img src=${poster}>
        <div class="card-body">
        <div class="card-header movie-header mb-3">
        <p class="movie-title"><strong>${movie.title}</strong></p>
        <div class="nav-item dropdown">
        <ul class="dropdown-menu dropdown-menu-dark">
        <li><button class="dropdown-item btn editbutton" id="M${movie.id}"data-bs-toggle="modal" data-bs-target="#exampleModal">Edit Info</button></li>
        <li><button class="dropdown-item btn deletebutton"  id="${movie.id}">Delete Movie</button></li>
        </ul>
         <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
</svg></a>
        </div>
        </div>
        <p class="movie-summary text-start">${movie.overview}</p>
        <p class="movie-card-year">Filmed in: ${movie.release_date}</p>
        </div>
                <div class="movie-category d-flex align-items-center justify-content-center">
                    ${movie.genre_ids
                .map(
                    (genre)=>`
                        <span class="movie-card-tag bg-dark-subtle">${genre} </span>
                        `
                )
                .join('')}
              </div>
        <!--TODO:MAKE VOTERS INTO RATING-->
        <meter class="movie-card-meter container-fluid" min="0" max="10" value=${movie.vote_average}></meter>
        ${movie.trailers?.length > 0 ? (`<a href="#" class="btn btn-primary trailer" data-bs-toggle="modal" data-bs-target="#exampleModal">Watch Trailer</a>`) : (`<a href="#" class="btn btn-primary trailer disabled"  aria-disabled>No Trailer</a>`)}
        <input type="hidden" id="trailerId" value=${movie.trailer}>
    `;
    target.appendChild(movieCard)
    const deletebutton = movieCard.querySelector(".deletebutton")
    deletebutton.addEventListener("click",async function (){
        await deleteMovie(this.id)
        let movies = await getMovies()
        movieLoop(movies)
    })
    const editbutton=movieCard.querySelector(".editbutton")
    editbutton.addEventListener("click",async function (){
        let id = this.parentElement
            .parentElement
            .parentElement
            .parentElement
            .parentElement
            .parentElement.getAttribute("data-id")
        let summary = this.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].innerText
        let summary2 = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement//.children[2]//.children
        let title = this.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].children[0].innerText
        let year = this.parentElement.parentElement.parentElement.parentElement.parentElement.children[2].innerText
        console.log(year)
        $(".modal-header").html(`Movie Information`)
        $(".modal-body").html(
            `
                    <input type="hidden" id="hiddenID" value=${id}>
                    <input type="text" id="replacementtitle" value="${title}">
                    <input type="text" id="replacementyear" value="${year}">
                    <textarea id="replacementsummary" style="height: 200px;width: 400px;">${summary}</textarea>
                    <label for="rating">Movie Rating:
                    <select id="replacementrating">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    </select>
                    </label>
        `)
        let modalFtr = document.querySelector(".modal-footer")
        modalFtr.innerHTML=`
            <button type="button" id="replace2" data-bs-dismiss="modal" class="btn btn-primary">Save changes</button>
            `;
        const replacebutton = document.querySelector("#replace2")
        replacebutton.addEventListener("click",async function (){
            const title = document.querySelector("#replacementtitle").value
            const year = document.querySelector("#replacementyear").value
            const summary = document.querySelector("#replacementsummary").value
            const id = document.querySelector("#hiddenID").value
            let movie = await getMovie(id)
            const meter = document.querySelector(".movie-card-meter")
            const rating = document.querySelector("#replacementrating").value
            console.log(rating)
            document.querySelector(`.card[data-id="${id}"] .movie-card-meter`).value=rating
            movie.vote_average = rating
            document.querySelector(`.card[data-id="${id}"] .movie-title`).innerText=title
            document.querySelector(`.card[data-id="${id}"] .movie-card-year`).innerText=year
            document.querySelector(`.card[data-id="${id}"] .movie-summary`).innerText=summary
            console.log(movie)
            await patchMovie(movie)
        })
        })
    let modalHeader = document.querySelector(".modal-title")
    let modalBody = document.querySelector(".modal-body")
    let modalFtr = document.querySelector(".modal-footer")
    const watchTrailerBtn = movieCard.querySelector('a.trailer');
    watchTrailerBtn.addEventListener("click",function (){
        modalHeader.innerText=`Movie Trailer `
        modalBody.innerHTML=`
            <iframe height="315" src="https://www.youtube.com/embed/${movie?.trailers[0]?.key}?si=${movie?.trailers[0]?.id}?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        `;
        modalFtr.innerHTML=`
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        `;
    })
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
        <button type="button" id="${results.id}" class="btn btn-primary addBtn" data-bs-dismiss="modal">Add as Favorite</button>
        `
        target.appendChild(searchCard)
        const addbtn = searchCard.querySelector(".addBtn")
        addbtn.addEventListener("click",async function (){
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
            await postMovie(results)
            let movies = await getMovies()
            movieLoop(movies)
        })
        console.log(movie.results[i])
    }
}
const movieLoop = (movies)=>{
    $(".movies-grid").html("")
    for (let movie of movies){
        const target = document.querySelector(".movies-grid");
        renderMovie2(movie,target)
    }
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

export {getMovies,pullMoviesFromApi,searchLoop,movieLoop}

