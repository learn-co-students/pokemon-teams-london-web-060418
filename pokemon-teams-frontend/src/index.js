const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded',init)

function init(){
  getTrainers()
  detectReleaseClick()
}//end of init

function getTrainers() {
  fetch(TRAINERS_URL)
  .then(res => res.json())
  .then(json => TrainerCardRender(json))
}

function createTrainerContainer (item) {
  trainerDiv = document.createElement('div')
  trainerDiv.id = item.id
  trainerDiv.className = "card"
  trainerDiv.innerHTML = `<p> ${item.name}  </p>`
  return trainerDiv
}

function createAddButton(trainer_id) {
  submitButton = document.createElement('button')
  submitButton.innerText = 'Add Pokemon!!!!!'
  submitButton.addEventListener('click', () => {
    createPokemon(trainer_id)
    window.location.reload()
  })
  return submitButton
}


function createPokemon(trainer_id) {
  console.log(trainer_id)
  fetch(POKEMONS_URL, {
    method:"post",
    body: JSON.stringify({
        trainer_id: trainer_id
      }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

function createPokemonsList(trainer) {
  ulElement = document.createElement('ul')

  for (let i = 0; i < trainer.pokemons.length; i++) {
    iThPokemon = trainer.pokemons[i]
    catchPokemon(iThPokemon)
    ulElement.append(pokemonInfo,buttonX)
  }
  return ulElement
}

function catchPokemon(iThPokemon){
  pokemonInfo = document.createElement('li')
  pokemonInfo.innerHTML = `${iThPokemon.nickname} (${iThPokemon.species})`
  buttonX = document.createElement('button')
  buttonX.id = iThPokemon.id
  buttonX.className = "release"
  buttonX.innerText = "Release"
}

function detectReleaseClick (){
  let main = document.querySelector('main')
  main.addEventListener('click', function(e){
    if(e.target.innerText === 'Release') {
      let pokemonId = e.target.id
      deletePokemon(pokemonId)
      window.location.reload()
    }
  })
}

function deletePokemon(id){
    console.log(POKEMONS_URL + `/${id}`)
    fetch(POKEMONS_URL + `/${id}`, {
      method:"delete",
    })
    .then(res => res.json())
    .then(res => {return res})
    .catch(err => console.error(err))
}

function TrainerCardRender(data){
  for (let i = 0; i < data.length; i++) {
    trainerDiv = createTrainerContainer(data[i])
    trainerDiv.append(createAddButton(data[i].id),createPokemonsList(data[i]))
    main = document.querySelector('main')
    main.appendChild(trainerDiv)
    console.log("rendered cards")
  }//end of trainerCardRender
}
