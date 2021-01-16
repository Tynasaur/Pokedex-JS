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
for (let i = 0; i < pokemonList.length; i++){
  document.write("<p>" + pokemonList[i].name + " height:" + pokemonList[i].height + "</p>");
  // printing pokemonList[i]’s other details
  // ...
}
//Displays pokemon name and height is not working
  // for (let i = 0; i < pokemon.length; i++) {
  //   document.write(pokemon[i].name + ' height:' + pokemon[i].height)


    //is working, Displays pokemon name and height
    // for(let pokemon of pokemonList){
    //   document.write(pokemon.name + ' height:' + pokemon.height + ' ')
    // }

//alerts that a pokemon is taller than 1m
    for (let i=0; i < pokemonList.length; i++){
      if (pokemonList[i].height >1){
        document.write("<p>" + pokemonList[i].name + " wow, thats big!" + "</p>");
      }
    }
