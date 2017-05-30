/*
* 系统管理--版本更新--版本列表
* */
mainModule.controller('versionListCtrl',function($scope,$rootScope,util,httpServices,$state){

    (function initSetting(){

        //默认参数设置
        util.defaultInit($scope,"10");

        //选择开始日期
        $scope.openStartLayDate=function(){

            util.openStartLayDate($scope);

        };

        //选择结束日期
        $scope.openEndLayDate=function(){

            util.openEndLayDate($scope);

        };

        //获取版本列表信息
        getVersionLists();

    })();

    function getVersionLists(){

        httpServices.req_post('works.json',{}).success(function(res){

            if(res.code=="200"){

                //设置分页，获取表格信息。
                util.setPagination($scope,res);

            }
        });
    }

    //列表跳转
    $scope.getPage=function(page){

        util.goTargetPage(page,$scope,getVersionLists);

    };

    //点击查看详情
    $scope.getDetail =function(date){

        $state.go('systemManager.versionList');

    }

});