import newApiService from "../services/apiSevise";
import {outputRefs, watchedBtn, watchedBtnRefs} from "../const/refs";
import localStorageFn from "./localStorage";
import watchedQueueTpl from "../../templates/item-media.hbs";

export const watchedSave = (e) => {
  const film = newApiService.openedFilm;
  const localWatched = localStorageFn.load('dataWatched');
  console.log(localWatched)

  if (!localWatched) {
    const arrayWatched = [film];
    localStorageFn.save('dataWatched', arrayWatched);
    return;
  }

  const isFind = localWatched.some(item => item.id === film.id);
  const target = e.target;

  const themeColor = {
    enabled: 'Add to Watched',
    disabled: 'Remove movie',
  };


  function buttonSwitcher() {
    const buttonStatus = localStorage.getItem('theme');
    if (buttonStatus && buttonStatus === themeColor.disabled) {
      target.classList.add('modal__btn-active');
      target.textContent = 'Remove movie';
      return;
    }
  }
  // buttonSwitcher();


  if (isFind) {
    target.classList.remove('modal__btn-active');

    const newLocalWatched = localWatched.filter(item => item.id !== film.id);

    localStorage.setItem('theme', themeColor.enabled);
    localStorageFn.save('dataWatched', newLocalWatched);
    target.textContent = 'Add to Watched';
    return;
  }

  if (localWatched.length === 0 || !isFind) {
    target.classList.add('modal__btn-active');
    localWatched.push(film);
    localStorageFn.save('dataWatched', localWatched);
    target.textContent = 'Remove movie';
    localStorage.setItem('theme', themeColor.disabled);
    return;
  }
}

export function appendWatchedMarkup() {
  const localWatched = localStorageFn.load('dataWatched');
  watchedBtn.classList.add('accent-color');
  return outputRefs.innerHTML = watchedQueueTpl(localWatched);
}

export const queueSave = () => {
  const film = newApiService.openedFilm;
  const localQueue = localStorageFn.load('dataQueue');


  if (!localQueue) {
    const arrayQueue = [film];
    localStorageFn.save('dataQueue', arrayQueue);
    return;
  }

  const isFind = localQueue.some(item => item.id === film.id);

  if (localQueue.length === 0 || !isFind) {
    localQueue.push(film);
    localStorageFn.save('dataQueue', localQueue);
    return;
  }
}

export function appendQueueMarkup() {
  const localQueue = localStorageFn.load('dataQueue');
  return outputRefs.innerHTML = watchedQueueTpl(localQueue);
}











