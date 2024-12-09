import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export const useError = message => {
  iziToast.error({
    message,
    messageColor: '#fafafb',
    backgroundColor: '#ef4040',
  });
};

export const checkGallery = (gallery, images) => {
  if (images.length === 0) {
    useError(
      'Sorry, there are no images matching your search query. Please, try again!'
    );
    return;
  }

  gallery.insertAdjacentHTML('beforeend', createMarkup(images));
};

const createMarkup = arr => {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}">   
      <img class="gallery-image" src="${webformatURL}" alt="${tags}" width="360"/>
      </a>
      <div class="container">
      <p class="facts-container">
      Likes
    <span class="facts-span">${likes}</span></p> 
      <p class="facts-container">
      Views
    <span class="facts-span">${views}</span></p>
      <p class="facts-container">
      Comments
    <span class="facts-span">${comments}</span></p>
      <p class="facts-container">
      Downloads
    <span class="facts-span">${downloads}</span></p>
      </div>
      </li>
    `
    )
    .join('');
};
