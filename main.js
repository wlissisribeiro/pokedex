// window.alert("ola")
const listPoke = document.querySelector(".list-poke");
const searchInput = document.querySelector(".search");
// console.log(arrayCards)

const URL = "https://pokeapi.co/api/v2/pokemon?limit=4&offset=0";
const nomeURL = "https://pokeapi.co/api/v2/pokemon/";

//cria os elementos da dom
function createElementCard(info) {
  //criando elemento
  let li = document.createElement("li");
  li.classList.add("poke");

  let contentImg = document.createElement("div");
  contentImg.classList.add("content-img");

  let contentName = document.createElement("div");

  let nomePoke = document.createElement("h3");
  nomePoke.classList.add("nome-poke");

  let attributes = document.createElement("div");
  attributes.classList.add("attributes");

  let hp = document.createElement("span");
  let attack = document.createElement("span");
  let defense = document.createElement("span");
  let especialAttack = document.createElement("span");
  let especialDefense = document.createElement("span");
  let speed = document.createElement("span");
  hp.classList.add("attribute");
  attack.classList.add("attribute");
  defense.classList.add("attribute");
  especialAttack.classList.add("attribute");
  especialDefense.classList.add("attribute");
  speed.classList.add("attribute");

  let img = document.createElement("img");
  img.classList.add("img");

  //informacoes
  img.src = `${info.sprites.versions["generation-v"]["black-white"].animated.front_default}`;
  nomePoke.innerHTML = `${info.name}`;

  hp.innerHTML = `${info.stats[0].stat.name}: ${info.stats[0].base_stat}`;
  attack.innerHTML = `${info.stats[1].stat.name}: ${info.stats[1].base_stat}`;
  defense.innerHTML = `${info.stats[2].stat.name}: ${info.stats[2].base_stat}`;
  especialAttack.innerHTML = `${info.stats[3].stat.name}: ${info.stats[3].base_stat}`;
  especialDefense.innerHTML = `${info.stats[4].stat.name}: ${info.stats[4].base_stat}`;
  speed.innerHTML = `${info.stats[5].stat.name}: ${info.stats[5].base_stat}`;

  // console.log(info)

  contentImg.appendChild(img);

  attributes.appendChild(hp);
  attributes.appendChild(attack);
  attributes.appendChild(defense);
  attributes.appendChild(especialAttack);
  attributes.appendChild(especialDefense);
  attributes.appendChild(speed);

  contentName.appendChild(nomePoke);

  li.appendChild(contentImg);
  li.appendChild(contentName);
  li.appendChild(attributes);

  listPoke.appendChild(li);

  return li;
}

//array para guardar os dados da requisição
let arrayDePokemons = [];

//salva dados no local storage
function saveLocalStorage(array) {
  localStorage.setItem("dados", JSON.stringify(array));
}

///buscando dados da api e jogando na funcao create
fetch(URL)
  .then((response) => response.json())
  .then((data) =>
    data["results"].map((item) =>
      fetch(nomeURL + item.name)
        .then((response) => response.json())
        .then((data) => arrayDePokemons.push(data))
        .then(() =>
          localStorage.setItem("dados", JSON.stringify(arrayDePokemons))
        )
    )
  )
  .then(() => {
    let arrayPokemonsSaved = JSON.parse(localStorage.getItem("dados"));
    arrayPokemonsSaved.map((item) => createElementCard(item));
  })
  .then(() => {
    const arrayCards = document.querySelectorAll(".poke");

    searchInput.addEventListener("input", filterCards);

    function filterCards() {
      if (searchInput.value !== "") {
        for (const card of arrayCards) {
          let nomepokemon = card
            .querySelector(".nome-poke")
            .textContent.toLocaleLowerCase();

          let valueInput = searchInput.value.toLocaleLowerCase();

          if (!nomepokemon.includes(valueInput)) {
            card.style.display = "none";
          } else {
            card.style.display = "block";
          }
        }
      } else {
        for (const card of arrayCards) {
          card.style.display = "block";
        }
      }
    }
  });

//funcao que filtra cards

// console.log(createElementCard(infoPoke))
