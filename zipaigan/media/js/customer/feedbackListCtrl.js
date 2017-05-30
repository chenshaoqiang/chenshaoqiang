/*
* 客服管理--意见反馈--反馈列表
* */
mainModule.controller('feedbackListCtrl',function($scope,$rootScope,util,httpServices){

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

        //获取意见反馈列表信息
        getFeedbackLists();

    })();

    function getFeedbackLists(){

        httpServices.req_post('works.json',{}).success(function(res){

            if(res.code=="200"){

                //设置分页，获取表格信息。
                util.setPagination($scope,res);

            }
        });
    }

    //列表跳转
    $scope.getPage=function(page){

        util.goTargetPage(page,$scope,getFeedbackLists);

    };

});