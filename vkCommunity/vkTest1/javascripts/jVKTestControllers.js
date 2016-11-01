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
            self.addressArr = addressArr;

            self.params = parseResponse(addressArr);
        }

        function parseResponse(addressArr){
            var lastParam = addressArr[addressArr.length-1];
            var arr = lastParam.split("&");
            var paramList = ["api_id", "api_settings", "viewer_id", "viewer_type", "sid", "secret", "access_token",
                "user_id", "group_id", "is_app_user", "auth_key", "language", "parent_language", "ad_info",
                "is_secure", "ads_app_id", "api_result", "referrer", "lc_name", "sign", "hash"];
            var params = {};
            for (var i = 0; i < arr.length; i++){
                for (var j = 0; j < paramList.length; j++){
                    if (arr[i].indexOf(paramList[j]) == 0){
                        var paramValue = arr[i].substr( arr[i].indexOf("=")+1 );
                        params[ paramList[j] ] = paramValue;
                        break;
                    }
                }
            }
            return params;
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
            console.log('self.addressArr', self.addressArr);
            console.log('self.params', self.params);

            var r = VK.api("audio.get", {
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