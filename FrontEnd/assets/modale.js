
/*
Idenitifcation token et modale de modification
*/

/* modale */
const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");

showButton.addEventListener("click", () => {
    dialog.showModal();
});

closeButton.addEventListener("click", () => {
    dialog.close();
});
/* fin modale */

function editMode() {
    //vérification de la validité du token
    if (sessionStorage.getItem("token")?.length == 143) {
        //modification de l'affichage
        console.log('tout va bien')
        document.querySelector(".login").style.display = "none"
        document.querySelector(".logout").style.display = "flex"
        document.querySelector(".filters").style.display = "none";
        document.querySelector(dialog).style.display = "flex";

    }
    else {
        console.log('lol nope')
    }
}

function disconnect() {
    if (document.querySelector(".logout").style.display = "flex") {
        let disconnectButton = document.querySelector(".logout");
        disconnectButton.addEventListener("click", () => {
            sessionStorage.removeItem("token");
            console.log("done")
            document.querySelector(".logout").style.display = "none"
            document.querySelector(".login").style.display = "flex"
            location.reload()
        })
    }
}
disconnect();
editMode();

