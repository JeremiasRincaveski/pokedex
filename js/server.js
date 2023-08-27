const ul = document.getElementById("pokemons");

const criaPokemon = pokemon => {
  const {name : nome, id, types: tipos, sprites: {back_default : img}} = pokemon
  const tipo = tipos[0].type.name
  console.log(tipo);
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

fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=0`)
  .then(data => data.json())
  .then(data => data.results)
  .then(data => {
    const promesas = []
    data.forEach(pokemon => {
      promesas.push(fetch(pokemon.url).then(data => data.json()))
    })

    Promise.all(promesas)
      .then(responses => {
        responses.forEach(criaPokemon)
      })
  })