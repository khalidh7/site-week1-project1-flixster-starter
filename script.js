const apiKey = "395e63d0f3a8e09fdff62e93945c92d0";
let currentpage = 1
const movieContainer = document.querySelector('#movie-container');
const loadbtn = document.querySelector('#load');
const searchbar= document.querySelector('#movie-search');
const currentmovies = 'now_playing?language=en-US&page='
const searchmovies = 'search/movie?'

function getMoviePage(pageNumber){
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTVlNjNkMGYzYThlMDlmZGZmNjJlOTM5NDVjOTJkMCIsInN1YiI6IjY0ODBjNTY0ZDJiMjA5MDBjYTFkMDEyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bXi08n9awWMo-8N6GC60ZxocgP5xT7bhBvcNX3KbjTI'
        }
      };
      
    

    fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageNumber}`, options)
    .then(response => {return response.json()})
    .then(response => {
        return response
    })
    .then(data => {
        console.log(data)
        for(let i = 0; i<data.results.length; i++){
            generateCards(data.results[i])
        }
    })
    
}

function getMovieSearch(keyword){
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTVlNjNkMGYzYThlMDlmZGZmNjJlOTM5NDVjOTJkMCIsInN1YiI6IjY0ODBjNTY0ZDJiMjA5MDBjYTFkMDEyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bXi08n9awWMo-8N6GC60ZxocgP5xT7bhBvcNX3KbjTI'
        }
      };
      
    

    fetch(`https://api.themoviedb.org/3/movie/search/movie?${keyword}`, options)
    .then(response => {return response.json()})
    .then(response => {
        return response
    })
    .then(data => {
        console.log(data)
        for(let i = 0; i<data.results.length; i++){
            generateCards(data.results[i])
        }
    })
    
}


function generateCards(movieObject){
    let star = document.createElement('span');
    star.classList.add('star')
    let starContent = document.createTextNode('⭐')
    star.appendChild(starContent)

    let rating = document.createElement('span');
    let ratingContent = document.createTextNode(movieObject.vote_average);
    rating.classList.add('rating')
    rating.appendChild(ratingContent)

    let averageContainer = document.createElement('article');
    averageContainer.classList.add('average')
    averageContainer.appendChild(star);
    averageContainer.appendChild(rating);

    let image = document.createElement('img');
    image.src = "https://image.tmdb.org/t/p/original".concat(movieObject.poster_path)

    let name = document.createElement('span');
    name.classList.add('name');
    name.innerText = movieObject.original_title;

    let textContainer = document.createElement('section');
    textContainer.classList.add('movie-text')
    textContainer.appendChild(averageContainer)
    textContainer.appendChild(name)

    let movie = document.createElement('article')
    movie.classList.add('movie')
    movie.appendChild(image)
    movie.appendChild(textContainer)
    movieContainer.appendChild(movie)
}

loadbtn.addEventListener("click", function(){
    currentpage+=1;
    getMoviePage(currentpage)

});

function search(keyword){
    getMovieSearch(keyword)
}

searchbar.addEventListener('keyup', function(){
    console.log(searchbar.value)
    search(searchbar.value.toLowerCase())
})


/*searchbar.addEventListener('', function(){
    currentpage=1
    getMovies(currentmovies, currentpage, null)
})*/

//when window is loaded call this function
window.onload = function(){
    getMoviePage(currentpage)
}