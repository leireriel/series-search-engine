'use strict';

const input = document.querySelector('.search__input');
const button = document.querySelector('.search__button');
const result = document.querySelector('.result__series');
const favourite = document.querySelector('.fav__series');

//Function to pick serie as favourite   
const pickAsFavourite = e => e.currentTarget.classList.toggle('fav__serie');

//Function to paint series in DOM
const paintSeriesInDOM = arrOfObjs => {
  result.innerHTML = '';
  for (let item of arrOfObjs) {
    const nameData = item.show.name;
    const imgData = item.show.image.medium;
    //Containers and classes
    const boxSerie = document.createElement('div');
    boxSerie.classList.add('box__serie');
    const nameSerie = document.createElement('h2');
    nameSerie.classList.add('name__serie');
    const imgSerie = document.createElement('img');
    imgSerie.classList.add('img__serie');

    //Content
    const nameContent = document.createTextNode(nameData);
    if (imgData === null) {
      imgSerie.src = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
    } else {
      imgSerie.src = imgData;
    }
    imgSerie.alt = `Image of serie ${nameData}`;

    //Appenchild
    result.appendChild(boxSerie);
    boxSerie.appendChild(imgSerie);
    boxSerie.appendChild(nameSerie);
    nameSerie.appendChild(nameContent);

    //Poner imágenes vacías!!

    //cargar mas de 10 resultados

    //Function to pick serie as favourite
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
input.addEventListener('click', clearInput);
input.addEventListener('keyup', enterKey);
