
//fonction de fetch des articles et d'affichage du portfolio
async function initGallery() {
    //fetch des travaux dans le backend
    const worksResponse = await fetch('http://localhost:5678/api/works');
    let works = await worksResponse.json();

    //création des filtres
    fetchFilter();

    //affichage des travaux
    createWorks(works);
}
//appel de la fonction dans le DOM
initGallery();

/*
//fonction de fetch dans le back
async function fetchWorks() {
    const worksResponse = await fetch('http://localhost:5678/api/works');
    let works = await worksResponse.json();
}*/

//fonction de fetch des catégories de filtres
async function fetchFilter() {
    //fetch les catégories dans le backend
    const catergoriesResponse = await fetch('http://localhost:5678/api/categories')
    let categories = await catergoriesResponse.json();

    //crée les boutons de filtre via la fonction createFilters
    createFilters(categories);
}

//fonction de création des boutons de filtres
function createFilters(categories) {
    //définie le container
    const divFilter = document.querySelector(".filters");

    //crée l'élément de bouton
    const buttonFilter = document.createElement("li");
    //donne les caractéristiques du bouton "TOUS"
    buttonFilter.innerText = "Tous";
    buttonFilter.className = "filterButton";
    //lie le bouton TOUS au DOM
    divFilter.appendChild(buttonFilter);

    //boucle de création des autres boutons
    for (let i = 0; i < categories.length; i++) {
        let categorie = categories[i];
        const buttonFilter = document.createElement("li");
        buttonFilter.innerText = categorie.name;
        buttonFilter.className = "filterButton";
        divFilter.appendChild(buttonFilter);
    }
    galleryFilter()
}

//fonction de définition du filtre
async function galleryFilter() {

    const clickFilterEvent = document.querySelector('.filters');
    clickFilterEvent.addEventListener("click", async (t) => {
        //console.log(t);
        let currentlyActive = t.target.innerText;
        console.log(currentlyActive);

        const worksResponse = await fetch('http://localhost:5678/api/works');
        let works = await worksResponse.json();


        //let works = fetchWorks();
        let newArray = Array.from(works);
        if (currentlyActive === "Tous") {
            piecesOrdonnees = newArray
        }
        else {
            piecesOrdonnees = newArray.filter((work) => work.category.name === currentlyActive)
        }

        // Effacement et recréation de la gallerie
        document.querySelector(".gallery").innerHTML = "";
        createWorks(piecesOrdonnees);

    });
}
////note : aller chercher les travaux par leur id


//fonction d'affichage des travaux
function createWorks(works) {
    for (let i = 0; i < works.length; i++) {
        let article = works[i];
        //verification des informations de chaque article pour les futurs filtres :
        //console.log("id and name : " + article.category.id + ' ' + article.category.name);

        //création des balises
        let newFigure = document.createElement("figure")
        let imageWork = document.createElement("img");
        let nameWork = document.createElement("figcaption");

        //attribution des caractéristiques de chaque article
        imageWork.src = article.imageUrl;
        nameWork.innerText = article.title;

        //rattachement des balises entre elles
        newFigure.appendChild(imageWork);
        newFigure.appendChild(nameWork);

        //rattachement des balises au DOM
        let divGallery = document.querySelector(".gallery");
        divGallery.appendChild(newFigure);
    }
}
