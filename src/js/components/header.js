import { outputRefs } from '../const/refs';
import itemMediaTpl from '../../templates/item-media.hbs';
import errorNotification from './pnotify';
import startPagination from '../components/tui-pagination';
import prepareData from '../services/prepareData';
import onLoadPage from '../components/media';
import {
  homeLink,
  libraryLink,
  inputLink,
  buttonsLink,
  headerLink,
  headerRefs,
  formRefs,
} from '../const/refs';

import apiService from '../services/apiSevise';

// =========================

// =========================
function homeInputHeader() {
  inputLink.classList.remove('is-hidden');
  buttonsLink.classList.add('is-hidden');
  homeLink.classList.add('navigation__link--active');
  libraryLink.classList.remove('navigation__link--active');
  headerLink.classList.remove('is-hidden');
  headerRefs.classList.remove('bg-library');
}

function homeLibraryHeader() {
  buttonsLink.classList.remove('is-hidden');
  inputLink.classList.add('is-hidden');
  homeLink.classList.remove('navigation__link--active');
  libraryLink.classList.add('navigation__link--active');
  headerLink.classList.add('is-hidden');
  headerRefs.classList.add('bg-library');
}

homeLink.addEventListener('click', homeInputHeader);
libraryLink.addEventListener('click', homeLibraryHeader);

formRefs.addEventListener('submit', serchMovieHandler);

async function serchMovieHandler(event) {
  event.preventDefault();
  apiService.searchQuery = event.currentTarget.elements.form__input.value;
  // apiService.searchMovie().then(data => console.log('data', data));
  // const genres = await apiService.fetchGetGenres();
  if (apiService.query === '') {
    onLoadPage();
    return;
  }
  const data = await apiService.searchMovie();

  if (data.results.length === 0) {
    errorNotification();
    return;
  }

  // const genresArr = [...genres.genres];

  // const result = data.results.map(item => ({
  //   ...item,
  //   release_date: getDate(item),
  //   genre_ids: getGenres([...item.genre_ids]),
  // }));
  // console.log('result', result);

  // function getDate(item) {
  //   const rDate = new Date(item.release_date);
  //   const year = rDate.getFullYear();
  //   return year;
  // }

  // function getGenres(arr) {
  //   let newArr = [];
  //   for (let i = 0; i < arr.length; i++) {
  //     for (let j = 0; j < genresArr.length; j++) {
  //       if (genresArr[j].id == arr[i]) {
  //         newArr.push(genresArr[j].name);
  //       }
  //     }
  //   }
  //   return newArr;
  // }

  // const newData = { ...data, results: result };
  // console.log(newData);
  const newData = prepareData(data);
  appendMediaMarkup(newData);
  startPagination(data.total_pages);
}

// ===============================

function appendMediaMarkup({ results }) {
  return (outputRefs.innerHTML = itemMediaTpl(results));
}
