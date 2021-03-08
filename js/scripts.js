let pokemonRepository = (function () {
  let pokemonContainer = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  //adds pokemon name and type from apiUrl
  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon && "type") {
      pokemonContainer.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  function getAll() {
    return pokemonContainer;
  }

  // functions for loading spinner when fetching data

  let spinner = document.querySelector("#spinner");

  function showLoadingSpinner() {
    spinner.removeAttribute("hidden");
  }

  function hideLoadingSpinner() {
    spinner.setAttribute("hidden", "");
  }

  //creates button to display pokemon name
  function addListItem(pokemon) {
    let pokemonContainer = $("#pokemon-container");
    let pokemonList = $("<li />");
    let button = $("<button />");
    button.text(pokemon.name);
    button.attr("data-target", "#pokemonModal");
    button.attr("data-toggle", "modal");
    button.addClass("btn");
    button.addClass("btn-danger");
    button.addClass("col");
    pokemonList.addClass("col-12");
    pokemonList.addClass("col-md-4");
    pokemonList.addClass("list-group-item-light");
    pokemonList.addClass("list-group-item");
    pokemonList.append(button);
    pokemonContainer.append(pokemonList);
    button.on("click", function (event) {
      showDetails(pokemon);
      $(".modal-header").css("background-color", "rgb(0, 51, 204)");
    });
  }

  //JSON promise function to fetch pokemon apiUrl
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        data.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
          loadDetails(pokemon);
        });
      });
  }

  //function to load the details of pokemon with fetch
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.other.dream_world.front_default;
        item.name = details.name;
        item.height = details.height;
        item.weight = details.weight;
        item.types = [];
        details.types.forEach(function (pokemonTypes) {
          item.types.push(pokemonTypes.type.name);
        });
      });
  }

  //shows pokemon details
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      //shows details when clicked on
      showModal(pokemon);
    });
  }

  // function for declaring a space and type to types: string
  function typeLength(pokemon) {
    return pokemon.types.length > 1
      ? "Type: " + pokemon.types.join(", ")
      : "Type: " + pokemon.types;
  }

  //function showModal
  function showModal(pokemon) {
    const modalBody = $(".modal-body");
    const modalTitle = $(".modal-title");

    modalBody.empty();
    modalTitle.empty();

    //creating img in modal
    const imagePokemonFront = $('<img class="modal-img" style="width:50%">');
    imagePokemonFront.attr("src", pokemon.imageUrl);

    let pokemonName = $("<h1>" + pokemon.name + "</h1>");
    console.log(pokemon.name);
    let pokemonTypes = $("<p>" + typeLength(pokemon) + "</p>");
    let pokemonHeight = $("<p>" + "Height: " + pokemon.height + "m" + "</p>");
    let pokemonWeight = $("<p>" + "Weight: " + pokemon.weight + "kg" + "</p>");

    modalTitle.append(pokemonName);
    modalBody.append(imagePokemonFront);
    modalBody.append(pokemonTypes);
    modalBody.append(pokemonHeight);
    modalBody.append(pokemonWeight);
    $("pokemonModal").modal("show");
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
