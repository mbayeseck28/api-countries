let allPays = []; // Variable globale pour stocker les données de tous les pays
// Sélectionnez l'élément avec la classe '.mode-sombre' pour ajouter l'écouteur d'événement

function afficherTousLesPays() {
  fetch('https://restcountries.com/v3.1/all')
    .then((response) => response.json())
    .then((data) => {
      allPays = data; // Stockez les données de tous les pays dans la variable globale
      afficherPays(data); // Appelez la fonction d'affichage des pays avec les données
    });
}
function afficherPays(data) {
  const carte = document.querySelector('#carte');
  carte.innerHTML = ''; // Effacez le contenu précédent

  data.forEach((pays) => {
    const contain = document.createElement('div');
    contain.classList.add('col-sm-6');
    contain.classList.add('col-md-4');
    contain.classList.add('col-lg-3');
    contain.classList.add('mb-3');
    contain.id = 'paysId';
    contain.innerHTML = `
            <div class="card changeBg shadow" >
              <button type="button" class="btn m-0 p-0 text-start" onclick="details(${pays.population})">
                <div class="drapeau">
                  <img src="${pays.flags.png}" alt="">
                </div>
                <div class="card-body py-4">
                    <span>
                        <h5><span class="fw-semibold">${pays.name.common}</span></h5>
                    </span>
                    <span>
                        <h6>Population: <span class="fw-light">${pays.population}</span></h6>
                    </span>
                    <span>
                        <h6>Région: <span class="fw-light">${pays.continents}</span></h6>
                    </span>
                    <span>
                        <h6>Capital: <span class="fw-light">${pays.capital}</span></h6>
                    </span>
                </div>
              </button>
              </div>
            `;
    carte.appendChild(contain);
  });
}

function paysParContinent() {
  const selectContinent = document.querySelector('#select-continent');
  const countrySearch = document.querySelector('#country-search');

  selectContinent.addEventListener('change', updateDisplayedCountries);
  countrySearch.addEventListener('input', updateDisplayedCountries);

  function updateDisplayedCountries() {
    const selectedContinent = selectContinent.value.toLowerCase();
    const searchTerm = countrySearch.value.trim().toLowerCase();

    const filteredCountries = allPays.filter((pays) => {
      return (
        (selectedContinent === 'all' ||
          pays.region.toLowerCase() === selectedContinent) &&
        pays.name.common.toLowerCase().includes(searchTerm)
      );
    });
    afficherPays(filteredCountries);
  }
}
afficherTousLesPays(); // Appelez la fonction pour afficher tous les pays
paysParContinent();

function details(cle) {
  const cleRecherche = 'population';
  const valeurRecherche = cle;
  const objetTrouve = allPays.find(
    (objet) => objet[cleRecherche] === valeurRecherche
  );
  if (objetTrouve) {
    const bouton = document.querySelector('.cherche');
    bouton.innerHTML = `
      <button type="button" class="btn btn-light my-4 shadow changeText changeBg px-4 border-0" onclick="retour()"><i class="fa-solid fa-arrow-left-long"></i> Back</button>
    `;
    const div = document.createElement('div');
    carte.innerHTML = '';
    div.innerHTML = `
    <div class="container">
    <div class="row">
      <div class="col-md-6 mb-3 mb-sm-0">
          <div class="card-body drapeauDet">
              <img src="${objetTrouve.flags.png}" alt="">
          </div>
      </div>
      <div class="col-md-6 d-flex align-content-center align-items-center">
          <div class="card-body py-2 ps-md-5">
            <h4 class="fw-semibold changeText">${objetTrouve.name.common}</h4>
            <div class="d-flex justify-content-between py-3 flex-wrap">
              <div class="pe-5">
                <h6 class="fw-bold">Native Name: <span class="fw-normal">${objetTrouve.name.common}</span></h6>
                <h6 class="fw-bold">Population: <span class="fw-normal">${objetTrouve.population}</span></h6>
                <h6 class="fw-bold">Région: <span class="fw-normal">${objetTrouve.region}</span></h6>
                <h6 class="fw-bold">Sub Région: <span class="fw-normal">${objetTrouve.subregion}</span></h6>
                <h6 class="fw-bold">Capital: <span class="fw-normal">${objetTrouve.capital}</span></h6>
              </div>
              <div class="">
                <h6 class="fw-bold">Top Level Domain: <span class="fw-normal">${objetTrouve.tld}</span></h6>
                <h6 class="fw-bold">Currencies: <span class="fw-normal">${objetTrouve.population}</span></h6>
                <h6 class="fw-bold">Langages: <span class="fw-normal">${objetTrouve.region}</span></h6>
              </div>
          </div>
          <div class="mt-4">
            <h6 class="fw-bold d-flex flex-wrap">Border Countries: 
              <span class="fw-normal px-2 py-1 shadow mx-1">${objetTrouve.borders[0]}</span>
              <span class="fw-normal px-2 py-1 shadow mx-1">${objetTrouve.borders[1]}</span>
              <span class="fw-normal px-2 py-1 shadow mx-1">${objetTrouve.borders[2]}</span>
            </h6>
          </div>
      </div>
    </div>
    </div>
    `;
    carte.appendChild(div);
  } else {
    console.log('Aucun objet trouvé avec la clé de valeur recherchée.');
  }
}
function retour() {
  window.location.href = 'index.html';
}

// _______________________________
// Changer le theme de la page
let toggleBtn = document.getElementById('toggle-btn');
let body = document.querySelector('#myBody');
let darkMode = localStorage.getItem('dark-mode');

const enableDarkMode = () => {
  toggleBtn.classList.replace('fa-sun', 'fa-moon');
  body.classList.add('dark');
  localStorage.setItem('dark-mode', 'enabled');
};

const disableDarkMode = () => {
  toggleBtn.classList.replace('fa-moon', 'fa-sun');
  body.classList.remove('dark');
  localStorage.setItem('dark-mode', 'disabled');
};

if (darkMode === 'enabled') {
  enableDarkMode();
}

toggleBtn.onclick = (e) => {
  darkMode = localStorage.getItem('dark-mode');
  if (darkMode === 'disabled') {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
};
// console.log(allPays);
