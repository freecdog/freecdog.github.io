/**
 * Created by jaric on 10.08.2015.
 */

(function(document, angular){
    "use strict";

    console.log("angular is here:", angular);

    var jTableApp = angular.module('jTableApp', [
        'jTableControllers'
    ]);
    console.log("jTableApp", jTableApp);

    var jTableControllers = angular.module('jTableControllers', []);

    jTableControllers.controller('TableController', ['$scope', function($scope){

        var flights = [];

        init();

        function init(){
            console.log("MainController initializing");

            getArrivals();
            getDepartures();

            $scope.flights = flights;
            console.log($scope.flights);

            resizeTable();

            document.body.addEventListener("resize", resizeTable);
        }

        function resizeTable(){
            var tableElement = document.getElementById('flightTable');
            var tableHead = tableElement.children[0];
            var tableBody = tableElement.children[1];
            console.log(tableElement.children, tableHead.offsetHeight, tableBody.offsetHeight, tableBody.style);
            var screenSize = getScreenSize();
            tableBody.style.height = (screenSize.height - tableHead.offsetHeight - 0).toString() + "px";
        }
        function getScreenSize(){
            var winW = 555, winH = 333;
            if (document.body && document.body.offsetWidth) {
                winW = document.body.offsetWidth;
                winH = document.body.offsetHeight;
            }
            if (document.compatMode=='CSS1Compat' && document.documentElement && document.documentElement.offsetWidth ) {
                winW = document.documentElement.offsetWidth;
                winH = document.documentElement.offsetHeight;
            }
            if (window.innerWidth && window.innerHeight) {
                winW = window.innerWidth;
                winH = window.innerHeight;
            }
            return {width: winW, height: winH};
        };

        function getArrivals(){
            for (var i = 0; i < arrivals.data.length; i++){
                var element = arrivals.data[i];
                element.src = "glyphicon glyphicon-arrow-down";
                element.src = "a";
                flights.push(element);
            }
        }
        function getDepartures(){
            for (var i = 0; i < departures.data.length; i++){
                var element = departures.data[i];
                element.src = "glyphicon glyphicon-arrow-up";
                element.src = "d";
                flights.push(element);
            }
        }

    }]);

})(document, angular);