//let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const API = 'https://dog.ceo/api/breed/chihuahua/images';
const API_BREEDS = 'https://dog.ceo/api/breeds/list/all';
const $contenedor = document.querySelector('.container');
const  moreBreed = document.querySelector('.more');
const moreDoggies = document.querySelector('.moreDoggies');

moreBreed.addEventListener('click',function(){
    moreDoggies.classList.toggle('showBreeds');
});

//Funcion para hacer request a mi API
const fetchData = async (url_api)=>{
    const respuesta = await fetch(url_api);
    const datos = await respuesta.json();
    return datos;
}

const fetchBreeds = async (url_breed)=>{
    const breeds = await fetch(url_breed);
    const breedsData = await breeds.json();
    //Parsing to array an object :B
    const b = Object.keys(breedsData.message);
    return b;

}

function selectingBreed(){
    const breedList = document.querySelectorAll('.breed');
    breedList.forEach(element => {
        element.addEventListener('click',function(){
            var containerItem = document.querySelectorAll('.container__item');
            var breed = document.querySelectorAll('.breed');
            breed.forEach(element=>{
                element.remove();
            })
            containerItem.forEach(element=>{
                element.remove();
            });
            showingData(`https://dog.ceo/api/breed/${element.innerText}/images`,API_BREEDS);
        });
    });
}

function templatePhoto(urlImage){
    return (`
        <div class="container__item">
            <img src="${urlImage}" alt="">
        </div>
    `);
}


function templateBreeds(urlImage){
    return (`
        <li class="breed">${urlImage}</li>
    `);
}


function createTemplate(StringTemplate){
    const html = document.implementation.createHTMLDocument();
    html.body.innerHTML = StringTemplate;
    return html.body.children[0];
}


const showingData = async (url_api,breed)=>{
    try {
        const data = await fetchData(url_api);
        const breeds = await fetchBreeds(breed)
        for(let i=0;i<data.message.length;i++){
            const HTMLString = templatePhoto(data.message[i]);
            const dogPhoto = createTemplate(HTMLString);
            $contenedor.append(dogPhoto);  
        }          

        breeds.forEach(element => {
            let HTMLString = templateBreeds(element);
            let dogBreed = createTemplate(HTMLString);
            moreDoggies.append(dogBreed);
        });

        selectingBreed();
        

    } catch (error) {
        console.log(error);
    }
}


showingData(API,API_BREEDS);