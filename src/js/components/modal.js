import modalTemplateTpl from '../../templates/modal.hbs';
import newApiService from '../services/apiSevise';
import { queueBtnRefs } from '../const/refs';
import { queueSave } from './queue';
import 'basiclightbox/dist/basicLightbox.min.css';
import * as basicLightbox from 'basiclightbox';
import { API_KEY } from '../const/index';
import ApiServer from '../services/apiSevise';

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

  // const arr = data.genres.map(item => item.name)
  // arr.splice(3)
  // console.log(arr)

  // if (!evt.target.classList.contains('film-card')) {
  //   return;
  // }

  window.addEventListener('keydown', onEscKeyPress);
  appendModalMarkup(data);
  refs.backDrop.classList.add('is-open');
  document.body.classList.add('no-scroll');
  const queueBtnRefs = document.querySelector('.js-queue');
  queueBtnRefs.addEventListener('click', queueSave);

  // ТРЕЙЛЕРЫ ЛОГИКА================
  const trailerBtn = document.querySelector('.trailer');

  const videos = data.videos.results || [];

  const youtubeVideo = videos.find(video => video.site === 'YouTube');
  if (youtubeVideo) {
    trailerBtn.classList.remove('is-hidden');
    trailerBtn.addEventListener('click', () => onShowTrailer(youtubeVideo));
  }
}

function appendModalMarkup(data) {
  return (refs.modal.innerHTML = modalTemplateTpl(data));
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  refs.backDrop.classList.remove('is-open');
  document.body.classList.remove('no-scroll');
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

async function onShowTrailer(youtubeVideo) {
  const instance = basicLightbox.create(`
      <iframe src="https://www.youtube.com/embed/${youtubeVideo.key}?autoplay=1&origin" width="560" height="315" frameborder="0"></iframe>
  `);

  instance.show();
}

refs.openList.addEventListener('click', onPictureClick);
refs.closeModal.addEventListener('click', onCloseModal);
refs.backDrop.addEventListener('click', onbackDropClick);

// 1-сделать запрас на api и передать ей id
// 2- получить ответ и взять массив на трейллеры вытянууть от туда key
// 3 взять код из доков и подставить key
