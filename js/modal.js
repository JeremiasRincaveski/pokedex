const modal = document.getElementById(`modal`);
const wrapper = modal.querySelector(`.wrapperModal`);

const ativaModal = id => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(data => data.json())
    .then(pokemon => {
      const {
        name : nome,
        id,
        types: tipos,
        sprites: {other: {"official-artwork": {front_default : src}}},
        species: {name: especie},
        height: altura,
        weight: peso,
        abilities,
      } = pokemon;
      const tipo = tipos[0].type.name;
      const habilidades = abilities.map(habilidade => habilidade.ability.name).join(`, `);

      wrapper.innerHTML =`
        <div class="modalPokemon">
          <h2 class="modalNome">${nome}</h2>
          <span class="modalId">#${id}</span>

          <ul class="modalLista">
          </ul>

          <img src="${src}" alt="${nome}">
        </div>
        
        <div class="modalAtributes">
          <table id="tabela">
            <tr>
              <th>Species</th>
              <td>${especie}</td>
            </tr>
            <tr>
              <th>Height</th>
              <td>${altura}</td>
            </tr>
            <tr>
              <th>Weight</th>
              <td>${peso}</td>
            </tr>
            <tr>
              <th>Abilities</th>
              <td>${habilidades}</td>
            </tr>
        </table>
        </div>
      `;

      const lista = modal.querySelector(`.modalLista`)
      tipos.forEach(tipoPokemon => {
        const li = document.createElement(`li`);
        li.textContent = tipoPokemon.type.name;
        li.className = tipo;

        lista.appendChild(li);
      })

      modal.className = `active`;
      wrapper.className = tipo;
    })
}