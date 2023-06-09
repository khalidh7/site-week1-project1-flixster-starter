let currentpage = 1
const movieContainer = document.querySelector('#movie-container');
const loadbtn = document.querySelector('#load');
const searchbar= document.querySelector('#movie-search');
const currentmovies = 'now_playing?language=en-US&page='
const searchmovies = 'search/movie?'
const subtitle = document.querySelector('#subtitle')

//api request for when you want to load pages of api
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
        for(let i = 0; i<data.results.length; i++){
            generateCards(data.results[i])
        }
    })
    
}

//api request for when you search
function getMovieSearch(keyword, pageNumber){
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTVlNjNkMGYzYThlMDlmZGZmNjJlOTM5NDVjOTJkMCIsInN1YiI6IjY0ODBjNTY0ZDJiMjA5MDBjYTFkMDEyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bXi08n9awWMo-8N6GC60ZxocgP5xT7bhBvcNX3KbjTI'
        }
      };
      
    

    fetch(`https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=en-US&page=${pageNumber}`, options)
    .then(response => {return response.json()})
    .then(response => {
        return response
    })
    .then(data => {
        for(let i = 0; i<data.results.length; i++){
            generateCards(data.results[i])
        }
    })
    
}

//generate html for a single movie card
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
    image.classList.add('poster')
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



//when load button is called, go to next page of api and generate those cards
loadbtn.addEventListener("click", function(){
    currentpage+=1;
    if (searchbar.value.length == 0){
        getMoviePage(currentpage)
    }
    else{
        getMovieSearch(searchbar.value.toLowerCase(), currentpage)
    }

});

//when keys are pressed in the searchbar, search the keyword using api, if no letters are in the search bar value then display first page of api resutls
searchbar.addEventListener('keyup', function(){
    movieContainer.innerHTML = ''
    if (searchbar.value.length == 0){
        subtitle.innerText = "Search Results"
        currentpage=1
        getMoviePage(currentpage)
    }
    else{
        currentpage=1
        subtitle.innerText = "Now Playing:"
        getMovieSearch(searchbar.value.toLowerCase(), currentpage)
    }
})

//when window is loaded call this function
window.onload = function(){
    getMoviePage(currentpage)
}
