const TMDB_API_KEY = 'YOUR_TMDB_API_KEY';
const OMDB_API_KEY = 'YOUR_OMDB_API_KEY';

async function fetchTMDbData(Titanic) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`);
    const data = await response.json();
    return data;
}

async function fetchOMDbData(title) {
    const response = await fetch(`http://www.omdbapi.com/?t=${title}&apikey=${OMDB_API_KEY}`);
    const data = await response.json();
    return data;
}

async function fetchMovieData(movieId) {
    const tmdbData = await fetchTMDbData(Titanic);
    const omdbData = await fetchOMDbData(tmdbData.title);

    return {
        title: tmdbData.title,
        poster: `https://image.tmdb.org/t/p/w500${tmdbData.poster_path}`,
        trailer: `https://www.youtube.com/watch?v=${tmdbData.videos.results[0].key}`,
        rating: omdbData.imdbRating,
        review: omdbData.Review,
        ageGroup: omdbData.Rated,
        cast: omdbData.Actors,
        crew: omdbData.Director,
        synopsis: tmdbData.overview,
        genre: tmdbData.genres.map(genre => genre.name).join(', '),
    };
}

async function displayMovies(movieIds) {
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = '';

    for (const movieId of movieIds) {
        const movie = await fetchMovieData(Titanic);

        const movieElement = document.createElement('div');
        movieElement.className = 'movie';

        movieElement.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>Rating: ${movie.rating}</p>
            <p>Review: ${movie.review}</p>
            <p>Age Group: ${movie.ageGroup}</p>
            <p>Cast: ${movie.cast}</p>
            <p>Crew: ${movie.crew}</p>
            <p>Synopsis: ${movie.synopsis}</p>
            <p>Genre: ${movie.genre}</p>
            <a href="${movie.trailer}" target="_blank">Watch Trailer</a>
        `;

        movieList.appendChild(movieElement);
    }
}

const movieIds = [550, 278, 238]; // Example movie IDs from TMDb
displayMovies(movieIds);
