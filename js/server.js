const ul = document.getElementById("pokemons");
let offset = 0;
let limit = 10;
const limitMaximo = 151

const criaPokemon = pokemon => {
  const {name : nome, id, types: tipos, sprites: {front_default : src}} = pokemon
  const tipo = tipos[0].type.name
  const li = document.createElement(`li`);
  li.className = `pokemon ${tipo}`
  li.innerHTML = `
    <div class="wrapper">
      <h2 class="pokemonNome">${nome}</h2>
      <span>#${id}</span>
    </div>

    <div class="wrapper">
      <ul class="pokemonAtributos">
      </ul>

      <img class="pokemonImg" src="${src}" alt="pokemon ${nome}">
    </div>
  `;

  const atributos = li.querySelector(`.pokemonAtributos`);

  tipos.forEach(tipo => {
    const li = document.createElement(`li`);
    li.innerText = tipo.type.name;
    li.className = tipo.type.name;
    atributos.appendChild(li);
  })

  li.addEventListener(`click`, () => {
    ativaModal(id)
  })
  ul.appendChild(li);
}

const chamaPokemons = () => {
  if (offset + limit > limitMaximo) {
    limit = limitMaximo - offset;
    document.getElementById(`botao`).remove()
  }
  fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
  .then(data => data.json())
  .then(data => data.results)
  .then(data => {
    const promessas = []

    data.forEach(pokemon => {
      promessas.push(fetch(pokemon.url).then(data => data.json()))
    })

    offset += limit;

    Promise.all(promessas)
      .then(responses => {
        responses.forEach(criaPokemon)
      })
    })
}