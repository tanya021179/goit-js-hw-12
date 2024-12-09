import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { searchParams } from './js/pixabay-api';
import { checkGallery, useError } from './js/render-functions';

const form = document.querySelector('.js-form');
const gallery = document.querySelector('.gallery');
const search = document.querySelector('.form-search');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.js-load-more');
const endGallery = document.querySelector('.facts-span');

let query = '';
let page = 1;
let lightbox;

form.addEventListener('submit', handlerSearch);
loadMoreBtn.addEventListener('click', loadMorePictures);

async function handlerSearch(event) {
  event.preventDefault();
  query = search.value.trim();

  if (!query) return;

  search.value = '';
  page = 1;
  loader.style.display = 'inline';
  endGallery.textContent = '';

  try {
    const data = await searchParams(query, page);
    gallery.innerHTML = '';

    checkGallery(gallery, data.hits);

    if (!lightbox) {
      lightbox = new SimpleLightbox('.gallery a');
    } else {
      lightbox.refresh();
    }

    if (data.hits.length < data.totalHits) {
      loadMoreBtn.classList.remove('load-more-hidden');
    } else {
      loadMoreBtn.classList.add('load-more-hidden');
    }
  } catch (error) {
    console.log(error);
    useError(
      'Sorry, there are no images matching your search query. Please, try again!'
    );
  } finally {
    loader.style.display = 'none';
  }
}

async function loadMorePictures() {
  page += 1;
  loader.style.display = 'inline';

  try {
    const data = await searchParams(query, page);

    if (!data.hits || data.hits.length === 0) {
      loadMoreBtn.classList.add('load-more-hidden');
      endGallery.textContent =
        "We're sorry, but you've reached the end of search results.";
      return;
    }

    checkGallery(gallery, data.hits);
    lightbox.refresh();

    if (gallery.children.length >= data.totalHits) {
      loadMoreBtn.classList.add('load-more-hidden');
      endGallery.textContent =
        "We're sorry, but you've reached the end of search results.";
    } else {
      loadMoreBtn.classList.remove('load-more-hidden');
      endGallery.textContent = '';
    }

    const galleryItems = document.querySelectorAll('.gallery-item');

    const itemHeight =
      galleryItems[
        galleryItems.length - data.hits.length
      ].getBoundingClientRect().height;

    window.scrollBy({
      left: 0,
      top: itemHeight * 1.2,
      behavior: 'smooth',
    });
  } catch (error) {
    console.error('Error fetching images:', error);
    useError(
      'Sorry, there are no images matching your search query. Please, try again!'
    );
  } finally {
    loader.style.display = 'none';
  }
}
