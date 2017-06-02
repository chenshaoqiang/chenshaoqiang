/*
* 作品管理--作品列表--投稿成功的作品
* */
mainModule.controller('sub_successCtrl',function($scope,$rootScope,util,httpServices){

    (function initSetting(){

        $scope.UserId=util.getSession("UserId");

        //默认参数设置
        util.defaultInit($scope,"5");

        getWorksLists();

    })();

    function getWorksLists(){

        httpServices.req_post('img2.json',{}).success(function(res){

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
    $scope.deleteDate=function(date){

        util.myLayer($scope,0,'删除提示','您确定删除此投稿作品么？',sureDelete);

    };

    function sureDelete(){

        console.log("删除回调");

    }

    //禁用
    $scope.disableDate=function(date){

        util.myLayer($scope,0,'禁用提示','您确定禁用此投稿作品么？',sureDisabled);

    };

    function sureDisabled(){

        console.log("禁用回调");

    }

});