import newApiService from "../services/apiSevise";
import {queueBtnRefs} from "../const/refs";
import localStorageFn from "./localStorage";


export const queueSave = () => {
  // e.preventDefault();
  console.log()
  const film = newApiService.openFilm;
  // console.log(data)
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

}





