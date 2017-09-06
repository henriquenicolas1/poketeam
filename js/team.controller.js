pokeApp.controller('teamController', [
    '$scope', 
    '$location', 
    '$http', 
    '$filter',
    '$log',
    'teamService',
    function ($scope, $location, $http, $filter, $log, teamService) {
        $scope.pokemons = teamService.team;
        $scope.selectMove = selectMove;

        for (var i in $scope.pokemons) {
            var id = $scope.pokemons[i].id;
            $http.get('http://pokeapi.co/api/v1/pokemon/' + id)
                .then(appendMoveToPokemon);
        }

        function appendMoveToPokemon (response) {
            for(var i in $scope.pokemons){
                if($scope.pokemons[i].id == response.data.pkdx_id){
                    $scope.pokemons[i].moves = response.data.moves;
                    $scope.pokemons[i].counter = 0;
                    break;
                }
            }
        }
        function selectMove (pokemon, move) {

            if(move.isSelected === undefined){
                move.isSelected = false;
            }
            
            move.isSelected = !move.isSelected;

            if (move.isSelected) {
                pokemon.counter++;
            }
            else{
                pokemon.counter--;
            }
        }
    }


]);
