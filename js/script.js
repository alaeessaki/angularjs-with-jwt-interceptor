var app = angular.module("main", ["ngRoute", "services.authInterceptor"]).config(function ($routeProvider, $httpProvider) {
    $routeProvider.when(
            '/', {
                templateUrl: "../components/login.html",
                controller: "myCtrl"
            }
        ),
        $httpProvider.interceptors.push("authInterceptor");
})

app.controller("myCtrl", function ($scope, $http) {
    $scope.submit = function () {
        var user = {
            username: $scope.username,
            password: $scope.password
        }
        $http.post("http://localhost:8015/authenticate", user).then(
            function success(response) {
                window.localStorage.setItem("token","Bearer " + response.data.jwt);
                // $http.defaults.headers.common['Authorization'] = 'Bearer '+response.data.jwt;
            },
            function failed(error) {
                console.error(error);
            }
        )
    }

    $scope.getCat = function () {
        $http.get("http://localhost:8015/api/categories").then(
            function sucess(response) {
                console.log(response)
            },
            function failed(error) {
                console.error(error);
            }
        )
    }
    $scope.getAdmins = function () {
        $http.get("http://localhost:8015/api/admins").then(
            function sucess(response) {
                console.log(response)
            },
            function failed(error) {
                console.error(error);
            }
        )
    }
})


angular.module("services.authInterceptor", [])
    .factory('authInterceptor', [
        "$q", "$window", "$location",
        function ($q, $window, $location) {
            return {
                request: function (config) {
                    config.headers = config.headers || {};
                    if(window.localStorage.getItem("token")){
                        config.headers.Authorization = window.localStorage.getItem('token'); 
                        // add your token from your service or whatever
                    }
                    return config;
                },
                response: function (response) {
                    return response || $q.when(response);
                },
                responseError: function (rejection) {
                    console.log(error);
                }
            };
        }
    ]);





// app.run(function($http, $httpProvider){
//     $httpProvider.interceptors.push('authInterceptor');
// })