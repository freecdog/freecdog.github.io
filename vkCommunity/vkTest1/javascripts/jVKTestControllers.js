/**
 * Created by jaric on 27.10.2016.
 */

(function (angular, window){

    "use strict";

    console.log("jVKTestControllers", angular);

    var jVKTestControllers = angular.module('jVKTestControllers', []);

    function noop(){}

    jVKTestControllers.controller('jVKRequestController', ['$rootScope','$scope', '$http', 'jVKRequest', function($rootScope, $scope, $http, jVKRequest) {
        var self = this;

        init();

        function init(){
            console.log('jVKRequestController is here');

            self.visible = true;

            self.searchString = "searchString is here";

            self.data = jVKRequest.data;

            self.url = jVKRequest.url;

            self.VK = VK !== undefined;

        }

        function loadDataFile(fileObject){
            //console.warn(fileObject);

            self.visible = false;
            $rootScope.$broadcast('loadingChanged', {visible: true});

            // TODO loading bar (0... in progress... 100%)
            $http({
                method: 'GET',
                url: '/memout' + fileObject.path
            }).then(function successCallback(response) {
                console.warn("response", response);
                angular.extend(data, response.data);

                console.warn("Datatone", data);

                $rootScope.$broadcast('dataHaveBeenLoaded');
                $rootScope.$broadcast('loadingChanged', {visible: false});

            }, function errorCallback(response) {
                self.visible = true;
                $rootScope.$broadcast('loadingChanged', {visible: false});

                console.error(response);
            });


        }
        self.loadDataFile = loadDataFile;

    }]);

    jVKTestControllers.factory('jVKRequest', ['$http', function ($http) {

        var self = this;
        var data = [];

        init();

        function init(){
            console.log("jVKRequest is here");

            //getDataFiles();
            tryVK();
            initVK();
        }

        function tryVK(){
            var url = window.location.href;
            self.url = url;
            var addressArr = url.split("/");

        }

        function initVK(){
            VK.init(function(a,b,c){
                console.log('initialised', a, b, c);

                VK.callMethod("showGroupSettingsBox", 0+2+8);
                VK.addCallback('onGroupSettingsChanged', onGroupSettingsChanged);

                VK.addCallback('onLocationChanged', onLocationChanged);
            }, function(a, b, c){
                console.log('initialisation has failed', a, b, c);

            }, '5.59');
        }

        function onGroupSettingsChanged(a,b,c){
            console.log('onGroupSettingsChanged', a, b, c);

            var r = VK.Api("audio.get", {
                need_user: 1
            }, function(a,b,c){
                console.log("audio.get", a, b, c);
            });
            console.log(r);
        }

        function onLocationChanged(a,b,c){
            console.log('onLocationChanged', a, b, c);
        }


        function getDataFiles(){
            $http({
                method: 'GET',
                url: 'https://api.vk.com/method/users.get?user_id=210700286&v=5.52'
            }).then(function successCallback(response) {
                console.log("jVKRequest", response.data);
                angular.extend(data, response.data);
            }, function errorCallback(response) {
                console.error(response);
            });
        }

        this.data = data;

        return this;
    }]);

})(angular, window);