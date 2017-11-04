var myLogin = angular.module('myLogin',[])

myLogin.controller('loginCtrl', ['$scope', '$http', function($scope,$http){
  $http.get('/login').success(function(response){
    alert("Prueba ruta login desde loginCtrl")
  })
}])
