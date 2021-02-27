let pokemonRepository = (function () {
  let container = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  
  //adds pokemon name and type from apiUrl
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon && "type"
    ) {
      container.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }
  
  function getAll() {
    return container;
  }
  
  //creates button to display pokemon name
  function addListItem(pokemon) {

    let container = document.querySelector("#pokemon-list");
    let listPokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.dataset["target"] = "#pokemonModal";
    button.dataset["toggle"] = "modal";
    button.classList.add("btn", "btn-dark", "col");
    listPokemon.classList.add('col-12', 'col-md-4');
    listPokemon.classList.add("list-group-item-warning");
    listPokemon.classList.add("list-group-item");
    listPokemon.appendChild(button);
    container.appendChild(listPokemon);
    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });
  }
  
  //JSON promise function to fetch pokemon apiUrl
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (data) {
      data.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        // console.log(pokemon);
        loadDetails(pokemon);
      });
    })
  }
  
  //function to load the details of pokemon with fetch
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
  
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.name = details.name;
      item.height = details.height;
      item.type = details.types;
      item.weight = details.weight;
    })
  }
  
  //shows pokemon details
   function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      //shows details when clicked on
      showModal(pokemon);
    });
  }
  
  //function showModal
  function showModal(pokemon) {
    // const modal = $(#pokemonModal); //added
    const modalBody = $(".modal-body");
    const modalTitle = $(".modal-title");
    // ;  

    modalBody.empty();
    modalTitle.empty();
  
    //creating img in modal
    const imagePokemonFront = $('<img class="modal-img" style="width:50%">');
    imagePokemonFront.attr("src", pokemon.imageUrl);
    // console.log(pokemon.imageUrlFront);

    let pokemonName = $("<h1>" + pokemon.name + "</h1>");
    console.log(pokemon.name);
    let pokemonHeight = $("<p>" + "height: " + pokemon.height + "</p>");
    let pokemonWeight = $("<p>" + "weight: " + pokemon.weight + "</p>");
    let pokemonType = $("<p>" + "type: " + pokemon.type + "</p>");


    modalTitle.append(pokemonName);
    modalBody.append(imagePokemonFront);
    modalBody.append(pokemonHeight);
    modalBody.append(pokemonWeight);
    // modalBody.append(pokemonType);
    $("pokemonModal").modal("show");
  };


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
  


