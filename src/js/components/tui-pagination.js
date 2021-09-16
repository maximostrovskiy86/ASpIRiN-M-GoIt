import newApiService from '../services/apiSevise';
import 'tui-pagination/dist/tui-pagination.css';
import prepareData from '../services/prepareData';
import Pagination from 'tui-pagination';
import { outputRefs } from '../const/refs';
import itemMediaTpl from '../../templates/item-media.hbs';
const paginationContainer = document.getElementById('tui-pagination-container');
// const instance = new Pagination(container, { totalItems: 100, itemsPerPage: 10, visiblePages: 5 });
// instance.getCurrentPage();

// import Pagination from 'tui-pagination';

// const paginationContainer = document.getElementById('pagination');

// function pagination(totalResults, currentPage) {
//   if (!totalResults || totalResults < 20) {
//     paginationContainer.innerHTML = '';
//     return;
//   }

//   const pagination = new Pagination(paginationContainer, paginationOptions);

//   pagination.setTotalItems(totalResults);
//   pagination.movePageTo(currentPage);

//   pagination.on('afterMove', newApiService);
// }

function pagination(totalPages) {
  if (!totalPages || totalPages < 2) {
    paginationContainer.innerHTML = '';
    return;
  }
  const paginationOptions = {
    itemsPerPage: 20,
    visiblePages: 5,
    totalItems: totalPages > 500 ? 500 : totalPages,
  };
  const pagination = new Pagination(paginationContainer, paginationOptions);

  // pagination.setTotalItems(totalResults);
  pagination.movePageTo(1);

  pagination.on('afterMove', fechNextPage);
}

async function fechNextPage(event) {
  let apiData = null;
  if (!newApiService.query) {
    apiData = await newApiService.fetchGetMediaTrending(event.page);
  } else {
    apiData = await newApiService.searchMovie(event.page);
  }
  const newData = prepareData(apiData);
  appendMediaMarkup(newData);
}
function appendMediaMarkup({ results }) {
  outputRefs.innerHTML = itemMediaTpl(results);
}

export default pagination;
