urlHref = "http://127.0.0.1:8000"
genresPathEndPoint = "/api/v1/genres/"
titlesPathEndPoint = "/api/v1/titles/"
titlesSort = "-imdb_score"
//categoryList = ['Biography']
categoryList = ['Biography', 'Action', 'Sport']
numberOfFilms = 7
sortTitle = '-imdb_score'

async function telechargerEtAfficherImages(url) {

    urlHref = "http://127.0.0.1:8000"
    //genresPathEndPoint = "/api/v1/genres/"
    titlesPathEndPoint = "/api/v1/titles/"

    //const url = `${urlHref}${titlesPathEndPoint}`
    try {
        // Effectuer une requête HTTP pour récupérer les images en fonction du filtre
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('La requête a échoué avec un statut ' + response.status);
        }

        // Obtenir les données JSON de la réponse
        const donnees = await response.json();

        // Sélectionnez le conteneur d'images
        const conteneurImages = document.getElementById('images-container');
        let urlArray = []
        // Parcourez les données pour afficher les images
        for (index = 0; index < donnees.results.length; index++) {
            urlArray[index] = donnees.results[index].image_url
        }
        urlArray.forEach(function(imageUrl) {
            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            conteneurImages.appendChild(imgElement);
        });

    } catch (erreur) {
        console.error('Une erreur s\'est produite lors du téléchargement des images :', erreur);
    }
}

// Appelez la fonction pour afficher les images en fonction du filtre


for (index = 0; index < categoryList.length; index++) {
    const url = `${urlHref}${titlesPathEndPoint}?sort_by=-imdb_score&genre=${categoryList[index]}`
    const toto = telechargerEtAfficherImages(url);
    //dataCategory = getData(url, categoryList[index], numberOfFilms)
}