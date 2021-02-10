let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //adds pokemon name and type from apiUrl
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon
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
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    //eventListener to show pokemon details
    button.addEventListener("click", function(event) {
      showDetails(pokemon);
    });
  }

  //JSON fetch for pokemon name and url
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  //JSON fetch fo pokemon details
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      showModal(pokemon);
    });
  }

   function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
      showModal(pokemon);
    });
  }

// function showModal

  let modalContainer = document.querySelector('#modal-container');
  function showModal(pokemon) {
    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = pokemon.name;

    let imgElement = document.createElement('img')
    imgElement.src = pokemon.imageUrl

    let heightElement = document.createElement('p');
    heightElement.innerText = "Height: " + pokemon.height

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(imgElement);
    modal.appendChild(heightElement);
    modalContainer.appendChild(modal);


    modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });
  modalContainer.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });


  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    };
})();




pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);

  });
});





// let pokemonRepository = (function () {
//   let pokemonList = [];
//   let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
//
//   function add(pokemon) {
//     if (
//       typeof pokemon === "object" &&
//       "name" in pokemon
//     ) {
//       pokemonList.push(pokemon);
//     } else {
//       console.log("pokemon is not correct");
//     }
//   }
//   function getAll() {
//     return pokemonList;
//   }
//   function addListItem(pokemon) {
//     let pokemonList = document.querySelector(".pokemon-list");
//     let listpokemon = document.createElement("li");
//     let button = document.createElement("button");
//     button.innerText = pokemon.name;
//     button.classList.add("button-class");
//     listpokemon.appendChild(button);
//     pokemonList.appendChild(listpokemon);
//     button.addEventListener("click", function(event) {
//       showDetails(pokemon);
//     });
//   }
//
//   function loadList() {
//     return fetch(apiUrl).then(function (response) {
//       return response.json();
//     }).then(function (json) {
//       json.results.forEach(function (item) {
//         let pokemon = {
//           name: item.name,
//           detailsUrl: item.url
//         };
//         add(pokemon);
//         console.log(pokemon);
//       });
//     }).catch(function (e) {
//       console.error(e);
//     })
//   }
//
//   function loadDetails(item) {
//     let url = item.detailsUrl;
//     return fetch(url).then(function (response) {
//       return response.json();
//     }).then(function (details) {
//       // Now we add the details to the item
//       item.imageUrl = details.sprites.front_default;
//       item.height = details.height;
//       item.types = details.types;
//     }).catch(function (e) {
//       console.error(e);
//     });
//   }
//
//   function showDetails(item) {
//     pokemonRepository.loadDetails(item).then(function () {
//       console.log(item);
//     });
//   }
//
//   return {
//     add: add,
//     getAll: getAll,
//     addListItem: addListItem,
//     loadList: loadList,
//     loadDetails: loadDetails,
//     showDetails: showDetails
//   };
// })();
//
//
// pokemonRepository.loadList().then(function () {
//   pokemonRepository.getAll().forEach(function (pokemon) {
//     pokemonRepository.addListItem(pokemon);
//   });
// });
//
//
//
// })();
