/*
* 作品管理--作品列表--投稿中的作品
* */
mainModule.controller('sub_ingCtrl',function($scope,$rootScope,util,httpServices){

    (function initSetting(){

        $scope.UserId=util.getSession("UserId");

        //默认参数设置
        util.defaultInit($scope,"5");

        getWorksLists();

    })();

    function getWorksLists(){

        httpServices.req_post('img.json',{}).success(function(res){

            if(res.code=="200"){

                //设置分页，获取表格信息。
                util.setPagination($scope,res);

            }
        });
    }

    //列表跳转
    $scope.getPage=function(page){

        util.goTargetPage(page,$scope,getWorksLists);

    };

    //删除
    $scope.delete=function(user){

        util.myLayer($scope,0,'删除提示','确定删除该作品？',sureDelete);

    };

    function sureDelete(){

        console.log("删除");

    }
    //禁用
    $scope.disabled=function(user){

        util.myLayer($scope,0,'禁用提示','确定禁用该作品？',sureDisabled);

    };
    function sureDisabled(){

        console.log("禁用");

    }
});