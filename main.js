const listPoke = document.querySelector(".list-poke");
const searchInput = document.querySelector(".search");

const URL = "https://pokeapi.co/api/v2/pokemon?limit=300&offset=0";
const nomeURL = "https://pokeapi.co/api/v2/pokemon/";


function createElementCard(info) {
  //criando elemento
  let li = document.createElement("li");
  li.classList.add("poke");

  let contentImg = document.createElement("div");
//   contentImg.style.backgroundImage = "";
  contentImg.classList.add("contentimg");

  let contentName = document.createElement("div");

  let nomePoke = document.createElement("h3");
  nomePoke.classList.add("nome-poke");

  let attributes = document.createElement("div");
  attributes.classList.add("attributes");

  let tipo = document.createElement("h4");
  tipo.classList.add("tipo");

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

  //add img
  img.src = `${info.sprites.versions["generation-v"]["black-white"].animated.front_default}`;
  //add name
  nomePoke.innerHTML = `${info.name}`;
  //add type
  tipo.innerHTML =
    info.types.length > 1
      ? `${info.types[0].type.name} + ${info.types[1].type.name} `
      : `${info.types[0].type.name}`;
  //add attributes
  hp.innerHTML = `${info.stats[0].stat.name}: ${info.stats[0].base_stat}`;
  attack.innerHTML = `${info.stats[1].stat.name}: ${info.stats[1].base_stat}`;
  defense.innerHTML = `${info.stats[2].stat.name}: ${info.stats[2].base_stat}`;
  especialAttack.innerHTML = `${info.stats[3].stat.name}: ${info.stats[3].base_stat}`;
  especialDefense.innerHTML = `${info.stats[4].stat.name}: ${info.stats[4].base_stat}`;
  speed.innerHTML = `${info.stats[5].stat.name}: ${info.stats[5].base_stat}`;

  contentImg.appendChild(img);
  attributes.appendChild(tipo);
  attributes.appendChild(hp);
  attributes.appendChild(attack);
  attributes.appendChild(defense);
  attributes.appendChild(especialAttack);
  attributes.appendChild(especialDefense);
  attributes.appendChild(speed);

    //add habilidades
    info.abilities.map((item,index) => {
        const habilidade = document.createElement("span");
        habilidade.classList.add("attribute");
        habilidade.innerHTML = `Hability-${index+1}: ${item.ability.name}`;
        attributes.appendChild(habilidade);
    
      });

  contentName.appendChild(nomePoke);

  li.appendChild(contentImg);
  li.appendChild(contentName);
  li.appendChild(attributes);

  listPoke.appendChild(li);

}

fetch(URL)
  .then((response) => response.json())
  .then((data) =>
    data["results"].map((item) =>
      fetch(nomeURL + item.name)
        .then((response) => response.json())
        .then((data) => createElementCard(data))
        .then(() => document.querySelectorAll(".poke"))
        .then((listaNode) => {
          searchInput.addEventListener("input", filterCards);

          function filterCards() {
            if (searchInput.value !== "") {
              for (const card of listaNode) {
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
              for (const card of listaNode) {
                card.style.display = "block";
              }
            }
          }
        })
    )
  )
  .catch((error) => console.log(error));
