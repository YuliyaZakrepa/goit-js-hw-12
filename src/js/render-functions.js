import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';
const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMore = document.querySelector('.js-load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class="gallery-item">
    <a href = "${largeImageURL}" class = "gallery-link">
    <img src = "${webformatURL}" alt = "${tags}"/>
    <div class="info-wrapper"> 
    <p><span>likes:</span> ${likes}</p>
    <p><span>views:</span> ${views}</p>
    <p><span>comments:</span> ${comments}</p>
    <p><span>downloads:</span> ${downloads}</p>
    </div>
    </a>
  </li>`
    )
    .join('');
  galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}
export function clearGallery() {
  galleryContainer.innerHTML = '';
}
export function showLoader() {
  loader.classList.remove('hidden');
}
export function hideLoader() {
  loader.classList.add('hidden');
}
export function showLoadMoreButton() {
  loadMore.classList.remove('load-more-hidden');
}
export function hideLoadMoreButton() {
  loadMore.classList.add('load-more-hidden');
}
