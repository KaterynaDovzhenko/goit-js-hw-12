import { createGallery } from './js/render-functions';
import { fetchPhotoByQuery } from './js/pixabay-api';

import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('.js-search-form');
const gallery = document.querySelector('.js-gallery');
const loadMoreBtn = document.querySelector('.js-loadmore-btn');

let page = 1;
let searchedQuery = '';

const lightbox = new SimpleLightbox('.gallery-link', {
  captionsData: 'alt',
  captionDelay: 50,
});

const onSearchFormSubmit = async event => {
  try {
    event.preventDefault();
    searchedQuery = event.currentTarget.elements.user_query.value.trim();

    if (searchedQuery === '') {
      iziToast.show({ message: `the field must be filled!` });
      return;
    }

    page = 1;
    loadMoreBtn.classList.add('is-hidden');
    loader.style.display = 'flex';
    gallery.innerHTML = '';

    const { data } = await fetchPhotoByQuery(searchedQuery, page);

    if (data.total === 0) {
      iziToast.show({
        message: `Sorry, there are no images matching your search query. Please try again!`,
      });
      searchForm.reset();
      return;
    }
    const galleryTemplate = data.hits.map(el => createGallery(el)).join('');
    gallery.innerHTML = galleryTemplate;

    lightbox.refresh();

    if (data.totalHits > 15) {
      loadMoreBtn.classList.remove('is-hidden');
    } else {
      loadMoreBtn.classList.add('is-hidden');
    }
    smoothScroll();
  } catch (err) {
    console.log(err);
    iziToast.show({ message: `Something went wrong. Please try again later.` });
  } finally {
    loader.style.display = 'none';
  }
};

const onLoadMoreBtnClick = async event => {
  try {
    page++;
    const { data } = await fetchPhotoByQuery(searchedQuery, page);
    const galleryTemplate = data.hits.map(el => createGallery(el)).join('');
    gallery.insertAdjacentHTML('beforeend', galleryTemplate);

    smoothScroll();
    lightbox.refresh();

    if (data.hits.length < 1 || data.total === gallery.children.length) {
      loadMoreBtn.classList.add('is-hidden');

      iziToast.show({
        message: `We're sorry, but you've reached the end of search results.`,
      });
    }
  } catch (err) {
    console.log(err);
    iziToast.show({
      message: `Something went wrong. Please try again later.`,
    });
  }
};
searchForm.addEventListener('submit', onSearchFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

function smoothScroll() {
  const galleryCard = document.querySelector('.gallery-card');
  if (galleryCard) {
    const cardHeight = galleryCard.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}
