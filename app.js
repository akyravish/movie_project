// jshint esversion:9

const API_URL =
	'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c03300aa3d24442048373ae91cec8a3c&page=1';
const IMAGE = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API =
	'https://api.themoviedb.org/3/search/movie?api_key=c03300aa3d24442048373ae91cec8a3c&query="';
const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

getApiData(API_URL);

const colorRating = (vote) => {
	if (vote >= 8) {
		return 'green';
	} else if (vote >= 5) {
		return 'orange';
	} else {
		return 'red';
	}
};

const getMovie = (movies) => {
	movies.forEach((movie) => {
		const { title, vote_average, poster_path, overview } = movie;
		const movieEL = document.createElement('div');
		movieEL.classList.add('movie');
		movieEL.innerHTML = `
            <img src="${IMAGE + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${colorRating(
					vote_average
				)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `;

		main.appendChild(movieEL);
	});
};

async function getApiData(url) {
	const res = await fetch(url);
	const data = await res.json();

	getMovie(data.results);
}

form.addEventListener('submit', (e) => {
	e.preventDefault();

	const searchValue = search.value;

	if (searchValue && searchValue !== '') {
		getApiData(SEARCH_API + searchValue);
		search.value = '';
	} else {
		window.location.reload();
	}
});
