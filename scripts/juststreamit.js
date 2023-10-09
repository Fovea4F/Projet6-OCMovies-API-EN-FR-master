'use strict';
/**********************************************************
 * script de gestion pour JustStreamIt
 **********************************************************/


const urlHref = "http://127.0.0.1:8000";
const genresPathEndPoint = "/api/v1/genres/";
const titlesPathEndPoint = "/api/v1/titles/";
const titlesSort = "-imdb_score";
const categoryList = ['numberOne', 'bestFilms', 'Biography', 'Sport', 'Adventure'];
const numberOfFilms = 7;

/*****************************************************************************/
/* Sélectionnez tous les éléments avec la classe "image-modal-trigger"       */
/*****************************************************************************/
// Sélectionnez l'élément de la boîte modale

/*****************************************************************************/

function createButton(parentElement) {
    let button = document.createElement('button');
    button.textContent = 'Lancer la vidéo'
}

function createInformationList(imageInformation, filmData) {
    //prepare list information to display in Modal Windows
    imageInformation.id = 'imageInfo';
    let informationList = [];
    informationList.push([`Titre du film     :  ${filmData.title}`]);
    informationList.push([`Genre             :  ${filmData.genres}`]);
    informationList.push([`Année de sortie   :  ${filmData.year}`]);
    informationList.push([`Notation          :  ${filmData.votes}`]);
    informationList.push([`Score imdb        :  ${filmData.imdb_score}`]);
    informationList.push([`Réalisateur       :  ${filmData.directors}`]);
    informationList.push([`Liste des acteurs :  ${filmData.actors}`]);
    return informationList;
};

function addArrows(category) {
    //Add arrows for Carrousel

    if (category == 'numberOne') {
        return;
    }
    let divCarrousel = document.getElementById(`carrousel${category}`);
    let rightArrow = document.createElement('img');
    rightArrow.src="images/icons8-chevron-droit-48.png";
    rightArrow.alt="right arrow - Image de icon8.com";
    rightArrow.classList.add("rightarrow");
    rightArrow.classList.add("arrow");
    rightArrow.classList.add("overlay");
    rightArrow.id=`rightarrow${category}`;
    divCarrousel.appendChild(rightArrow);
    let leftArrow = document.createElement('img');
    leftArrow.src="images/icons8-chevron-gauche-48.png";
    leftArrow.alt="left arrow - Image de icon8.com";
    leftArrow.classList.add(`leftarrow`);
    leftArrow.classList.add("arrow");
    leftArrow.classList.add("overlay");
    leftArrow.id=`leftarrow${category}`;
    divCarrousel.appendChild(leftArrow);
};

function addRightArrow(category) {
    //Add arrows for Carrousel

    if (category == 'numberOne') {
        return;
    }
    let divCarrousel = document.getElementById(`carrousel${category}`);
    //let divContainerImages = document.getElementById(`container${category}`);
    let rightArrow = document.createElement('img');
    rightArrow.src="images/icons8-chevron-droit-48.png";
    rightArrow.alt="right arrow - Image de icon8.com";
    rightArrow.classList.add("rightarrow");
    rightArrow.classList.add("arrow");
    rightArrow.classList.add("overlay");
    rightArrow.id=`rightarrow${category}`;
    divCarrousel.appendChild(rightArrow);
    //divContainerImages.appendChild(rightArrow);
};

function addLeftArrow(category) {
    //Add arrows for Carrousel

    if (category == 'numberOne') {
        return;
    }
    let divCarrousel = document.getElementById(`carrousel${category}`);
    //let divContainerImages = document.getElementById(`container${category}`);
    let leftArrow = document.createElement('img');
    leftArrow.src="images/icons8-chevron-gauche-48.png";
    leftArrow.alt="left arrow - Image de icon8.com";
    leftArrow.classList.add("leftarrow");
    leftArrow.classList.add("arrow");
    leftArrow.classList.add("overlay");
    leftArrow.id=`leftarrow${category}`;
    divCarrousel.appendChild(leftArrow);
    //divContainerImages.appendChild(leftArrow);
};

function  displayHideArrows(position, numberImage, categoryFilms) {
    //allow hide arrow at limit

    const leftArrow = document.getElementById(`leftarrow${categoryFilms}`)
    const rightArrow = document.getElementById(`rightarrow${categoryFilms}`)
    if (position == 0) {
        //leftArrow.setAttribute('display', 'none');
        rightArrow.style.display = 'none';
    } else {
        //leftArrow.setAttribute('display','block');
        rightArrow.style.display = 'block';
    };
    if (position == -numberImage+4) {
        //rightArrow.setAttribute('display', 'none');
        leftArrow.style.display = 'none';
    } else {
        //rightArrow.setAttribute('display','block');
        leftArrow.style.display = 'block';
    };
};

function modalClose() {
    
    const modalDiv = document.getElementById("image-modal"); //Select Div Modal
    const imageInModal = document.getElementById("modal-image"); //Select image inside Modal

    imageInModal.setAttribute("src", "");
    imageInModal.setAttribute("alt", "");
    
    while ((document.getElementById('imageInfo')) != null) {
        let elementUl = document.getElementById('imageInfo');
        elementUl.remove();
    };
    modalDiv.style.display = "none"; // Hide modal window
};

function modalCreation(imageDiv, filmData) {
    /*Modal Event actions*/

    console.log('FilmData : ', filmData);
    const modalDiv = document.getElementById("image-modal"); //Select Div Modal
    const imageInModal = document.getElementById("modal-image"); //Select image inside Modal
    const elementUl = document.getElementById('imageInfo');

    //console.log('Affichage imageDiv modal : ', imageDiv);
    imageDiv.addEventListener("click", () => {
        //Modal windows data creation and open actions
        modalClose();
        /* (elementUl != null) {
            elementUl.remove();;
        }*/
        let imageInformation = document.createElement('ul');
        let informationList = createInformationList(imageInformation, filmData);
        //console.log('ul modal : ', elementUl);
        //ul prune if exist
        //console.log('Modal ON modal creation: ', elementUl);
        console.log('erreur image :', filmData.image_url);
        if (!filmData.image_url) {
            
            imageInModal.setAttribute("src", "images/buildings.jpg");
        } else {
            imageInModal.setAttribute("src", filmData.image_url);
        }
        imageInModal.setAttribute("src", filmData.image_url);
        imageInModal.setAttribute("alt", imageDiv.alt);    
        for (index = 0; index<informationList.length; index++) {
            let dataElement = document.createElement('li');
            dataElement.textContent = informationList[index];
            imageInformation.appendChild(dataElement);
        };                  
        modalDiv.appendChild(imageInformation);
        modalDiv.classList.add('image-modal-trigger');
        modalDiv.style.display = "block"; // Affichez la boîte modale
        //console.log("Triggers");
        // Modal Events close actions
        modalDiv.addEventListener("click", () => {
           // modalClose(imageInModal, modalDiv);
           modalClose();
        });
        const closeModal = document.getElementById('close-modal');
        closeModal.addEventListener("click", () => {
            //modalClose(imageInModal, modalDiv);
            modalClose();
        });
        window.addEventListener("click", (event) => {
            if (event.target === modalDiv) {
                //modalClose(imageInModal, modalDiv);
                modalClose();
            };
        });
    });
};

function createCarrouselDiv(categoryFilms) {
    //insert div document for category, able to manage Carrousel view

    if (document.getElementById(`carrousel${categoryFilms}`) == null) {
        //let divGlobal = document.getElementById("leftsection");
        let divSection = document.getElementById('section');
        let divCarrousel = document.createElement(`div`);
        divSection.appendChild(divCarrousel);
        divCarrousel.id = `carrousel${categoryFilms}`;
        divCarrousel.classList.add("carrouselDiv");
        divCarrousel.classList.add(categoryFilms);
        divCarrousel.setAttribute('position', 0);
        if (indexList != null) {
            divCarrousel.setAttribute('order', categoryList.indexOf(categoryFilms));
        }
        divCarrousel.setAttribute('imageNumber', 7);
        divCarrousel.style.width =`${(182*4)}px`;        
        let title = document.createElement('h2');
        switch (categoryFilms) {
            case 'numberOne':
                title.textContent = 'Meilleur film !';                
                divCarrousel.setAttribute('order', 1);
                break;
            case 'bestFilms':
                title.textContent = 'Films les mieux notés';
                divCarrousel.setAttribute('order', 2);
                break;
            default:
                title.textContent = `Catégorie : ${categoryFilms}`;
                //divCarrousel.setAttribute('order', 'unset');
        };
        divCarrousel.appendChild(title);
        //addRightArrow(categoryFilms);
        addArrows(categoryFilms);
    };
};

function createContainerDiv(categoryFilms, videoTitle) {
    // create div container that will host images of a category

    let divCarrousel = document.getElementById(`carrousel${categoryFilms}`);
    //addLeftArrow(categoryFilms);
    let divContainerImages = document.createElement('div');
    divContainerImages.id = `container${categoryFilms}`;
    divContainerImages.classList.add('containerimages');
    /*it's time to adjust width of container images
    * hosting and some personalizations */
    if (categoryFilms == 'numberOne') {
        divContainerImages.style.width = `${(182*4)}px`;
        const filmTitleDiv = document.createElement('div');
        filmTitleDiv.id = 'filmTitle';
        const filmTitle = document.createTextNode(videoTitle);
        filmTitleDiv.appendChild(filmTitle);
        const filmButton = document.createElement('button');
        filmButton.classList.add('launchButton')
        filmButton.textContent = 'Play';
        filmTitleDiv.appendChild(filmButton);
        divContainerImages.appendChild(filmTitleDiv);
        let launchVideoButton = document.createElement('button');
        launchVideoButton.id = launchVideoButton;
        launchVideoButton.textContent = 'Play';
    } else {
        divContainerImages.style.width=`${(182*7)}px`;
    };
    divCarrousel.appendChild(divContainerImages);
    //addRightArrow(categoryFilms);
    //console.log('divCarrousel : ', divCarrousel);
    //console.log('divContainer : ', divContainerImages);
    let position = divCarrousel.getAttribute('position');
    const numberImage = divCarrousel.getAttribute('imageNumber');
    //Get every information for Carrousel management
    if (categoryFilms != 'numberOne') {
        const leftArrow = document.getElementById(`leftarrow${categoryFilms}`);
        const rightArrow = document.getElementById(`rightarrow${categoryFilms}`);
        leftArrow.addEventListener('click', function() {
            if (position > -numberImage+4) {
                position--;
                divContainerImages.style.transform=`translate(${position*182}px)`;
                divContainerImages.style.transition="all 0.6s ease";
                if (position == -numberImage+4) {
                    leftArrow.style.display= "none";
                    rightArrow.style.display = "block";
                } else {
                    leftArrow.style.display = "block";
                    rightArrow.style.display = "block";
                };
            };
        });
        rightArrow.addEventListener('click', () => {
            if (position < 0) {
                position++;
                divContainerImages.style.transform=`translate(${position*182}px)`;
                divContainerImages.style.transition="all 0.6s ease";
                if (position == 0) {
                    rightArrow.style.display = "none";
                    leftArrow.style.display = "block";
                } else {
                    rightArrow.style.display = "block";
                    leftArrow.style.display = "block";
                };
            };
        });
    };
};

function createImage(categoryFilms, filmData=[], indexList) {
    //create a div to display image film, get data to exploit in modal view

    const modalDiv = document.getElementById("image-modal"); //Select Div Modal
    const imageInModal = document.getElementById("modal-image"); //Select image inside Modal 

    //At first, documents hierarchy structure creation
    if (document.getElementById(`carrousel${categoryFilms}`) == null) {
        createCarrouselDiv(categoryFilms);
    };
    if (document.getElementById(`container${categoryFilms}`) == null) {
        createContainerDiv(categoryFilms, filmData.title);
    };
    let divContainerImages = document.getElementById(`container${categoryFilms}`);
    //Div creation and image add
    let imageNewDiv = document.createElement('div');
    imageNewDiv.classList.add('divImage');
    imageNewDiv.classList.add('imageToDisplay');
    /*backGroundImage = filmData.image_url;*/
    let image = document.createElement('img');
    image.src = filmData.image_url;
    image.id = filmData.id;
    image.alt = `Titre du livre : ${filmData.title}`;
    image.onload = () => {
        imageNewDiv.style.backgroundImage = `url(${image.src})`;  
    };
    //set default image if image load in error
    image.onerror = () => {
        image.src = "images/buildings.jpg";
        image.alt = `Titre du livre : ${filmData.title}`;
        
    };
    divContainerImages.appendChild(imageNewDiv);
    modalCreation(imageNewDiv, filmData)
};

async function getData(url) {
    try {
        let response = await fetch(url, );
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }
        let jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error(`Accès aux données impossible : ${error}`);
    };
};

let url = `${urlHref}${titlesPathEndPoint}?sort_by=-imdb_score`;
console.log('start');
let bestFilm = getData(url);
bestFilm.then((jsonData) => {
    let nextUrl = jsonData.next;
    let dataArray = jsonData.results;
    createImage('numberOne', dataArray[0]);
    //console.log('dataArray0 :', dataArray);
    for (index = 1; index < dataArray.length; index++) {
        createImage('bestFilms', dataArray[index]);
        //console.log('display image : ', dataArray);
    };
    bestFilm = getData(nextUrl);
    bestFilm.then((jsonData) => {
        let dataArray = jsonData.results;
        for (index = 0; index < numberOfFilms-4; index++) {
            createImage('bestFilms', dataArray[index]);
            //console.log('display image : ', dataArray);
        };
    displayHideArrows(0, numberOfFilms, 'bestFilms');
    });
});
let indexList = 0;
let index = 0;
for (indexList = 2; indexList < categoryList.length; indexList++) {
    let category = categoryList[indexList];
    let url = `${urlHref}${titlesPathEndPoint}?genre=${category}&sort_by=-imdb_score`;
    let film = getData(url);
    film.then((jsonData) => {
        let nextUrl = jsonData.next;
        let dataArray = jsonData.results;
        //console.log('jsonData',  dataArray);
        for (index = 0; index < dataArray.length; index++) {
            createImage(category, dataArray[index]);
            //console.log('display image : ', dataArray);
        }
        let film = getData(nextUrl);
        film.then((jsonData) => {
            dataArray = jsonData.results;
            for (index = 0; index < numberOfFilms-5; index++) {
                createImage(category, dataArray[index]);
                //console.log('display image : ', dataArray);
            };
        });
        //hide left arrow at first launch
        displayHideArrows(0, numberOfFilms, category);
    });
};

