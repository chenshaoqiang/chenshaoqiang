/*
* 用户管理--用户详情--收到的赞
* */
mainModule.controller('uprCtrl',function($scope,$rootScope,util,httpServices,$state){

    (function initSetting(){

        //默认参数设置
        util.defaultInit($scope,"10");

        //获取用户信息
        searchUprLists();

    })();

    function searchUprLists(){

        httpServices.req_post('user.json',{}).success(function(res){

            if(res.code=="200"){

                //设置分页，获取表格信息。
                util.setPagination($scope,res);

            }
        });
    }

    //列表跳转
    $scope.getPage=function(page){

        util.goTargetPage(page,$scope,searchUprLists);

    };

    //点击查看
    $scope.getUprDetail =function(works){

        //

    }

});