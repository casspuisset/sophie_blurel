const response = await fetch('http://localhost:5678/api/get/works');
const works = await response.json()
console.log(works)

//let nouvelElement = document.createElement("div");
// Récupérer un élément parent existant
//let parentElement = document.getElementById("conteneur");

// Ajouter le nouvel élément au parent
//parentElement.appendChild(nouvelElement);