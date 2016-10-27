/**
 * Created by jaric on 27.10.2016.
 */

requirejs.config({
    paths: {
        angular: 'angular',
        'bootstrapUI': 'ui-bootstrap-tpls-0.12.0',
        jVKTestApp: 'jVKTestApp',
        jVKTestControllers: 'jVKTestControllers'
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
        }
    }
});

requirejs(
    ['angular', 'jVKTestApp', 'jVKTestControllers', 'bootstrapUI'],
    function(angular, jVKTestApp, jVKTestControllers, bootstrapUI) {
        console.log("vk test view bootstrap is starting", angular, jVKTestApp, jVKTestControllers, bootstrapUI);

        // init angular application (instead of ng-app directive in view)
        angular.element(document).ready(function() {
            angular.bootstrap(document, [jVKTestApp.name]);
        });
    }
);