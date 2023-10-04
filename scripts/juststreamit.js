/**********************************************************
 * script de gestion pour JustStreamIt
 **********************************************************/
urlHref = "http://127.0.0.1:8000";
genresPathEndPoint = "/api/v1/genres/";
titlesPathEndPoint = "/api/v1/titles/";
titlesSort = "-imdb_score";
categoryList = ['Biography', 'Sport', 'Adventure'];
numberOfFilms = 7;
sortTitle = '-imdb_score';

/*****************************************************************************/
/* Sélectionnez tous les éléments avec la classe "image-modal-trigger"       */
/*****************************************************************************/
/*const imageModalTriggers = document.querySelectorAll(".image-modal-trigger");*/
// Sélectionnez l'élément de la boîte modale

/*****************************************************************************/
const bouton = document.getElementById("mon-bouton");

// Fonctions de traitement de l'application et affichage

function displayDefaultImage() {
    //used to display default image when no image is found
    let image = document.getElementById('img');
    image.src = "images/buildings.jpg";
}

function createInformationList(imageInformation, filmData) {
    //prepare list information to display in Modal Windows
    imageInformation.id = 'imageInfo';
    let informationList = [];
    informationList.push(["Titre du film     : ", filmData.title]);
    informationList.push(["Genre             : ", filmData.genres]);
    informationList.push(["Année de sortie   : ", filmData.year]);
    informationList.push(["Nombre de votes   : ", filmData.votes]);
    informationList.push(["Score imdb        : ", filmData.imdb_score]);
    informationList.push(["Réalisateur       : ", filmData.directors]);
    informationList.push(["Liste des acteurs : ", filmData.actors]);
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

function afficherImage(categoryFilms, filmData=[]) {
    //create a div to display image film, get data to exploit in modal view

    const imageModal = document.getElementById("image-modal"); //Select Div Modal
    const modalImage = document.getElementById("modal-image"); //Select image inside Modal
    //const closeModal = document.getElementById("close-modal"); // Select Modal close access       

    //console.log(`category: ${categoryFilms} filmData : `,filmData);
    if (document.getElementById(categoryFilms) == null) {
        //let divGlobal = document.getElementById("leftsection");
        let divSection = document.getElementById('section')
        let divParent = document.createElement('div');
        divSection.appendChild(divParent);
        divParent.classList.add("categoryTitle")
        divParent.classList.add(categoryFilms);
        let title = document.createElement('h2');
        switch (categoryFilms) {
            case 'numberOne':
                title.textContent = 'Meilleur film !';
                break;
            case 'bestFilms':
                title.textContent = 'Films les mieux notés';
                break;
            default:
                title.textContent = `Catégorie : ${categoryFilms}`;
        }
        divParent.appendChild(title);
        let divCategory = document.createElement('div');
        divCategory.setAttribute("id", categoryFilms);
        divCategory.classList.add('containerimages');
        divParent.appendChild(divCategory);
    }    
    let divParent = document.getElementById(categoryFilms);
    //Div creation and image add
    let imageNewDiv = document.createElement('div');
    imageNewDiv.classList.add('divImage');            
    let image = document.createElement('img');
    image.src = filmData.image_url;
    image.id = filmData.id;
    image.alt = `Titre du livre : ${filmData.title}`;
    image.classList.add('image-modal-trigger')
    image.onerror = function() {
        image.src = "images/buildings.jpg";
        image.alt = `Titre du livre : ${filmData.title}`;
    };
    /*Modal Event actions*/
    image.addEventListener("click", () => {
        //Modal windows data creation and open actions
        let imageInformation = document.createElement('ul');
        informationList = createInformationList(imageInformation, filmData);
        const elementUl = imageModal.querySelectorAll('ul');
        //ul prune if exist
        if (elementUl != null) {
            for (index = 0; index < elementUl.length; index++) {
                imageModal.removeChild(elementUl);
            }
        }
        modalImage.setAttribute("src", image.src);
        modalImage.setAttribute("alt", image.alt);
        for (index = 0; index<informationList.length; index++) {
            dataElement = document.createElement('li');
            dataElement.textContent = informationList[index];
            imageInformation.appendChild(dataElement);
        };                  
        imageModal.appendChild(imageInformation);
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
            }
        });
    });
imageNewDiv.appendChild(image);
divParent.appendChild(imageNewDiv);
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
    }
}

let url = `${urlHref}${titlesPathEndPoint}?sort_by=-imdb_score`;
let bestFilms = getData(url);
bestFilms.then((jsonData) => {
    //console.log(jsonData.results);
    let nextUrl = jsonData.next;
    let dataArray = jsonData.results;
    afficherImage('numberOne', dataArray[0]);
    for (index = 1; index < dataArray.length; index++) {
        afficherImage('bestFilms', dataArray[index]);
    }
    let bestFilms = getData(nextUrl);
    bestFilms.then((jsonData) => {
        //console.log(jsonData.results);
        let dataArray = jsonData.results;
        for (index = 0; index < numberOfFilms-4; index++) {
            afficherImage('bestFilms', dataArray[index])
        }
    })
})

for (cat in categoryList) {
    let category = categoryList[cat];
    let url = `${urlHref}${titlesPathEndPoint}?genre=${category}&sort_by=-imdb_score`;
    let bestFilms = getData(url);
    //console.log('bestFilms : ',bestFilms)
    bestFilms.then((jsonData) => {
        let nextUrl = jsonData.next;
        let dataArray = jsonData.results;
        //console.log('jsonData',  dataArray);
        for (index = 0; index < dataArray.length; index++) {
            afficherImage(category, dataArray[index]);
        }
        let bestFilms = getData(nextUrl);
        bestFilms.then((jsonData) => {
            dataArray = jsonData.results;
            for (index = 0; index < numberOfFilms-5; index++) {
                afficherImage(category, dataArray[index]);1
            }
        })
    })
}

