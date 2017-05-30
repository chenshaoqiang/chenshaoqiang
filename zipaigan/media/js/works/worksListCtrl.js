/*
* 作品管理--作品列表
* */
mainModule.controller('worksListCtrl',function($scope,$rootScope,util,httpServices,$state){

    (function initSetting(){

        //默认参数设置
        util.defaultInit($scope);

        //选择开始日期
        $scope.openStartLayDate=function(){

            util.openStartLayDate($scope);

        };

        //选择结束日期
        $scope.openEndLayDate=function(){

            util.openEndLayDate($scope);

        };

        getWorksLists();

    })();

    function getWorksLists(){

        httpServices.req_post('works.json',{}).success(function(res){

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

    //点击查看
    $scope.getWorkDetail=function(work){

        if( util.notObjEmpty(work) && util.notEmpty(work.worksState) ){

            work.worksState==1?$state.go('worksManager.sub_ing')
                :work.worksState==2?$state.go('worksManager.sub_success')
                :work.worksState==3?$state.go('worksManager.published'):void 0;

        }

        util.setSession("UserId",work.id);//传当前用户ID用户请求列表

    };
});