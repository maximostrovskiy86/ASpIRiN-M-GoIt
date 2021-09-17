import newApiService from "../services/apiSevise";
import {outputRefs, queueBtn, watchedBtn} from "../const/refs";
import localStorageFn from "./localStorage";
import watchedQueueTpl from "../../templates/item-media.hbs";

export const watchedSave = () => {
  console.log(111)
  const film = newApiService.openedFilm;
  const localWatched = localStorageFn.load('dataWatched');
  console.log(localWatched)

  if (!localWatched) {
    const arrayWatched = [film];
    localStorageFn.save('dataWatched', arrayWatched);
    return;
  }

  const isFind = localWatched.some(item => item.id === film.id);

  // const checker = () => {
  //   for (let i = 0; i < localWatched.length; i++) {
  //     console.log(localWatched[i].id)
  //     if (localWatched[i].id === film.id) {
  //       return false;
  //     }
  //   }
  //   return true;
  // };

  if (localWatched.length === 0 || !isFind) {
    localWatched.push(film);
    localStorageFn.save('dataWatched', localWatched);
    return;
  }

  // localWatched.push(film);

}

export function appendWatchedMarkup() {
  const localWatched = localStorageFn.load('dataWatched');
  watchedBtn.classList.add('accent-color');
  return outputRefs.innerHTML = watchedQueueTpl(localWatched);
}

// export default appendQueueMarkup;


export const queueSave = () => {
  const film = newApiService.openedFilm;
  const localQueue = localStorageFn.load('dataQueue');

  // console.log(localQueue)
  if (!localQueue) {
    const arrayQueue = [film];
    localStorageFn.save('dataQueue', arrayQueue);
    return;
  }


  localQueue.push(film)
  localStorageFn.save('dataQueue', localQueue);
  return localQueue;
}

export function appendQueueMarkup() {
  const localQueue = localStorageFn.load('dataQueue');
  return outputRefs.innerHTML = watchedQueueTpl(localQueue);
}











