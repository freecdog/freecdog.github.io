/**
 * Created by jaric on 27.10.2016.
 */

define(["angular"], function(angular){
    "use strict";

    console.log("angular is here:", angular);

    var jVKTestApp = angular.module('jVKTestApp', [
        "jVKTestControllers", "ui.bootstrap"
    ]).config([function(){
        // app configuration goes here
    }]);
    console.log("jVKTestApp", jVKTestApp);

    return jVKTestApp;
});
