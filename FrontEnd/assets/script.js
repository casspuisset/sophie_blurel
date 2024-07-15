
//fonction de fetch des articles et d'affichage du portfolio
async function initGallery() {
    //fetch des travaux dans le backend
    const worksResponse = await fetch('http://localhost:5678/api/works');
    let works = await worksResponse.json();

    //initialisation du bouton de login de nav
    loginLink();

    //création des filtres
    fetchFilter();

    //affichage des travaux
    createWorks(works);
    if (sessionStorage.getItem("token")?.length !== 143) {
        document.querySelector(".edit_modale").style.display = "none";
        document.getElementById("edition_mode").style.display = "none";
    } else {
        document.querySelector(".edit_modale").style.display = "flex";
        document.querySelector(".filters").style.display = "none";
        document.getElementById("edition_mode").style.display = "flex";

    }
}
//initialisation de la page index
initGallery();

//initialisation du lien vers la page de log
function loginLink() {
    const loginLink = document.getElementById("login_link");

    if (sessionStorage.getItem("token")) {
        console.log("token bien enregistré")
        loginLink.innerText = "logout";
        loginLink.className = "logout";
        loginLink.setAttribute("href", "#")
        disconnect();
    } else {
        loginLink.innerText = "login";
        loginLink.className = "login";
        loginLink.setAttribute("href", "login.html")
    }
}

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
    const buttonFilter = document.createElement("button");
    //donne les caractéristiques du bouton "TOUS"
    buttonFilter.innerText = "Tous";
    buttonFilter.className = "filterButton";
    //lie le bouton TOUS au DOM
    divFilter.appendChild(buttonFilter);

    //boucle de création des autres boutons
    for (let i = 0; i < categories.length; i++) {
        let categorie = categories[i];
        const buttonFilter = document.createElement("button");
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




/*
*
Identification token et modale de modification
*
*/

/* modale */
const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");


showButton.addEventListener("click", () => {
    dialog.showModal();
    showModaleGallery();
});

closeButton.addEventListener("click", () => {
    dialog.close();
});

//fonction pour afficher les images dans la modale
async function showModaleGallery() {
    const worksResponse = await fetch('http://localhost:5678/api/works');
    let works = await worksResponse.json();

    for (let i = 0; i < works.length; i++) {
        let article = works[i];

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
        let divModaleGallery = document.querySelector(".modale_gallery");
        divModaleGallery.appendChild(newFigure);
    }}


/* fin modale */

//ca fonctionne pas la déconnexion en l'état...


function disconnect() {
    let disconnectButton = document.querySelector(".logout");
    disconnectButton.addEventListener("click", () => {
        sessionStorage.removeItem("token");
        console.log("done")
        location.reload()
    })
    }

disconnect();
