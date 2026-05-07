import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import './css/loader.css';
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const input = document.querySelector('input');
const loadMore = document.querySelector('.js-load-more');

form.addEventListener('submit', handleSubmit);
loadMore.addEventListener('click', handleClick);
let page = 1;
let per_page = 15;
let query = '';

async function handleSubmit(event) {
  event.preventDefault();

  query = input.value.trim().toLocaleLowerCase();

  if (query.length === 0) {
    iziToast.warning({
      message: 'Please enter a search query!',
      position: 'topRight',
      backgroundColor: '#EF4040',
      messageColor: '#FFFFFF',
      maxWidth: 432,
    });
    return;
  }
  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    console.log(data);

    if (data.hits.length > 0) {
      createGallery(data.hits);
      if (per_page < data.totalHits) {
        showLoadMoreButton();
      } else {
        hideLoadMoreButton();
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results",
          position: 'bottomCenter',
          backgroundColor: '#4391ea',
          messageColor: '#FFFFFF',
          maxWidth: 432,
        });
      }
    } else {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        backgroundColor: '#EF4040',
        messageColor: '#FFFFFF',
        maxWidth: 432,
      });
    }
  } catch (error) {
    iziToast.error({
      message: 'Error fetching data!',
      position: 'topRight',
      backgroundColor: '#aa5a5a',
      messageColor: '#6a1818',
      maxWidth: 432,
    });
  } finally {
    event.target.reset();
    hideLoader();
  }
}
async function handleClick() {
  page++;
  console.log(page);

  showLoader();
  loadMore.disabled = true;
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);
    if (page * per_page >= data.totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results",
        position: 'bottomCenter',
        backgroundColor: '#4391ea',
        messageColor: '#FFFFFF',
        maxWidth: 432,
      });
    } else {
      showLoadMoreButton();
    }
    const card = document.querySelector('.gallery-item');
    if (card) {
      const cardHeight = card.getBoundingClientRect().height;

      window.scrollBy({
        left: 0,
        top: 2 * cardHeight,
        behavior: 'smooth',
      });
    }
  } catch (error) {
    iziToast.error({
      message: 'Error fetching data!',
      position: 'topRight',
      backgroundColor: '#aa5a5a',
      messageColor: '#6a1818',
      maxWidth: 432,
    });
  } finally {
    loadMore.disabled = false;
    hideLoader();
  }
}
