import {queueBtn,watchedBtn} from '../const/refs';
import errorNotification from './pnotify';
import startPagination from '../components/tui-pagination';

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
import {appendQueueMarkup, appendWatchedMarkup} from './queue';
import appendMediaMarkup from './media'

function homeInputHeader() {
  inputLink.classList.remove('is-hidden');
  buttonsLink.classList.add('is-hidden');
  homeLink.classList.add('navigation__link--active');
  libraryLink.classList.remove('navigation__link--active');
  headerLink.classList.remove('is-hidden');
  headerRefs.classList.remove('bg-library');
  appendMediaMarkup();
}

function homeLibraryHeader() {
  buttonsLink.classList.remove('is-hidden');
  inputLink.classList.add('is-hidden');
  homeLink.classList.remove('navigation__link--active');
  libraryLink.classList.add('navigation__link--active');
  headerLink.classList.add('is-hidden');
  headerRefs.classList.add('bg-library');
  appendWatchedMarkup();
}

function openQueue() {
  appendQueueMarkup();
  queueBtn.classList.add('accent-color');
  watchedBtn.classList.remove('accent-color');
}

function openWatched() {
  appendWatchedMarkup();
  queueBtn.classList.remove('accent-color');
  watchedBtn.classList.add('accent-color');
}

queueBtn.addEventListener('click', openQueue);
watchedBtn.addEventListener('click', openWatched);

homeLink.addEventListener('click', homeInputHeader);
libraryLink.addEventListener('click', homeLibraryHeader);

formRefs.addEventListener('submit', serchMovieHandler);

async function serchMovieHandler(event) {
  event.preventDefault();

  apiService.searchQuery = event.currentTarget.elements.form__input.value;
  if (apiService.query === '') {
    onLoadPage();
    return;
  }
  const data = await apiService.searchMovie();

  if (data.results.length === 0) {
    errorNotification();
    return;
  }

  startPagination(data.total_pages);
}