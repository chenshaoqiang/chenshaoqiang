/*
* 用户管理--用户详情--发出的评论
* */
mainModule.controller('ucmCtrl',function($scope,$rootScope,util,httpServices,$state){

    (function initSetting(){

        //默认参数设置
        util.defaultInit($scope);

        //获取用户信息
        searchUcmLists();

    })();

    function searchUcmLists(){

        httpServices.req_post('user.json',{}).success(function(res){

            if(res.code=="200"){

                //设置分页，获取表格信息。
                util.setPagination($scope,res);

            }
        });
    }

    //列表跳转
    $scope.getPage=function(page){

        util.goTargetPage(page,$scope,searchUcmLists);

    };

    //点击查看
    $scope.getUcmDetail =function(works){

        //

    }


});