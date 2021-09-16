import newApiService from './apiSevise';
import newDataModification from '../components/dataModification';

const prepareData = apiData => {
  const result = apiData.results.map(item => ({
    ...item,

    release_date: newDataModification.getDate(item),
    genre_ids: newDataModification.getGenres([...item.genre_ids], newApiService.genres),
  }));
  return { ...apiData, results: result };
};

export default prepareData;

// =====================нужно
// const normilizedResults = results.map(movie => {
//   let releaseYear = 'Unknown';
//   if (Date.parse(movie.release_date)) {
//     releaseYear = new Date(movie.release_date).getFullYear();
//   }
//   const iconFullPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
//   const poster = movie.poster_path ? iconFullPath : emptyImg;
//   return {
//     ...movie,
//     release_date: releaseYear,
//     poster_path: poster,
//   };
// return {
//   title: movie.title,
//   release_date: releaseYear,
//   poster_path: movie.poster_path,
// };
// });
// =====================нужно
