var app = angular.module('app', ['ui.router']);
var URLInit={
    "interfaceinfo":"/onecloud-openapi-platform/interface/interfaceinfo"
};
app.config(function($stateProvider,$locationProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/basicConfig');
    $stateProvider
        .state('basicConfig', {
            url:'/basic',
            templateUrl: 'basic.html'
        })
        .state('developerTools', {
            url:'/dev',
            templateUrl: 'dev.html'
        })
        .state('documentCenter', {
            url:'/doc',
            templateUrl: 'document.html',
            controller: 'docCtrl as app'
        })
        .state('interfaceAuth', {
            url:'/auth',
            templateUrl: 'interface.html',
            controller: 'intCtrl as app'
        })

});
app.controller('appCtrl',function($scope,$state,$http,$rootScope){
    $state.go('basicConfig');
    $scope.menuStatus=true;
    $scope.hideMenu=false;
    $scope.userLoginForm={};
    $scope.userInfo={};
    $scope.userInfo.name="userName";
    $scope.userLogin=function(){
        var userName=$scope.userLoginForm.userName="userName",userPsw=$scope.userLoginForm.userPsw="123";
        if(userName!==undefined&&userPsw!=undefined){
            $scope.userInfoResponse={
                "flag":"000000",
                "data":{"name":"userName"}
            };
           if($scope.userInfoResponse.flag=="000000"){
               $scope.userInfo=$scope.userInfoResponse.data;
           }
        }
    };
    $scope.changeDocLists=function(name){
        if(name=='doc'){
            $scope.hideMenu=true;
            $scope.menuStatus=!($scope.menuStatus);
            $state.go('documentCenter');
            $rootScope.clickDoc=false;
        }else{
            $scope.menuStatus=true;
        }
    };
    $scope.returnMainMenu=function(){
        $scope.hideMenu=false;
        $scope.menuStatus=true;
    };
    //模拟文档中心列表数据
    $scope.docMenu=[
        {"name":"接收产品注册信息接口"},
        {"name":"获取增量用户接口（云到端）"},
        {"name":"增量用户同步状态变更接口（云到端）"},
        {"name":"联网用户产品激活短信服务（云到端）"},
        {"name":"联网用户产品激活短信服务（端到云）"},
        {"name":"联网激活短信校验服务"},
        {"name":"离线用户短信激活服务"},
        {"name":"离线用户短信激活服务（上行-易捷通）"},
        {"name":"离线用户短信激活服务（上行-梦网科技）"}

    ];
    $rootScope.clickDoc=false;
    $scope.clickDocLists=function(name){
        $state.go('documentCenter');
        $rootScope.clickDoc=true;
        $rootScope.docName=name;
    };
});
app.controller('docCtrl',function($scope,$state,$http,$rootScope){

});
app.controller('intCtrl',function($scope,$state,$http,$rootScope){
    //初始化状态
    $scope.interfaceLoading=true;
    $scope.interfaceNull=false;
    $scope.interfaceResError=false;
    //获取接口权限列表数据
    function getInterfaceAuth(){
        var data={
            "clientId":"op748406649937805312"
        };
        $http({
            method: 'POST',
            url: URLInit.interfaceinfo,
            data: $.param(data),
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).success(function(response) {
            $scope.interfaceLoading=false;
            if (response.flag==="000000") {
                if(response.data&&response.data.length>0){
                    $scope.interfaceNull=false;
                    var arr=response.data, map = {}, dest = [];
                    for(var i = 0; i < arr.length; i++){
                        var ai = arr[i];
                        if(!map[ai.typeName]){
                            dest.push({
                                basName: ai.typeName,
                                intLists: [ai]
                            });
                            map[ai.typeName] = ai;
                        }else{
                            for(var j = 0; j < dest.length; j++){
                                var dj = dest[j];
                                if(dj.basName == ai.typeName){
                                    dj.intLists.push(ai);
                                    break;
                                }
                            }
                        }
                    }
                    $scope.interfaceMenu=dest;
                }else{
                    $scope.interfaceNull=true;
                }
            }else{
                $scope.interfaceResError=true;
                $scope.interfaceErrorMsg=response.desc;
            }
        }).error(function(response) {
            console.log(response);
        });
    }
    getInterfaceAuth();
});
angular.element(document).ready(function(){
    angular.bootstrap(document, ['app']);
    $(document).scroll(function() {
        //滚动条控制左侧菜单浮动
        if($(document).scrollTop()>50){
            $("#left_menu").attr("class","left_menu left_menu_fix");
        }else{
            $("#left_menu").attr("class","left_menu left_menu_re");
        }
    });
    $("#left_menu").find(".padding_p").on("click",function(event){
        //点击设置左侧菜单选中样式
        $("#documentCenter").find("li").removeClass("docListBack");
        $("#left_menu").find(".padding_p").removeClass("act_p");
        $(this).addClass("act_p");
    });
    $("#documentCenter").find("li").on("click",function(event){
        //文档中心二级菜单点击样式
        $("#left_menu").find(".padding_p").removeClass("act_p");
        $("#docCenter_p").attr("class","no-margin padding_p hover_p act_p");
        $(this).siblings().removeClass("docListBack");
        $(this).addClass("docListBack");
    });
    $("#docCenter_p").on("click",function(event){
        $("#documentCenter").find("li").removeClass("docListBack");
    });
    var locationHash=window.location.hash,hashName;
    function changeCssStyle(name){
        $("#left_menu").find(".padding_p").each(function(){
            if($(this).attr("data-content")==name){
                $(this).siblings().removeClass("act_p");
                $(this).addClass("act_p");
            }
        });
    }
    //页面加载/刷新时候判断左侧菜单选中
    if(/basic/.test(locationHash)){
        hashName="basic";
        changeCssStyle(hashName);
    }else if(/dev/.test(locationHash)){
        hashName="dev";
        changeCssStyle(hashName);
    }else if(/doc/.test(locationHash)){
        hashName="doc";
        changeCssStyle(hashName);
    }else if(/auth/.test(locationHash)){
        hashName="auth";
        changeCssStyle(hashName);
    }
});