/*
* 客服管理--举报管理--举报列表--举报作品详情
* */
mainModule.controller('reportListDtCtrl',function($scope,$rootScope,util,httpServices){

    (function initSetting(){

        //默认参数设置
        util.defaultInit($scope,"10");

        //获取举报作品详情信息
        getReportDetailLists();

    })();

    function getReportDetailLists(){

        httpServices.req_post('img1.json',{}).success(function(res){

            if(res.code=="200"){

                //设置分页，获取表格信息。
                util.setPagination($scope,res);

            }
        });
    }

    //列表跳转
    $scope.getPage=function(page){

        util.goTargetPage(page,$scope,getReportDetailLists);

    };

    //删除
    $scope.deleteDate=function(user){

        util.myLayer($scope,0,'删除提示','确定删除该作品？',sureDelete);

    };

    function sureDelete(){

        console.log("删除");

    }
    //禁用
    $scope.disableDate=function(user){

        util.myLayer($scope,0,'禁用提示','确定禁用该作品？',sureDisabled);

    };

    function sureDisabled(){

        console.log("禁用");

    }
});