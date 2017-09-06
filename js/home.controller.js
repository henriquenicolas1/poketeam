pokeApp.controller('homeController', [
    '$scope', 
    '$location', 
    '$http', 
    '$filter',
    '$log',
    'teamService',
    function ($scope, $location, $http, $filter, $log, teamService) {
        $scope.pokemons = [];
        $scope.search = "";
        $scope.counter = 0;
        $scope.selectPokemon = selectPokemon;
        $scope.goToTeam = goToTeam;


        // get pokemon name list from api
        $http.get('http://pokeapi.co/api/v1/pokedex/1/').then(
            function (response) {
                $scope.pokemons = response.data.pokemon
                    .map(buildPokemon);
                    //.filter(excludeMegaAndNewPokemons);
                $scope.pokemons.sort(sortPokemonsByName);

            }, function (err) {
                console.log("error na requisição dos pokemons");
            });

        function buildPokemon (pokemon) {
            var parts = pokemon.resource_uri.split('/');
            var id = parts[parts.length - 2];
            var newPokemon = {};

            newPokemon.isSelected = false;
            newPokemon.state = "";
            newPokemon.id = parseInt(id);
            newPokemon.name = pokemon.name ? pokemon.name : pokemon.resource_uri;
		
	        if (newPokemon.name === "basculin-red-striped"){
		      newPokemon.img = "https://img.pokemondb.net/sprites/x-y/normal/basculin-red.png";
	        }
	        else if (newPokemon.name === "basculin-blue-striped"){
		      newPokemon.img = "https://img.pokemondb.net/sprites/x-y/normal/basculin-blue.png";
	        }
	        else{
		      newPokemon.img = "https://img.pokemondb.net/sprites/x-y/normal/"+newPokemon.name+".png";
	        }

            return newPokemon;
        }

        //novos pokemons e megapokemons estão dando alguns problemas para obter os moves
        //function excludeMegaAndNewPokemons (pokemon) { 
        //    return pokemon.id < 650;
        //}

        function sortPokemonsByName (a, b) {
            if (a.name < b.name) return -1;
            if (a.name === b.name) return 0;
            return 1;
        }

        function selectPokemon (pokemon) {
            pokemon.isSelected = !pokemon.isSelected;
            if (pokemon.isSelected) {
                $scope.counter++;
                pokemon.state = "Selecionado";
            }
            else{
                $scope.counter--;
                pokemon.state = "  ";
            }
        }

        function goToTeam () {
            
            var selectedPokemons = $scope.pokemons.filter(function(pokemon){
                return pokemon.isSelected;
            });

            teamService.team = selectedPokemons;

            $location.path('/team');
        }

    }

]);
