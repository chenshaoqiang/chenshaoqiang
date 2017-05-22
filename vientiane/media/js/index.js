/**
 * 主框架js
 */
var mainModule = angular.module('manager.main', ['ui.router', "common.service", "common.filter"]);

mainModule.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        // 主框架
        .state('manager', {
            url: '/main',
            templateUrl: 'index.html'
        })

    ;
});


angular.element(document).ready(function(){
    //异步载入模块
    angular.bootstrap(document, ['manager.main']);
});