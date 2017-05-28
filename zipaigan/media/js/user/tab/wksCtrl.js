/*
* 用户管理--用户详情--作品
* */
mainModule.controller('wksCtrl',function($scope,$rootScope,util,httpServices,$state){

    (function initSetting(){

        //默认参数设置
        util.defaultInit($scope);

        //获取用户信息
        searchWorksLists();

    })();

    function searchWorksLists(){

        httpServices.req_post('user.json',{"page":$scope.search.pageNumber}).success(function(res){

            if(res.code=="200"){

                //设置分页，获取表格信息。
                util.setPagination($scope,res);

            }
        });
    }

    //列表跳转

    $scope.getPage=function(page){

        util.goTargetPage(page,$scope,searchWorksLists);


    };

    //点击查看
    $scope.getWorksDetail =function(works){

        //

    }

});