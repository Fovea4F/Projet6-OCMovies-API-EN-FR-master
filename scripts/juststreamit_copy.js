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

function createInformationList(imageInformation, filmsData) {
    //prepare list information to display in Modal Windows
    imageInformation.id = 'imageInfo';
    let informationList = [];
    informationList.push(["Titre du film     : ", filmsData.title]);
    informationList.push(["Genre             : ", filmsData.genres]);
    informationList.push(["Année de sortie   : ", filmsData.year]);
    informationList.push(["Nombre de votes   : ", filmsData.votes]);
    informationList.push(["Score imdb        : ", filmsData.imdb_score]);
    informationList.push(["Réalisateur       : ", filmsData.directors]);
    informationList.push(["Liste des acteurs : ", filmsData.actors]);
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

function afficherImage(categoryFilms, filmsData=[]) {
    //every image to display 
    const imageModal = document.getElementById("image-modal"); //Select Div Modal
    const modalImage = document.getElementById("modal-image"); //Select image inside Modal
    const closeModal = document.getElementById("close-modal"); // Select Modal close access       

    console.log(`category: ${categoryFilms} filmsData : `,filmsData);
    if (document.getElementById(categoryFilms) == null) {
        let divGlobal = document.getElementById("leftsection");
        let divParent = document.createElement('div');
        divGlobal.appendChild(divParent);
        divParent.classList.add("categoryTitle")
        divParent.classList.add(categoryFilms);
        let title = document.createElement('h4');
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
    let imageNewDiv = document.createElement('div');
    //Div creation and image add
    imageNewDiv.classList.add('divImage');            
    let image = document.createElement('img');
    image.src = filmsData.image_url;
    image.id = filmsData.id;
    image.alt = `Titre du livre : ${filmsData.title}`;
    image.classList.add('image-modal-trigger')
    image.onerror = function() {
        image.src = "images/buildings.jpg";
        image.alt = `Titre du livre : ${filmsData.title}`;
    };
    /*Modal Event actions*/
    image.addEventListener("click", () => {
        //Modal windows data creation and open actions
        let imageInformation = document.createElement('ul');
        informationList = createInformationList(imageInformation, filmsData);
        const elementUl = imageModal.querySelectorAll('ul');
        //ul prune if exist
        if (elementUl != null) {
            for (index = 0; index < elementUl.length; index++) {
                imageModal.removeChild(ul);
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

async function getData1(url1) {
    try {
        let response = await fetch(url1, );
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
let bestFilms = getData1(url);
bestFilms.then((jsonData) => {
    //console.log(jsonData.results);
    let nextUrl = jsonData.next;
    let dataArray = jsonData.results;
    afficherImage('numberOne', dataArray[0]);
    for (index = 1; index < dataArray.length; index++) {
        afficherImage('bestFilms', dataArray[index]);
    }
    let bestFilms1 = getData1(nextUrl);
    bestFilms1.then((jsonData) => {
        //console.log(jsonData.results);
        let dataArray1 = jsonData.results;
        for (index = 0; index < numberOfFilms-4; index++) {
            afficherImage('bestFilms', dataArray1[index])
        }
    })
})

for (cat in categoryList) {
    let category = categoryList[cat];
    let url = `${urlHref}${titlesPathEndPoint}?genre=${category}&sort_by=-imdb_score`;
    let bestFilms = getData1(url);
    bestFilms.then((jsonData) => {
        let nextUrl1 = jsonData.next;
        let dataArray = jsonData.results;
        console.log('jsonData',  dataArray);
        for (index = 0; index < dataArray.length; index++) {
            afficherImage(category, dataArray[index]);
        }
        let bestFilms1 = getData1(nextUrl1);
        bestFilms1.then((jsonData) => {
            dataArray1 = jsonData.results;
            for (index = 0; index < numberOfFilms-5; index++) {
                afficherImage(category, dataArray1[index]);1
            }
        })
    })
}

