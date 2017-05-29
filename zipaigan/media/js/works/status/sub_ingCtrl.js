/*
* 作品管理--作品列表--投稿中的作品
* */
mainModule.controller('sub_ingCtrl',function($scope,$rootScope,util,httpServices){

    (function initSetting(){

        $scope.UserId=util.getSession("UserId");

    })();

});