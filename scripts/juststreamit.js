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

function createInformationList(imageInformation, filmData) {
    //create data in <ul> for modal image information

    let dataElement = document.createElement('li');
    dataElement.textContent = `Titre du film            :  ${filmData.title}`;
    imageInformation.appendChild(dataElement);
    dataElement = document.createElement('li');
    dataElement.textContent = `Genre                    :  ${filmData.genres}`;
    imageInformation.appendChild(dataElement);
    dataElement = document.createElement('li');
    dataElement.textContent = `Année de sortie          :  ${filmData.year}`;
    imageInformation.appendChild(dataElement);
    dataElement = document.createElement('li');
    dataElement.textContent = `Nombre de votes          :  ${filmData.votes}`;
    imageInformation.appendChild(dataElement);
    dataElement = document.createElement('li');
    dataElement.textContent = `Score imdb               :  ${filmData.imdb_score}`;
    imageInformation.appendChild(dataElement);
    dataElement = document.createElement('li');
    dataElement.textContent = `Réalisateur              :  ${filmData.directors}`;
    imageInformation.appendChild(dataElement);
    dataElement = document.createElement('li');
    dataElement.textContent = `Liste des acteurs        :  ${filmData.actors}`;
    imageInformation.appendChild(dataElement);
    dataElement = document.createElement('li');
    dataElement.textContent = `Description              :  ${filmData.description}`;
    imageInformation.appendChild(dataElement);
    dataElement = document.createElement('li');
    dataElement.textContent = `Durée                    :  ${filmData.duration} minutes`;
    imageInformation.appendChild(dataElement);
    dataElement = document.createElement('li');
    dataElement.textContent = `Pays d'origine           :  ${filmData.countries}`;
    imageInformation.appendChild(dataElement);
    dataElement = document.createElement('li');
    //dataElement.textContent = `Résultats du Box Office  : ${filmData.revenue} ${filmData.currency}`;
    if (filmData.worldwide_gross_income === null) {
        let boxOfficeRevenue = 'Non communiqué';
        dataElement.textContent = `Résultats du Box Office  : ${boxOfficeRevenue}`;
    } else {
        dataElement.textContent = `Résultats du Box Office  : ${filmData.worldwide_gross_income} US$`;
    }
    imageInformation.appendChild(dataElement);
    dataElement = document.createElement('li');
    dataElement.textContent = `Résumé du film           : ${filmData.long_description}`;
    imageInformation.appendChild(dataElement);
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

function  displayHideArrows(position, numberImage, categoryFilms) {
    //allow hide arrow at limit

    const leftArrow = document.getElementById(`leftarrow${categoryFilms}`)
    const rightArrow = document.getElementById(`rightarrow${categoryFilms}`)
    if (position == 0) {
        rightArrow.style.display = 'none';
    } else {
        rightArrow.style.display = 'block';
    };
    if (position == -numberImage+4) {
        leftArrow.style.display = 'none';
    } else {
        leftArrow.style.display = 'block';
    };
};

function modalClose() {
    
    const modal = document.getElementById("modalDiv"); //Select Div Modal
    const imageInModal = document.getElementById("modalImageDiv"); //Select image inside Modal

    while (imageInModal.firstChild) {
        imageInModal.removeChild(imageInModal.firstChild);
    };
    modal.style.display = "none"; // Hide modal window
};

function modalCreate(imageDiv, filmData) {
    /*Modal Event actions*/

    const modalImageDiv = document.getElementById("modalImageDiv"); //Select image inside Modal
    
    imageDiv.addEventListener("click", () => {
        //Modal windows data creation and open actions
        modalClose();
        const imageDiv = document.createElement('div');
        imageDiv.id = 'imageDiv';
        modalImageDiv.appendChild(imageDiv);
        const image = document.createElement('img');
        image.src = filmData.image_url;
        image.id = filmData.id;
        image.alt = `Titre du livre : ${filmData.title}`;
        image.onload = () => {
            image.style.backgroundImage = `url(${image.src})`;  
        };
        //set default image if image load in error
        image.onerror = () => {
            image.src = "images/buildings.jpg";
            image.alt = `Titre du livre : ${filmData.title}`;
        };
        if (!filmData.image_url) {
            image.setAttribute("src", "images/buildings.jpg");
        } else {
            image.setAttribute("src", filmData.image_url);
        };
        image.setAttribute("alt", imageDiv.alt);
        imageDiv.appendChild(image);
        const imageInfo = document.createElement('div');
        imageInfo.id = 'imageInfo';
        modalImageDiv.appendChild(imageInfo);
        let imageInformation = document.createElement('ul');
        imageInfo.appendChild(imageInformation);
        createInformationList(imageInformation, filmData);
        modalDiv.classList.add('modalDiv-trigger');
        modalDiv.style.display = "block"; // modal windows display On
        // Modal Events close actions on the whole modal Window
        /*modalDiv.addEventListener("click", () => {
                modalClose();
        });*/
        let closeButton = document.getElementById('close-modal')
        closeButton.addEventListener("click", () => {
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
        addArrows(categoryFilms);
    };
};

function createContainerDiv(categoryFilms, videoTitle) {
    // create div container that will host images of a category

    let divCarrousel = document.getElementById(`carrousel${categoryFilms}`);
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

function createImage(categoryFilms, filmData='', indexList) {
    //create a div to display image film, get data to exploit in modal view

    const modalDiv = document.getElementById("modalDiv"); //Select Div Modal
    const imageInModal = document.getElementById("modalImageDiv"); //Select image inside Modal 

    //At first, documents hierarchy structure creation
    if (document.getElementById(`carrousel${categoryFilms}`) == null) {
        createCarrouselDiv(categoryFilms);
    };
    if (document.getElementById(`container${categoryFilms}`) == null) {
        createContainerDiv(categoryFilms, filmData.title);
    };
    modalClose();

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
    modalCreate(imageNewDiv, filmData)
};

async function getData(url) {
    // request ur to get data information

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

//Main program part

let url = `${urlHref}${titlesPathEndPoint}?sort_by=-imdb_score`;

//hide earlier Modal construction
let hideModal = document.getElementById('modalDiv');
hideModal.style.display = "none";
let bestFilm = getData(url);
bestFilm.then((jsonData) => {
    let nextUrl = jsonData.next;
    let dataArray = jsonData.results;
    let detailedUrl = `${urlHref}${titlesPathEndPoint}${dataArray[0].id}`;
    let detailedBestFilm = getData(detailedUrl);
    detailedBestFilm.then((detailedData) => {
        createImage('numberOne', detailedData);
    });    
    
    for (index = 1; index < dataArray.length; index++) {
        detailedUrl = `${urlHref}${titlesPathEndPoint}${dataArray[index].id}`;
        detailedBestFilm = getData(detailedUrl);
        detailedBestFilm.then((detailedData) => {
            createImage('bestFilms', detailedData);
        });        
    };
    bestFilm = getData(nextUrl);
    bestFilm.then((jsonData) => {
        let dataArray = jsonData.results;
        for (index = 0; index < numberOfFilms-4; index++) {
            createImage('bestFilms', dataArray[index]);
        };
    displayHideArrows(0, numberOfFilms, 'bestFilms');
    });
});
let indexList = 0;
let index = 0;
for (indexList = 2; indexList < categoryList.length; indexList++) {
    let category = categoryList[indexList];
    let url = `${urlHref}${titlesPathEndPoint}?genre=${category}&sort_by=-imdb_score`;
    let dataFilm = getData(url);
    dataFilm.then((jsonData) => {
        let nextUrl = jsonData.next;
        let dataArray = jsonData.results;
        for (index = 0; index < dataArray.length; index++) {
            let detailedUrl = `${urlHref}${titlesPathEndPoint}${dataArray[index].id}`;
            let detailedFilm = getData(detailedUrl);
            detailedFilm.then((detailedData) => {
                createImage(category, detailedData);
            });        
        };
        let film = getData(nextUrl);
        film.then((jsonData) => {
            dataArray = jsonData.results;
            for (index = 0; index < numberOfFilms-5; index++) {
                let detailedUrl = `${urlHref}${titlesPathEndPoint}${dataArray[index].id}`;
                let detailedFilm = getData(detailedUrl);
                detailedFilm.then((detailedData) => {
                    createImage(category, detailedData);
                });
            
    displayHideArrows(0, numberOfFilms, category);
            };
        });
    });
};
