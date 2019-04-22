'use strict';

const input = document.querySelector('.search__input');
const button = document.querySelector('.search__button');
const result = document.querySelector('.result__series');
const favourite = document.querySelector('.fav__series');

//Function to fetch series from API
const fetchSeriesFromAPI = () => {
  fetch(`http://api.tvmaze.com/search/shows?q=${input.value}`)
    .then(response => response.json())
    .then(data => {
      result.innerHTML = '';
      for (let item of data) {
        const nameData = item.show.name;
        const imgData = item.show.image.medium;
        //CONTAINERS AND CLASSES
        const boxSerie = document.createElement('div');
        boxSerie.classList.add('box__serie');
        const nameSerie = document.createElement('h2');
        nameSerie.classList.add('name__serie');
        const imgSerie = document.createElement('img');
        imgSerie.classList.add('img__serie');

        //CONTENT
        const nameContent = document.createTextNode(nameData);
        imgSerie.src = imgData;
        imgSerie.alt = `Image of serie ${nameData}`;

        //APPENCHILD
        result.appendChild(boxSerie);
        boxSerie.appendChild(imgSerie);
        boxSerie.appendChild(nameSerie);
        nameSerie.appendChild(nameContent);
      }
    });
}

//Function that allows to press Enter besides search button
const enterKey = e => {
  if (e.keyCode == 13) {
      fetchSeriesFromAPI();
  }
}

//Function to clean input
const cleanInput = () => input.value = '';

button.addEventListener('click', fetchSeriesFromAPI);
input.addEventListener('click', cleanInput);
input.addEventListener('keyup', enterKey);
