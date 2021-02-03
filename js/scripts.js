let pokemonList = [
  {
    name: 'bulbasaur',
    height: .7,
    type: ['grass', 'poison'],
    evolutions: 2
  },
  {
    name: 'blastoise',
    height: 1.6,
    type: ['water'],
    evolutions: 2
  },
  {
    name: 'charmander',
    height: .6,
    type: ['fire'],
    evolutions: 2
  },
  {
    name: 'pikachu',
    height: .4,
    type: ['electric'],
    evolutions: 1
  }
];


//IIFE function
let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: 'bulbasaur',
      height: 2.04,
      type: ['grass', 'poison'],
    },
    {
      name: 'blastoise',
      height: 5.03,
      type: ['water'],
    },
    {
      name: 'charmander',
      height: 2,
      type: ['fire'],
    },
    {
      name: 'pikachu',
      height: 1.04,
      type: ['electric'],
    }
  ];

  function getAll() {
    return pokemonList
    };

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  return {
    getAll: getAll,
    add: add,
  };
})();

console.log(pokemonRepository.getAll());

//command to add more pokemon to pokemonRepository
pokemonRepository.add({ name: 'Raichu',height: 2.07, type: ['electric', 'ground']});
console.log(pokemonRepository.getAll());



//ForEach() to diaplay pokemon info in webpage
(function pokemonRepository() {
    pokemonList.forEach(function(pokemon) {
        let pokemonName = pokemon.name
        let pokemonHeight = pokemon.height
        // condition to add wow that's big if height is greater than 7
        if(pokemonHeight > 5) {
            document.write(pokemonName + ' (height : ' + pokemonHeight + ')' + ' - Wow, that\'s big!');
        } else {
            document.write(pokemonName + ' (height : ' + pokemonHeight + ')');
        }
            document.write('<br>', '<br>');
        });
})();



// printing pokemonList[i]’s other details
// for (let i = 0; i < pokemonList.length; i++){
//   document.write("<p>" + pokemonList[i].name + " height:" + pokemonList[i].height +"</p>");
// }

// forEach() funtion
// pokemonList.forEach(function(pokemon) {
//   document.write("<p>" + pokemon.name + " :" + pokemon.height + " units tall" + "</br>" + "</p>");
// });


// //alerts that a pokemon is taller than 1m
//     for (let i=0; i < pokemonList.length; i++){
//       if (pokemonList[i].height >1){
//         document.write("<p>" + pokemonList[i].name + " wow, thats big!" + "</p>");
//       }
//     }
