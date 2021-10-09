const main = document.querySelector('.container-info-movies')
const imageMovie = document.querySelector('.image-movie img')
const titleMovie = document.querySelector('.info-movie h1')
const allP = document.querySelectorAll('.info-movie p')
const h3 = document.querySelector('.info-movie h3')
const lupa = document.querySelector('.lupa')
const formMovie = document.querySelector('.input-movie')
const buttonSearch = document.querySelector('.search-info')
const mainPrincipal = document.querySelector('.main')
const box = document.querySelectorAll('.box img')

export default function initRequire(queryForm) {
  formMovie.classList.remove('ativo')
  buttonSearch.classList.remove('ativo')
  const api_key = '87dbc482186d913fb1362a8dcd5be0ce'

  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${queryForm}&language=pt-BR`)
  .then(r => {
    return r.json()
  })
  .then(movies => { 
    const results = movies.results[0]
    const imageBackground = results.backdrop_path
    const idGenre = results.genre_ids[0]
    const image = results.poster_path

    let number = 1;
    box.forEach(item => {
      const images = movies.results[number].poster_path
      item.setAttribute('src', `https://image.tmdb.org/t/p/w300/${images}`)
      number++
    })
    
    
    titleMovie.innerHTML = `${results.title}`
    imageMovie.setAttribute('src', `https://image.tmdb.org/t/p/w400/${image}`)
    
    
    allP[0].innerHTML = `Idioma: ${results.original_language}`
    allP[3].innerHTML = results.overview
    h3.innerHTML = results.vote_average
    
    fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${api_key}&language=pt-BR`).
    then(r => r.json())
    .then(r => {
      const genres = r
      const newGenres = genres.genres
      newGenres.forEach(item => {
        if(item.id == idGenre) {
          allP[2].innerHTML = item.name
        }
      })
    }
    )
    
    // document.body.style.backgroundImage = `url('https://image.tmdb.org/t/p/w400/${imageBackground}')`;
  })
}

function getForm() {
  lupa.addEventListener('click', (e) => {
    formMovie.classList.toggle('ativo')
    buttonSearch.classList.toggle('ativo')
  })

  buttonSearch.addEventListener('click', e => {
    e.preventDefault()

    const query = formMovie.value
    mainPrincipal.classList.add('ativo')
    main.classList.add('ativo')
    formMovie.value = ''
    
    initRequire(query)
  })

}

getForm()