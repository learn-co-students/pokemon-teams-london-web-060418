document.addEventListener('DOMContentLoaded', function(){

  const BASE_URL = "http://localhost:3000"
  const TRAINERS_URL = `${BASE_URL}/trainers`
  const POKEMONS_URL = `${BASE_URL}/pokemons`


  fetch(TRAINERS_URL).then(res => res.json()).then(json => renderTrainer(json));

  function renderTrainer(json) {
    const mainArea = document.querySelector('main');

    for (trainer of json) {
      let trainerDiv = document.createElement('div');
      trainerDiv.className = "card";

      let trainerName = document.createElement('p');
      trainerName.innerText = trainer.name;
      mainArea.append(trainerDiv);
      trainerDiv.append(trainerName);

      let buttonAdd = document.createElement('button')
      buttonAdd.innerText = "Add Pokemon"
      buttonAdd.id = trainer.id
      trainerDiv.append(buttonAdd);
      buttonAdd.addEventListener("click", addPokemon)

      let pokemonUl = document.createElement('ul');
      trainerDiv.append(pokemonUl);

      function addPokemon(e) {
        fetch(POKEMONS_URL, {
          method: "POST",
          headers:
          {'Content-Type': 'application/json'},
          body:
          JSON.stringify({ trainer_id: e.target.id })
        })
        .then(r => r.json())
        .then(pokemon => {
          let pokemonName = document.createElement('li');
          pokemonName.innerText = `${pokemon.nickname} (${pokemon.species}) `
          pokemonUl.append(pokemonName);

          let buttonRelease = document.createElement('button')
          buttonRelease.addEventListener('click', releasePokemon)

          buttonRelease.innerText = "Release"
          buttonRelease.className = "release"
          buttonRelease.id = pokemon.id
          pokemonName.append(buttonRelease);
        })
      }


      for (pokemon of trainer.pokemons) {
        let pokemonName = document.createElement('li');
        pokemonName.innerText = `${pokemon.nickname} (${pokemon.species}) `
        pokemonUl.append(pokemonName);

        let buttonRelease = document.createElement('button')
        buttonRelease.addEventListener('click', releasePokemon)

        buttonRelease.innerText = "Release"
        buttonRelease.className = "release"
        buttonRelease.id = pokemon.id
        pokemonName.append(buttonRelease);

        function releasePokemon(e) {
          pokemonName.remove()

          fetch(`${POKEMONS_URL}/${e.target.id}`, {
            method: 'DELETE'
          })
          //.then(response => response.json());
        }
      }
    }
  }
});
