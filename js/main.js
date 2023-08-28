const botao = document.getElementById(`botao`);
const pokemons = Array.from(document.getElementsByClassName(`pokemon`));

chamaPokemons();
botao.addEventListener(`click`, chamaPokemons);

window.addEventListener(`click`, (e) => {
  const modal = document.getElementById(`modal`)

  if (modal.className == `active`) {
    console.log(e.target);
    if(e.target == modal) modal.className = `` 
  }
})