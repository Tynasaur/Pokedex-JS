
let pokemonRepository = (function () {
let pokemonList = [];
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

//adds pokemon name and type from apiUrl
function add(pokemon) {
  if (
    typeof pokemon === "object" &&
    "name" in pokemon && "t"
  ) {
    pokemonList.push(pokemon);
  } else {
    console.log("pokemon is not correct");
  }
}

function getAll() {
  return pokemonList;
}

//creates button to display pokemon name
function addListItem(pokemon) {
  let pokemonList = document.querySelector(".pokemon-list");
  let listpokemon = document.createElement("li");
  let button = document.createElement("button");
  button.innerText = pokemon.name;
  // button.classList.add("button-class"); //for css
  listpokemon.appendChild(button);
  pokemonList.appendChild(listpokemon);
  button.addEventListener("click", function(event) {
    showDetails(pokemon);
  });
}

//JSON promise function to fetch pokemon apiUrl
function loadList() {
  return fetch(apiUrl).then(function (response) {
    return response.json();
  }).then(function (json) {
    // console.log(json)
    json.results.forEach(function (item) {
      let pokemon = {
        name: item.name,
        detailsUrl: item.url
      };
      add(pokemon);
      // console.log(pokemon);
      loadDetails(pokemon);
    });
  }).catch(function (e) {
    // console.error(e);
  })
}

//function to load the details of pokemon with fetch
function loadDetails(item) {
  let url = item.detailsUrl;
  // console.log(url);
  return fetch(url).then(function (response) {
    return response.json();
  }).then(function (details) {
    // console.log(details);

    // Now we add the details to the item
    item.imageUrl = details.sprites.front_default;
    item.name = details.name; //is console logging but not diaplaying
    // console.log(item.imageUrl);
    // console.log(details.sprites)
    item.height = details.height;
    item.type = details.type;
  }).catch(function (e) {
    console.error(e);
  });
}

//shows pokemon details
 function showDetails(pokemon) {
  loadDetails(pokemon).then(function () {
    //shows details when clicked on
    console.log(pokemon);
    showModal(pokemon);
  });
}

//function showModal
function showModal(pokemon) {
let modalBody = $(".modal-body");
let modalTitle = $(".modal-title");
let modalHeader = $(".modal-header");

let container = document.querySelector('#image-container');

//modalHeader.empty();
modalTitle.empty();
modalBody.empty();

//creating element for name in modal content

//creating img in modal
let imagePokemonFront = $('<img class="modal-img" style="width:50%">');
imagePokemonFront.attr("src", pokemon.imageUrl);
console.log(pokemon.imageUrlFront);

let pokemonName = $("<h1>" + pokemon.name + "</h1");
let pokemonHeight = $("<p>" + "height: " + pokemon.height + "</p>");
let pokemonWeight = $("<p>" + "weight: " + pokemon.weight + "</p>");
let pokemonType = $("<p>" + "type: " + pokemon.type + "</p>");


modalTitle.append(pokemonName);
modalBody.append(imagePokemonFront);
modalBody.append(pokemonHeight);
modalBody.append(pokemonWeight);
modalBody.append(pokemonType);
};

$('[data-toggle="modal"]').on('click', function(){
let targetSelector = $(this).attr('data-target');
$(targetSelector).modal('show'); // Bootstrap’s own function to make the modal appear
});



return {
  add: add,
  getAll: getAll,
  addListItem: addListItem,
  loadList: loadList,
  loadDetails: loadDetails,
  showDetails: showDetails,
  showModal: showModal
};



})();




pokemonRepository.loadList().then(function () {
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);

});
});
