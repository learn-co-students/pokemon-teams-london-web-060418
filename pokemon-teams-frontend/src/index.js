const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', () => {
  //Retrieve all trainers
  //  - for each create a div (and add pokemon button)
  //  - then retrieve all pokemon
  //    - for each render pokemon and append to div (and release button)
  //  - append div to main
  fetchTrainers().then(r => r.forEach(renderTrainer))
})

function fetchTrainers() {
  return fetch(TRAINERS_URL)
    .then(r => r.json())
}

function renderTrainer(trainer) {
  const newCard = document.createElement('div')
  newCard.className = "card"
  newCard['data-id'] = trainer.id
  newCard.id = `trainer-${trainer.id}`

  newCard.innerHTML = `
    <p>${trainer.name}</p>
    <button data-trainer-id="${trainer.id}">Add Pokemon</button>
    <ul></ul>
  `
  newCard.querySelector('button').addEventListener('click', addPokemon)

  const pokeList = newCard.querySelector('ul')
  trainer.pokemons.forEach( poke => pokeList.append(makePokeEl(poke)) )

  document.querySelector('main').append(newCard)
}

function makePokeEl(pokemon) {
  const pokeEl = document.createElement('li')

  pokeEl.innerHTML = `
    ${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button>
  `
  pokeEl.querySelector('button').addEventListener('click', releasePokemon)

  return pokeEl
}

function addPokemon(e) {
  //POST TO POKEMON WITH TRAINER ID IN BODY
  let newPoke

  fetch(POKEMONS_URL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({trainer_id: `${e.target.dataset.trainerId}`})
  })
  .then(r => r.json())
  .then(r => {
    if (r.error) {
      alert(r.error)
    } else {
      document.querySelector(`#trainer-${r.trainer_id} ul`).append(makePokeEl(r))
    }
  })
}

function releasePokemon(e) {
  //DELETE TO POKEMON/ID
  fetch(POKEMONS_URL + `/${e.target.dataset.pokemonId}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json'
    },
  })

  e.target.parentNode.remove()
}
