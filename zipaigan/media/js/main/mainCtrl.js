/*
* 主控制器
* */
mainModule.controller('mainCtrl',function($scope,$rootScope,util,$location,$state,$compile,httpServices){
    //主控制器，先于其他控制器

    (function initSetting(){

        //控制左侧菜单栏选中
        $scope.current='';

        if(util.getSession("current")){

            $scope.current=util.getSession("current");

        }else{

            $scope.current='';

        }

        //监听$scope.current
        var watch = $scope.$watch('current',function(newValue,oldValue, scope){

            util.setSession("current",newValue);

        });

        $scope.custOpen=(util.getSession("custOpen")=="true");
        $scope.systemOpen=(util.getSession("systemOpen")=="true");

        //二级菜单开闭控制
        $scope.changeMenu=function(menu){

            $scope.current=menu;

            (menu=='customerServiceManager'||menu=='report'||menu=='feedback')
                ?(menu=='customerServiceManager'
                ?($scope.custOpen=!($scope.custOpen),
                util.setSession("custOpen",$scope.custOpen),
                ($scope.custOpen ? $scope.current='report':$scope.current=menu))
                :($scope.custOpen=true,util.setSession("custOpen","true")))
                :($scope.custOpen=false,util.setSession("custOpen","false"));

            (menu=='systemManager'||menu=='versionUpdate')
                ?(menu=='systemManager'
                ?($scope.systemOpen=!($scope.systemOpen),
                util.setSession("systemOpen",$scope.systemOpen),
                ($scope.systemOpen ? $scope.current='versionUpdate':$scope.current=menu))
                :($scope.systemOpen=true,util.setSession("systemOpen","true")))
                :($scope.systemOpen=false,util.setSession("systemOpen","false"));

        };


    })();

    //监听路由变化,设置对应的面包屑
    $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){

        //面包屑数组
        $rootScope.breadcrumbs=[];

        //返回首页去除菜单选中样式
        if(toState.name=='loginSuccess'){

            util.setSession("current",'');
            $scope.current='';
            $scope.custOpen=false;
            $scope.systemOpen=false;
            util.removeSession("custOpen");
            util.removeSession("systemOpen");

        }else if(/worksManager/.test(toState.name)){//从其他地方跳到产品详情的时候

            util.setSession("current",'worksManager');
            $scope.current='worksManager';

        }

        //面包屑数值对,只保存需要用于面包屑设置的路由对,按面包屑顺序存值
        var bread=[
            [{'userManager':'用户管理'},{'userManager.uLi':'用户列表'}],
            [{'worksManager':'作品管理'},{'worksManager.wList':'作品列表'}],
            [{'systemManager':'系统管理'}]
        ];

        toState.name=='userManager' ? $state.go('userManager.uLi')
            :toState.name=='worksManager'?$state.go('worksManager.wList')
            :void 0;

        var path=$location.path();
        var arr=path.split("/");//获取路由组
        var lastState=arr[arr.length-1]; //最后的路由

        //四级面包屑设置
        lastState=='wks'?(lastState='userManager.uDt.wks',bread[0].push({'userManager.uDt.wks':'用户详情'}))
            :lastState=='ucm'?(lastState='userManager.uDt.ucm',bread[0].push({'userManager.uDt.ucm':'用户详情'}))
            :lastState=='ucr'?(lastState='userManager.uDt.ucr',bread[0].push({'userManager.uDt.ucr':'用户详情'}))
            :lastState=='upm'?(lastState='userManager.uDt.upm',bread[0].push({'userManager.uDt.upm':'用户详情'}))
            :lastState=='upr'?(lastState='userManager.uDt.upr',bread[0].push({'userManager.uDt.upr':'用户详情'}))
            :lastState=='worksManager.sub_ing'?(bread[1].push({'worksManager.sub_ing':'投稿中作品'}))
            :lastState=='worksManager.sub_success'?bread[1].push({'worksManager.sub_success':'投稿成功作品'})
            :lastState=='worksManager.published'?bread[1].push({'worksManager.published':'已发布作品'})
            :lastState=='reportList'?($rootScope.breadcrumbs=[
            {"title":"客服管理","state":"customerServiceManager.reportList"},
            {"title":"举报管理","state":"customerServiceManager.reportList"},
            {"title":"举报列表","state":"customerServiceManager.reportList"}])
            :lastState=='feedback'?($rootScope.breadcrumbs=[
            {"title":"客服管理","state":"customerServiceManager.feedback"},
            {"title":"意见反馈","state":"customerServiceManager.feedback"},
            {"title":"意见反馈列表","state":"customerServiceManager.feedback"}])
            :lastState=='reportListDt'?($rootScope.breadcrumbs=[
            {"title":"客服管理","state":"customerServiceManager.reportList"},
            {"title":"举报管理","state":"customerServiceManager.reportList"},
            {"title":"举报列表","state":"customerServiceManager.reportList"},
            {"title":"被举报作品详情","state":"customerServiceManager.reportListDt"}])
            :lastState=='versionList'?($rootScope.breadcrumbs=[
            {"title":"系统管理","state":"systemManager.versionList"},
            {"title":"版本更新","state":"systemManager.versionList"},
            {"title":"版本列表","state":"systemManager.versionList"}])
            :lastState=='versionDetail'?($rootScope.breadcrumbs=[
            {"title":"系统管理","state":"systemManager.versionList"},
            {"title":"版本更新","state":"systemManager.versionList"},
            {"title":"版本列表","state":"systemManager.versionList"},
            {"title":"版本详情","state":"systemManager.versionDetail"}])
            :lastState=='newVersion'?($rootScope.breadcrumbs=[
            {"title":"系统管理","state":"systemManager.versionList"},
            {"title":"版本更新","state":"systemManager.newVersion"},
            {"title":"发布新版本","state":"systemManager.newVersion"}]):void 0;


        $(bread).each(function(){

            var curArr=$(this);
            var curTit=[]; //用于保存面包屑key值组以便循环的时候用于设置

            for(var i=0;i<curArr.length;i++){

                for(key in curArr[i]){

                    curTit[curTit.length]=key;

                    if(key==lastState){

                        //获取到当前面包屑的索引值了 --> i

                        for(var j=0;j<=i;j++){

                            $rootScope.breadcrumbs[$rootScope.breadcrumbs.length]={"title":curArr[j][curTit[j]],"state":curTit[j]};

                        }

                        return; //找到对应的面包屑了就中断循环

                    }
                }

            }

        });


    });

    //返回
    $rootScope.goBackState=function(state){

        if(state){

            $state.go(state);

        }

    };


});