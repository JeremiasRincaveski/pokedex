const ul = document.getElementById("pokemons");
let offset = 0;
let limit = 10;
const limitMaximo = 13

const criaPokemon = pokemon => {
  const {name : nome, id, types: tipos, sprites: {back_default : img}} = pokemon
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

      <img class="pokemonImg" src="${img}" alt="pokemon ${nome}">
    </div>
  `;

  const atributos = li.querySelector(`.pokemonAtributos`);

  tipos.forEach(tipos => {
    const li = document.createElement(`li`);
    li.innerText = tipos.type.name;
    li.className = tipos.type.name;
    atributos.appendChild(li);
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
    const promesas = []

    data.forEach(pokemon => {
      promesas.push(fetch(pokemon.url).then(data => data.json()))
    })

    offset += limit;

    Promise.all(promesas)
      .then(responses => {
        responses.forEach(criaPokemon)
      })
    })
}