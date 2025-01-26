import { createGallery } from './js/render-functions';
import { fetchPhotoByQuery } from './js/pixabay-api';

import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('.js-search-form');
const gallery = document.querySelector('.js-gallery');

const lightbox = new SimpleLightbox('.gallery-link', {
  captionsData: 'alt',
  captionDelay: 50,
});

const onSearchFormSubmit = async event => {
  try {
    event.preventDefault();
    const searchedQuery = event.currentTarget.elements.user_query.value.trim();

    if (searchedQuery === '') {
      iziToast.show({ message: `the field must be filled!` });
      return;
    }
    const { data } = await fetchPhotoByQuery(searchedQuery);
    loader.style.display = 'flex';

    if (data.total === 0) {
      iziToast.show({
        message: `Sorry, there are no images matching your search query. Please try again!`,
      });
      gallery.innerHTML = '';
      searchForm.reset();
      return;
    }
    const galleryTemplate = data.hits.map(el => createGallery(el)).join('');
    gallery.innerHTML = galleryTemplate;
    lightbox.refresh();
    //   .catch(err => {
    //     console.log(err);
    //   })
    //   .finally(() => {
    //     loader.style.display = 'none';
    //   });
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     })
    //     .finally(() => {
    //       loader.style.display = 'none';
    //     });
  } catch (error) {
    console.log(error);
  }
};

searchForm.addEventListener('submit', onSearchFormSubmit);
