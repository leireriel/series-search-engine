'use strict';

const input = document.querySelector('.search__input');
const button = document.querySelector('.search__button');
const result = document.querySelector('.result__series');
const favourite = document.querySelector('.fav__series');
const savedFavs = JSON.parse(localStorage.getItem('userFavs'));
let listFavourites = [];

//Save in LocalStorage
const saveLS = (arr) => {
  localStorage.setItem('userFavs', JSON.stringify(arr));
};

//Function to paint title of favourites section
const paintFavouritesTitle = arr => {
  const favTitle = document.createElement('h2');
  favTitle.classList.add('fav--title');
  const favTitleContent = document.createTextNode('Mis series favoritas');
  favTitle.appendChild(favTitleContent);
  favourite.appendChild(favTitle);
  if (arr.length < 1) {
    favourite.remove(favTitle);
  } else {
    favourite.appendChild(favTitle);
  }
};

//Function to clear favourites section in DOM
const clearFavourites = () => {
  favourite.innerHTML = '';
};

//Function to paint favourite series in DOM
const paintFavourites = arr => {
  clearFavourites();
  paintFavouritesTitle(arr);

  //Paint empty list for favourite series
  const favList = document.createElement('ol');
  favList.classList.add('fav--list');
  favourite.appendChild(favList);

  for (let item of arr) {
    const favImgData = item.img;
    const favNameData = item.name;

    //Containers and classes
    const favBoxSerie = document.createElement('li');
    favBoxSerie.classList.add('fav--box__serie');
    const favNameSerie = document.createElement('h3');
    favNameSerie.classList.add('fav--name__serie');
    const favImgSerie = document.createElement('img');
    favImgSerie.classList.add('fav--img__serie');
    const favDelete = document.createElement('div');
    favDelete.classList.add('fav--delete');

    //Content
    const favNameContent = document.createTextNode(favNameData);
    favImgSerie.src = favImgData;

    //Appenchild
    favList.appendChild(favBoxSerie);
    favBoxSerie.appendChild(favImgSerie);
    favBoxSerie.appendChild(favNameSerie);
    favBoxSerie.appendChild(favDelete);
    favNameSerie.appendChild(favNameContent);

    favDelete.addEventListener('click', deleteFavourite);
  }
};

//Delete from favourite
function deleteFavourite (e) {
  const trigger = e.currentTarget;
  const parent = trigger.parentElement;

  const img = parent.querySelector('.fav--img__serie');
  const name = parent.querySelector('.fav--name__serie');

  const favImg = img.src;
  const favName = name.innerHTML;

  const favObj = { img: favImg, name: favName, };

  for (let fav of listFavourites) {
    if (fav === favObj) {
      listFavourites.splice(fav);
      saveLS(listFavourites);
      paintFavourites(listFavourites);
    }
  }
}

//Function to pick series as favourites
const pickAsFavourite = e => {
  const trigger = e.currentTarget;
  trigger.classList.toggle('fav__serie');

  const img = trigger.querySelector('.img__serie');
  const name = trigger.querySelector('.name__serie');

  const favImg = img.src;
  const favName = name.innerHTML;

  const favObj = { img: favImg, name: favName, };

  if (trigger.classList.contains('fav__serie')) {
    listFavourites.push(favObj);
  }
  saveLS(listFavourites);
  paintFavourites(listFavourites);
};

//Function to paint series in DOM
const paintSeries = arrOfObjs => {
  result.innerHTML = '';
  for (let i = 0; i < arrOfObjs.length; i++) {
    const nameData = arrOfObjs[i].show.name;
    const imgData = arrOfObjs[i].show.image;

    //Containers and classes
    const boxSerie = document.createElement('li');
    boxSerie.classList.add('box__serie');
    const nameSerie = document.createElement('h4');
    nameSerie.classList.add('name__serie');
    const imgSerie = document.createElement('img');
    imgSerie.classList.add('img__serie');

    //Content
    const nameContent = document.createTextNode(nameData);
    if (imgData === null) {
      imgSerie.src = 'https://via.placeholder.com/210x295/bbbbbb/666666/?text=TV';
    } else {
      imgSerie.src = imgData.medium || imgData.original;
    }
    imgSerie.alt = `Cover of the serie ${nameData}`;

    //Appenchild
    result.appendChild(boxSerie);
    boxSerie.appendChild(imgSerie);
    boxSerie.appendChild(nameSerie);
    nameSerie.appendChild(nameContent);

    boxSerie.addEventListener('click', pickAsFavourite);
  }
};

//Function to fetch series from API
const fetchSeriesFromAPI = () => {
  fetch(`http://api.tvmaze.com/search/shows?q=${input.value}`)
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        paintSeries(data);
      } else {
        result.innerHTML = 'No se encontraron resultados';
      }
    })
    .catch(error => {
      result.innerHTML = `Ha ocurrido un error: ${error}`;
    });
};

//Function that allows to press Enter besides search button
const enterKey = e => {
  if (e.keyCode === 13) {
    fetchSeriesFromAPI();
  }
};

//Function to clear input
const clearInput = () => input.value = '';

//Get from LocalStorage
const getLS = () => {
  if (savedFavs !== null) {
    listFavourites = savedFavs;
    paintFavourites(savedFavs);
  } else {
    listFavourites = [];
  }
};

getLS();

button.addEventListener('click', fetchSeriesFromAPI);
input.addEventListener('keyup', enterKey);
input.addEventListener('click', clearInput);

