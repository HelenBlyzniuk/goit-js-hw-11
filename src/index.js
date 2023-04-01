// import debounce from 'lodash.debounce';
// import Notiflix from 'notiflix';

// import './css/styles.css';
// import fetchCountryName  from './fetchCountries.js';

 

// const refs = {
//     inputEl: document.querySelector('#search-box'),
//     listEl: document.querySelector('.country-list'),
//     divEl: document.querySelector('.country-info'),
// }

// let debounce = require('lodash.debounce');
// const DEBOUNCE_DELAY = 300;
// refs.inputEl.addEventListener('input', debounce(onCountryInput, DEBOUNCE_DELAY));


// function onCountryInput(e) {
//     let countryName = e.target.value.trim();
    
//     if (countryName === '') {
//         if (refs.listEl.innerHTML !== '' || refs.divEl.innerHTML !== '') {
//             refs.divEl.innerHTML = '';
//             refs.listEl.innerHTML = '';
//         }
//         return
//     }
//     fetchCountryName(countryName)
//         .then(data => {
//             if (data.length > 10) {
//                 Notiflix.Notify.success('Too many matches found. Please enter a more specific name.');
                
//             }  if (data.length >= 2 && data.length <= 10) {
        
//                 refs.divEl.innerHTML = '';
//                 refs.listEl.innerHTML = markupForSymbols(data);

//             }  if (data.length === 1) {
//                 refs.listEl.innerHTML = '';
//                 console.log(data)
//                 refs.divEl.innerHTML = markupForCountry(data); 
//             } 
//         })
//         .catch(error => {
//         console.log(error);
//         Notiflix.Notify.warning('Oops, there is no country with that name');})
         
// }


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

