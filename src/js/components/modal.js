import modalTemplateTpl from '../../templates/modal.hbs';
import newApiService from '../services/apiSevise';
import {watchedSave, queueSave, changeButtonWatched, changeButtonQueue} from './queue';
import localStorageFn from "./localStorage";

const refs = {
  openList: document.querySelector('.media-container'),
  closeModal: document.querySelector('[data-action="close-modal"]'),
  backDrop: document.querySelector('.backdrop'),
  modal: document.querySelector('.modal-wrapper'),
};

async function onPictureClick(evt) {
  evt.preventDefault();

  const target = evt.target;
  const data = await newApiService.fetchOpenModal(target.dataset.id);

  console.log(target.dataset.id)

  // const arr = data.genres.map(item => item.name)
  // arr.splice(3)
  // console.log(arr)

  // if (!evt.target.classList.contains('film-card')) {
  //   return;
  // }

  window.addEventListener('keydown', onEscKeyPress);
  appendModalMarkup(data);
  refs.backDrop.classList.add('is-open');
  document.body.style.overflow = 'hidden';

  const watchedBtnRefs = document.querySelector('.js-watched');
  const queueBtnRefs = document.querySelector('.js-queue');

  watchedBtnRefs.addEventListener('click', watchedSave);
  queueBtnRefs.addEventListener('click', queueSave);

  const localWatched = localStorageFn.load('dataWatched');
  const isFindWatched = localWatched.some(item => item.id === +target.dataset.id);
  changeButtonWatched(isFindWatched, watchedBtnRefs);

  const localQueue = localStorageFn.load('dataQueue');
  const isFindQueue = localQueue.some(item => item.id === +target.dataset.id);
  changeButtonQueue(isFindQueue, queueBtnRefs);
}

function appendModalMarkup(data) {
  refs.modal.innerHTML = modalTemplateTpl(data);
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  refs.backDrop.classList.remove('is-open');
  document.body.style.overflow = 'auto';
}

function onbackDropClick(e) {
  if (e.currentTarget === e.target) {
    onCloseModal();
  }
}

function onEscKeyPress(e) {
  const ESC_KEY_CODE = 'Escape';
  if (e.code === ESC_KEY_CODE) {
    onCloseModal();
  }
}

refs.openList.addEventListener('click', onPictureClick);
refs.closeModal.addEventListener('click', onCloseModal);
refs.backDrop.addEventListener('click', onbackDropClick);
