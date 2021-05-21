// jshint esversion:9

const API_URL =
	'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c03300aa3d24442048373ae91cec8a3c&page=1';
const IMAGE = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API =
	'https://api.themoviedb.org/3/search/movie?api_key=c03300aa3d24442048373ae91cec8a3c&query="';
const form = document.getElementById('form');
const search = document.getElementById('search');

getApiData(API_URL);

async function getApiData(url) {
	const res = await fetch(url);
	const data = await res.json();

	console.log(data.results);
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
