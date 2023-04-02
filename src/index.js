
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import './css/styles.css';
import { fetchPhoto }  from './fetchPhoto.js'

 

const refs = {
    formEl: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    btnLoadMore:document.querySelector('.load-more'),
}
const form = document.querySelector('#search-form');
refs.gallery.setAttribute('uk-lightbox', 'caption-position:bottom');
let gallery = new SimpleLightbox('.gallery a');
   gallery.on('show.simplelightbox', function () {
});

gallery.on('error.simplelightbox', function (e) {
	console.log(e);
});


refs.formEl.addEventListener("submit", onFormSubmit);
refs.gallery.addEventListener('click', onGalleryClick);
refs.btnLoadMore.addEventListener('click', onLoadMoreClick);


let params = {
  page: 1,
  name:''
}
 
let currentName = '';
let totalAmount = 0;



async function onFormSubmit(e) {
 
  e.preventDefault();
   
  params.name = e.target.elements.searchQuery.value.trim();
  console.log(params.name);
  
  if (params.name !== currentName) {
    clearGallery();
    
  }

  if (params.name === '') {
    Notiflix.Notify.failure('Enter data you want to find');
    return;
  }

  currentName = params.name;
 
  const { data: { hits, totalHits } } = await fetchPhoto(params);
  totalAmount = totalHits;
  Notiflix.Notify.success(`We have found ${totalAmount} photos for you`);
 

  if (hits.length === 0) {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again');
  }
  else {
    const galleryItems = await galleryMarkup(hits);
    addGalleryItems(galleryItems);
    params.page += 1;
    totalAmount -= 40;
    gallery.refresh();
  }
} 

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
    gallery.refresh();
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
      return ` 
        <a href="${ webformatURL}" class="photo-card">
        <img src="${largeImageURL}" alt="${tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes:</b>
          ${likes}
        </p>
        <p class="info-item">
          <b>Views:</b>
          ${views}
        </p>
        <p class="info-item">
          <b>Comments:</b>
          ${comments}
        </p>
        <p class="info-item">
          <b>Downloads:</b>
          ${downloads}
        </p>
      </div>
      </a>
      `
    }).join('');
}
         
function addGalleryItems(items) {
  refs.gallery.insertAdjacentHTML('beforeend', items);
    refs.btnLoadMore.classList.remove('is-hidden');
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function onGalleryClick(e) {
  
   e.preventDefault();
    
    if (e.target.nodeName !== "IMG") {
        return
    };
    
    let href = (e.target.closest('a').getAttribute('href'));
    return href;
    
 
}





