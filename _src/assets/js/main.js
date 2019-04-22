'use strict';

const input = document.querySelector('.search__input');
const button = document.querySelector('.search__button');
const result = document.querySelector('.result__series');
const favourite = document.querySelector('.fav__series');

//Function to paint favourites
const paintFavouritesInDOM = () => {

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

    //Function to pick series as favourites
    const pickAsFavourite = e => {
      e.currentTarget.classList.toggle('fav__serie');
      const listFavouriteSeries = [];
      if (e.currentTarget.classList.contains('fav__serie')) {
        listFavouriteSeries.push(nameSerie.innerHTML);
      }
      console.log(listFavouriteSeries);
    };
    boxSerie.addEventListener('click', pickAsFavourite);



    paintFavouritesInDOM();
  }
};

//Function to fetch series from API
const fetchSeriesFromAPI = () => {
  fetch(`http://api.tvmaze.com/search/shows?q=${input.value}`)
    .then(response => response.json())
    .then(data => {
      paintSeriesInDOM(data);
    });

  //cargar mas de 10 resultados------------

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
