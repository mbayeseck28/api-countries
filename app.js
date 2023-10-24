const carte = document.getElementById('carte');
// const allPays = [];
// ______________________________________________

function fetchPays(api) {
  fetch(api)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.forEach((pays) => {
        // allPays.push(pays);
        const contain = document.createElement('div');
        contain.classList.add('col-sm-6');
        contain.classList.add('col-md-4');
        contain.classList.add('col-lg-3');
        contain.classList.add('mb-3');
        contain.id = 'paysId';
        contain.innerHTML = `
            <div class="card changeBg shadow" >
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
            </div>
            `;
        carte.appendChild(contain);

        // Détails pays
        // let card = document.querySelector('.card');
        // card.addEventListener('click', (e) => {
        //   e.preventDefault();
        //   console.log();
        // });
      });
    })
    .catch((error) => {
      console.error(
        "Une erreur s'est produite lors de la récupération des données de l'API.",
        error
      );
    });
}
fetchPays('https://restcountries.com/v3.1/all');

// Recherche pays ou continent
let form = document.querySelector('form');
form.addEventListener('input', (e) => {
  let inputValue = e.target.value;
  carte.innerHTML = '';
  fetchPays(`https://restcountries.com/v3.1/region/${inputValue}`) ||
    fetchPays(`https://restcountries.com/v3.1/name/${inputValue}`);
});

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
