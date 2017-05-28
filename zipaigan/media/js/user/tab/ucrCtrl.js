/*
* 用户管理--用户详情--收到的评论
* */
mainModule.controller('ucrCtrl',function($scope,$rootScope,util,httpServices,$state){

    (function initSetting(){

        //默认参数设置
        util.defaultInit($scope);

        //获取用户信息
        searchUcrLists();

    })();

    function searchUcrLists(){

        httpServices.req_post('user_detail.json',{}).success(function(res){

            if(res.code=="200"){

                //设置分页，获取表格信息。
                util.setPagination($scope,res);

            }
        });
    }

    //列表跳转
    $scope.getPage=function(page){

        util.goTargetPage(page,$scope,searchUcrLists);

    };

    //点击查看
    $scope.getUcrDetail =function(works){

        //

    }

});