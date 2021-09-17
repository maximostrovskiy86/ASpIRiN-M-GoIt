import newApiService from "../services/apiSevise";
import {outputRefs} from "../const/refs";
import localStorageFn from "./localStorage";
import watchedQueueTpl from "../../templates/watched-queue.hbs";


export const queueSave = () => {
  const film = newApiService.openFilm;
  console.log(film)

  // localStorage.setItem('data', JSON.stringify(data));
  //
  // //
  // const dataStorage = localStorage.getItem(data)
  // // console.log(dataStorage)
  const localQueue = localStorageFn.load('dataQueue');

  // console.log(localQueue)
  if (!localQueue) {
    const arrayQueue = [film];
    console.log(arrayQueue)
    localStorageFn.save('dataQueue', arrayQueue);
    return;
  }

  localQueue.push(film)
  localStorageFn.save('dataQueue', localQueue);
  return localQueue;
  // const markup = localQueue.map(item => {
  //   console.log(item)
  //   return item;
  // })

  // console.log(markup)

  // appendMediaMarkup(localQueue);

}

function appendMediaMarkup(queueSave) {
  // const data = localStorage.getItem('dataQueue');
  // const parseData = JSON.parse(data) || [];
  // console.log(queueSave)
  const localQueue = localStorageFn.load('dataQueue');
  console.log(localQueue)
  return outputRefs.innerHTML = watchedQueueTpl(localQueue);
}

export default appendMediaMarkup;






