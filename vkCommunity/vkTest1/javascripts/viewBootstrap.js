/**
 * Created by jaric on 27.10.2016.
 */

requirejs.config({
    paths: {
        angular: 'angular',
        'bootstrapUI': 'ui-bootstrap-tpls-0.12.0',
        jVKTestApp: 'jVKTestApp',
        jVKTestControllers: 'jVKTestControllers',
        VK: 'https://vk.com/js/api/xd_connection.js?2'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'bootstrapUI': {
            deps:['angular']
        },
        'jVKTestApp': {
            deps:['angular']
        },
        'jVKTestControllers': {
            deps: ['jVKTestApp']
        },
        'VK': {
            exports: 'VK'
        }
    }
});

requirejs(
    ['angular', 'jVKTestApp', 'jVKTestControllers', 'bootstrapUI', 'VK'],
    function(angular, jVKTestApp, jVKTestControllers, bootstrapUI, VK) {
        console.log("vk test view bootstrap is starting", angular, jVKTestApp, jVKTestControllers, bootstrapUI, VK);

        // init angular application (instead of ng-app directive in view)
        angular.element(document).ready(function() {
            angular.bootstrap(document, [jVKTestApp.name]);
        });
    }
);