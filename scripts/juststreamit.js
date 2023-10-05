/**********************************************************
 * script de gestion pour JustStreamIt
 **********************************************************/
urlHref = "http://127.0.0.1:8000";
genresPathEndPoint = "/api/v1/genres/";
titlesPathEndPoint = "/api/v1/titles/";
titlesSort = "-imdb_score";
categoryList = ['numberOne', 'bestFilms', 'Biography', 'Sport', 'Adventure'];
numberOfFilms = 7;
sortTitle = '-imdb_score';

/*****************************************************************************/
/* Sélectionnez tous les éléments avec la classe "image-modal-trigger"       */
/*****************************************************************************/
// Sélectionnez l'élément de la boîte modale

/*****************************************************************************/

function createInformationList(imageInformation, filmData) {
    //prepare list information to display in Modal Windows
    imageInformation.id = 'imageInfo';
    let informationList = [];
    informationList.push([`Titre du film     :  ${filmData.title}`]);
    informationList.push([`Genre             :  ${filmData.genres}`]);
    informationList.push([`Année de sortie   :  ${filmData.year}`]);
    informationList.push([`Nombre de votes   :  ${filmData.votes}`]);
    informationList.push([`Score imdb        :  ${filmData.imdb_score}`]);
    informationList.push([`Réalisateur       :  ${filmData.directors}`]);
    informationList.push([`Liste des acteurs :  ${filmData.actors}`]);
    return informationList;
};

function modalClose(modalImage, imageModal) {
    modalImage.setAttribute("src", "");
    modalImage.setAttribute("alt", "");
    const elementUl = imageModal.querySelector('ul');
    if (elementUl != null) {
        imageModal.removeChild(elementUl);
    }
    imageModal.style.display = "none"; // Masquez la fenêtre modale
};

function addButtons(category) {
    //Add buttons for Carrousel

    if (category == 'numberOne') {
        return;
    }
        let divCarrousel = document.getElementById(`carrousel${category}`);
    //console.log('passage par ajout bouton');
    let rightButton = document.createElement('img');
    rightButton.src="images/icons8-chevron-droit-48.png";
    rightButton.alt="right button - Image de icon8.com";
    rightButton.classList.add("rightButton");
    rightButton.classList.add("button");
    rightButton.classList.add("overlay");
    rightButton.id=`rightButton${category}`;
    divCarrousel.appendChild(rightButton);
    let leftButton = document.createElement('img');
    leftButton.src="images/icons8-chevron-gauche-48.png";
    leftButton.alt="left button - Image de icon8.com";
    leftButton.classList.add(`leftButton`);
    leftButton.classList.add("button");
    leftButton.classList.add("overlay");
    leftButton.id=`leftButton${category}`;
    divCarrousel.appendChild(leftButton);
};

function createCarrouselDiv(categoryFilms) {

    if (document.getElementById(`carrousel${categoryFilms}`) == null) {
        //let divGlobal = document.getElementById("leftsection");
        let divSection = document.getElementById('section');
        let divCarrousel = document.createElement(`div`);
        divSection.appendChild(divCarrousel);
        divCarrousel.id = `carrousel${categoryFilms}`;
        divCarrousel.classList.add("categoryTitle");
        divCarrousel.classList.add(categoryFilms);
        divCarrousel.setAttribute('position', 0);
        divCarrousel.setAttribute('imageNumber', 7);
        divCarrousel.style.width=`${(182*4)}px`;        
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
                divCarrousel.setAttribute('order', 'unset');
        };
        divCarrousel.appendChild(title);
        addButtons(categoryFilms);
    };
};

function createContainerDiv(categoryFilms) {
    // create div container that will host images of a category 
    let divContainerImages = document.createElement('div');
    divContainerImages.id = `container${categoryFilms}`;
    divContainerImages.classList.add('containerimages');
    //adjust width of container window to width of total images
    divContainerImages.style.width=`${(182*7)}px`;
    let divCarrousel = document.getElementById(`carrousel${categoryFilms}`);
    divCarrousel.appendChild(divContainerImages);

    divCarrousel = document.getElementById(`carrousel${categoryFilms}`);
    let leftButton = document.getElementById(`leftButton${categoryFilms}`);
    let rightButton = document.getElementById(`rightButton${categoryFilms}`);
    let position = divCarrousel.getAttribute('position');
    let numberImage = divCarrousel.getAttribute('imageNumber');
    leftButton.addEventListener('click', function() {
        if (position > -numberImage+4) {
        position--;
        divContainerImages.style.transform=`translate(${position*182}px)`;
    };
    });
    rightButton.addEventListener('click', () => {
        if (position < 0) {
        position++;
        divContainerImages.style.transform=`translate(${position*182}px)`;
    };
    });

};

function displayImage(categoryFilms, filmData=[]) {
    //create a div to display image film, get data to exploit in modal view

    const imageModal = document.getElementById("image-modal"); //Select Div Modal
    const modalImage = document.getElementById("modal-image"); //Select image inside Modal   

    //console.log(`category: ${categoryFilms} filmData : `,filmData);
    if (document.getElementById(`carrousel${categoryFilms}`) == null) {
        createCarrouselDiv(categoryFilms);
    };
    if (document.getElementById(`container${categoryFilms}`) == null) {
        createContainerDiv(categoryFilms);
    };
    let divContainerImages = document.getElementById(`container${categoryFilms}`);
    //Div creation and image add
    let imageNewDiv = document.createElement('div');
    imageNewDiv.classList.add('divImage');
    backGroundImage = filmData.image_url;
    imageNewDiv.classList.add('imageToDisplay');
    /*imageNewDiv.textContent = backGroundImage;
    imageNewDiv.style.backgroundImage = imageNewDiv.textContent
    */
    let image = document.createElement('img');
    image.src = filmData.image_url;
    image.id = filmData.id;
    image.alt = `Titre du livre : ${filmData.title}`;
    image.classList.add('photo');
    //console.log('filmData :', filmData);
    image.onload = () => {
        imageNewDiv.style.backgroundImage = `url(${image.src})`;  
    };
    image.onerror = () => {
        image.src = "images/buildings.jpg";
        image.alt = `Titre du livre : ${filmData.title}`;
    };
    /*Modal Event actions*/
    imageNewDiv.addEventListener("click", () => {
        //Modal windows data creation and open actions
        let imageInformation = document.createElement('ul');
        informationList = createInformationList(imageInformation, filmData);
        const elementUl = imageModal.querySelectorAll('ul');
        //ul prune if exist
        if (elementUl != null) {
            for (index = 0; index < elementUl.length; index++) {
                imageModal.removeChild(elementUl);
            };
        };
        modalImage.setAttribute("src", image.src);
        modalImage.setAttribute("alt", image.alt);    
        for (index = 0; index<informationList.length; index++) {
            dataElement = document.createElement('li');
            dataElement.textContent = informationList[index];
            imageInformation.appendChild(dataElement);
        };                  
        imageModal.appendChild(imageInformation);
        imageModal.classList.add('image-modal-trigger');
        imageModal.style.display = "block"; // Affichez la boîte modale
        console.log("Triggers");
        // Modal Events close actions
        imageModal.addEventListener("click", () => {
            modalClose(modalImage, imageModal);
        })
        /*closeModal.addEventListener("click", () => {
            modalClose(modalImage, imageModal);
        });*/
        window.addEventListener("click", (event) => {
            if (event.target === imageModal) {
                modalClose(modalImage, imageModal);
            };
        });
    });
    divContainerImages.appendChild(imageNewDiv);
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
// utl points films, ordered by imdb_score ("the most viewed")
let bestFilm = getData(url);
bestFilm.then((jsonData) => {
    //console.log(jsonData.results);
    let nextUrl = jsonData.next;
    let dataArray = jsonData.results;
    displayImage('numberOne', dataArray[0]);
    for (index = 1; index < dataArray.length; index++) {
        displayImage('bestFilms', dataArray[index]);
    };
    let bestFilm = getData(nextUrl);
    bestFilm.then((jsonData) => {
        //console.log(jsonData.results);
        let dataArray = jsonData.results;
        for (index = 0; index < numberOfFilms-4; index++) {
            displayImage('bestFilms', dataArray[index]);
        };
    //addButtons('bestFilms');
    });
});

for (index = 2; index < categoryList.length; index++) {
    let category = categoryList[index];
    let url = `${urlHref}${titlesPathEndPoint}?genre=${category}&sort_by=-imdb_score`;
    let film = getData(url);
    //console.log('bestFilms : ',bestFilms)
    film.then((jsonData) => {
        let nextUrl = jsonData.next;
        let dataArray = jsonData.results;
        //console.log('jsonData',  dataArray);
        for (index = 0; index < dataArray.length; index++) {
            displayImage(category, dataArray[index]);
        }
        let film = getData(nextUrl);
        film.then((jsonData) => {
            dataArray = jsonData.results;
            for (index = 0; index < numberOfFilms-5; index++) {
                displayImage(category, dataArray[index]);
            };
        //addButtons(category);
        });
    });
};
