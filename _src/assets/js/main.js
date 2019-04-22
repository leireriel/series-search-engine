'use strict';

const input = document.querySelector('.search__input');
const button = document.querySelector('.search__button');
const result = document.querySelector('.result__series');
const favourite = document.querySelector('.fav__series');

const fetchSeriesFromAPI = () => {
  fetch(`http://api.tvmaze.com/search/shows?q=girls`)
    .then(response => response.json())
    .then(data => {
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
        imgSerie.alt = `Image of serie ${imgData}`;

        //APPENCHILD
        result.appendChild(boxSerie);
        boxSerie.appendChild(imgSerie);
        boxSerie.appendChild(nameSerie);
        nameSerie.appendChild(nameContent);
      }
    });
}

button.addEventListener('click', fetchSeriesFromAPI);
