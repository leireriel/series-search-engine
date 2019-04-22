'use strict';

const input = document.querySelector('.search__input');
const button = document.querySelector('.search__button');
const result = document.querySelector('.result__series');
const favourite = document.querySelector('.fav__series');
const listFavouriteSeries = [];

//Function to paint favourite series
const paintFavouritesInDOM = () => {
  const favTitle = document.createElement('h3');
  favTitle.classList.add('fav--title');
  const favTitleContent = document.createTextNode('Mis series favoritas');
  favTitle.appendChild(favTitleContent);

  for(let favSerie of listFavouriteSeries) {
    const favImgData = favSerie.querySelector('.img__serie');
    const favNameData = favSerie.querySelector('.name__serie');
    //Containers and classes
    const favBoxSerie = document.createElement('li');
    favBoxSerie.classList.add('fav--box__serie');
    const favNameSerie = document.createElement('h4');
    favNameSerie.classList.add('fav--name__serie');
    const favImgSerie = document.createElement('div');
    favImgSerie.classList.add('fav--img__serie');

    //Content
    const favNameContent = document.createTextNode(favNameData.innerHTML);
    favImgSerie.style = `background-image: url("${favImgData.src}"); background-repeat: no-repeat; background-size: contain`;

    //Appenchild
    favourite.appendChild(favTitle);
    favourite.appendChild(favBoxSerie);
    favBoxSerie.appendChild(favImgSerie);
    favBoxSerie.appendChild(favNameSerie);
    favNameSerie.appendChild(favNameContent);
  }
};

//Function to pick series as favourites
const pickAsFavourite = e => {
  const trigger = e.currentTarget;
  trigger.classList.toggle('fav__serie');
  if (trigger.classList.contains('fav__serie')) {
    listFavouriteSeries.push(trigger);
    paintFavouritesInDOM();
  }
};

//Function to paint series in DOM
const paintSeriesInDOM = arrOfObjs => {
  result.innerHTML = '';
  for (let i = 0; i < arrOfObjs.length; i++) {
    const nameData = arrOfObjs[i].show.name;
    const imgData = arrOfObjs[i].show.image;
    //Containers and classes
    const boxSerie = document.createElement('li');
    boxSerie.classList.add('box__serie');
    const nameSerie = document.createElement('h2');
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
      paintSeriesInDOM(data);
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

button.addEventListener('click', fetchSeriesFromAPI);
input.addEventListener('keyup', enterKey);
input.addEventListener('click', clearInput);
