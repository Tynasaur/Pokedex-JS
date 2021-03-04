let pokemonRepository = (function () {
  let pokemonContainer = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  
  //adds pokemon name and type from apiUrl
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon && "type"
    ) {
      pokemonContainer.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }
  
  function getAll() {
    return pokemonContainer;
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
    pokemonList.addClass("col-md-4")
    pokemonList.addClass("list-group-item-light");
    pokemonList.addClass("list-group-item");
    pokemonList.append(button);
    pokemonContainer.append(pokemonList);
    button.on("click", function (event){
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
      item.weight = details.weight;
      // item.type = details.types;
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

    const modalBody = $(".modal-body");
    const modalTitle = $(".modal-title");
   
    modalBody.empty();
    modalTitle.empty();
  
    //creating img in modal
    const imagePokemonFront = $('<img class="modal-img" style="width:50%">');
    imagePokemonFront.attr("src", pokemon.imageUrl);

    let pokemonName = $("<h1>" + pokemon.name + "</h1>");
    console.log(pokemon.name);
    let pokemonHeight = $("<p>" + "height: " + pokemon.height + "</p>");
    let pokemonWeight = $("<p>" + "weight: " + pokemon.weight + "</p>");
    // let pokemonType = $("<p>" + "type: " + pokemon.type + "</p>");

    modalTitle.append(pokemonName);
    modalBody.append(imagePokemonFront);
    modalBody.append(pokemonHeight);
    modalBody.append(pokemonWeight);
    modalBody.append(pokemonType);
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
  


