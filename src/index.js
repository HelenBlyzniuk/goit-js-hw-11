
import Notiflix from 'notiflix';
import axios from 'axios';
import './css/styles.css';
import { fetchPhoto }  from './fetchPhoto.js'

 

const refs = {
    formEl: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    btnLoadMore:document.querySelector('.load-more'),
}
const form = document.querySelector('#search-form');

refs.formEl.addEventListener("submit", onFormSubmit);
refs.btnLoadMore.addEventListener('click', onLoadMoreClick)


let params = {
  page: 1,
  name:''
}
 
let totalAmount = 0;
async function onLoadMoreClick(e) {
  params.page += 1;
  totalAmount -= 40;
  
  if (totalAmount <= 0) {
    refs.btnLoadMore.classList.add('is-hidden');
    Notiflix.Notify.warning('There is no photo left');
    return
    
  } else {
    const { data: {hits} } = await fetchPhoto(params);
    const galleryItems = await galleryMarkup(hits);
    refs.gallery.insertAdjacentHTML('beforeend', galleryItems);
    Notiflix.Notify.success(`Still ${totalAmount} photos left`)
  }
  
}

async function onFormSubmit(e) {
 
  e.preventDefault();
  let total = 0;
  total+=e;
  console.log(total)
  params.name = e.target.elements.searchQuery.value.trim();
  
  if (params.name === '') {
    Notiflix.Notify.failure('Enter data you want to find');
    return;
  }
 
  const { data: { hits, totalHits } } = await fetchPhoto(params);
  totalAmount = totalHits;
  Notiflix.Notify.success(`We have found ${totalAmount} photos for you`);
  console.log(totalHits);
  if (hits.length === 0) {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again');
  }
  else {
    const galleryItems = await galleryMarkup(hits);
    refs.gallery.insertAdjacentHTML('beforeend', galleryItems);
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
         





