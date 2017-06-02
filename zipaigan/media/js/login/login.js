//登录模块
var loginModule = angular.module('manager.login', []);
loginModule.controller('loginCtrl',function($scope,$http){
    //登录表单获取焦点
    $scope.focusLoginInput = function(inputFocusFlag){
        if(inputFocusFlag == 'IDInputFocusFlag'){
            $scope.IDInputFocusFlag = true;
        }
        if(inputFocusFlag == 'pwdInputFocusFlag'){
            $scope.pwdInputFocusFlag = true;
        }
    }
    //登录表单失去焦点
    $scope.blurLoginInput = function(inputBlurFlag){
        if(inputBlurFlag == 'IDInputBlurFlag'){
            $scope.IDInputFocusFlag = false;
        }
        if(inputBlurFlag == 'pwdInputBlurFlag'){
            $scope.pwdInputFocusFlag = false;
        }
    }


});

