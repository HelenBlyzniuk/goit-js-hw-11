
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



async function onFormSubmit(e) {
    e.preventDefault();
    let name = e.target.elements.searchQuery.value.trim();
    console.log(name);
    
    const pictures = await fetchPhoto(name);
    console.log(pictures);
}
         





