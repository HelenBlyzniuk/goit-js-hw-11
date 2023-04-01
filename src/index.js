
import Notiflix from 'notiflix';
import axios from 'axios';
import './css/styles.css';
import { fetchPhoto }  from './fetchPhoto.js'

 

const refs = {
    formEl: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    btnLoadMore:document.querySelector('.load-more'),
}

refs.formEl.addEventListener("submit", onFormSubmit);
refs.btnLoadMore.addEventListener('click', onLoadMoreClick)
let page = 1;
 
async function onLoadMoreClick(e) {
  page += 1;
  

}

async function onFormSubmit(e) {
  e.preventDefault();
  let name = e.target.elements.searchQuery.value.trim();
  console.log(name);
  if (name === '') {
    Notiflix.Notify.failure('Enter data you want to find');
  }
 
  const { data:{hits} } = await fetchPhoto(name, page);
  
  
  if (hits === []) {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again')
  }
  else {
    const galleryItems = await galleryMarkup(hits);
    
    refs.gallery.innerHTML = galleryItems;
    refs.btnLoadMore.classList.remove('is-hidden');
   
  }
} 



function galleryMarkup(array) {
    return array.map(({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads }) => {
        return ` <div class="photo-card">
        <img src="${largeImageURL}" alt="${tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes:${likes}</b>
        </p>
        <p class="info-item">
          <b>Views:${views}</b>
        </p>
        <p class="info-item">
          <b>Comments:${comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads:${downloads}</b>
        </p>
      </div>
      </div>`
    }).join('');
}
         





