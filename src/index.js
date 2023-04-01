
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
    let name = e.target.searchQuery.value.trim();
    console.log(name);
    
    const pictures = await fetchPhoto(name);
    console.log(pictures);
    // fetchCountryName(countryName)
    //     .then(data => {
    //         if (data.length > 10) {
    //             Notiflix.Notify.success('Too many matches found. Please enter a more specific name.');
                
    //         }  if (data.length >= 2 && data.length <= 10) {
        
    //             refs.divEl.innerHTML = '';
    //             refs.listEl.innerHTML = markupForSymbols(data);

    //         }  if (data.length === 1) {
    //             refs.listEl.innerHTML = '';
    //             console.log(data)
    //             refs.divEl.innerHTML = markupForCountry(data); 
    //         } 
    //     })
    //     .catch(error => {
    //     console.log(error);
    //     Notiflix.Notify.warning('Oops, there is no country with that name');})
         
}


// function markupForSymbols(array) {
//     return array.map(({ name, flags }) => {
//         return `
            
//           <div class ="wrapper"><p><img src="${flags.svg}" alt="flag of ${name.official}" width="50" height="30"> ${ name.official }</p></div>`
//        }).join('');
// }  
   

// function markupForCountry(array) {
//     return array.map(({ name, capital, population, flags, languages}) => {
//         return ` <p class = "title"><img src="${flags.svg}" alt="flag of ${name.official}" width="70" height="50"> ${ name.official }</p>
//             <p><span> Capital:</span> ${capital}</p>
//             <p><span> Population:</span> ${population} people</p>
//             <p><span> Languages:</span> ${ Object.values(languages) }</p>`
//     }).join('');
             
// }

