/*
* 用户管理--用户详情
* */
mainModule.controller('uDetailCtrl',function($scope,$rootScope,util,httpServices,$state){

    (function initSetting(){

        if( util.getSession("u_Name") && util.getSession("u_account") && util.getSession("u_pTime") ){

            $scope.currentUser={
                "userName":util.getSession("u_Name"),
                "account":util.getSession("u_account"),
                "pTime":parseInt(util.getSession("u_pTime"))
            };

        }else{

            layer.alert("获取用户信息失败！");

        }

        //控制tab标签选中

        if(util.getSession("cur")){

            $scope.cur=util.getSession("cur");

        }else{

            $scope.cur="wks";


        }

        //监听$scope.current
        var watch = $scope.$watch('cur',function(newValue,oldValue, scope){

            util.setSession("cur",newValue);

        });

    })();

    //删除
    $scope.delete=function(user){
        console.log(user);
        util.myLayer($scope,0,'删除','确定删除该用户？',sureDelete);
    };
    function sureDelete(){
        console.log("删除");
    }
    //禁用
    $scope.disabled=function(user){
        console.log(user);
        util.myLayer($scope,0,'禁用','确定禁用该用户？',sureDisabled);
    };
    function sureDisabled(){
        console.log("禁用");
    }
});