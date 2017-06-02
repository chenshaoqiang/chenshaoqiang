/*
* 作品管理--作品列表--投稿中的作品
* */
mainModule.controller('sub_ingCtrl',function($scope,$rootScope,util,httpServices,$compile,$state){

    (function initSetting(){

        $scope.UserId=util.getSession("UserId");

        //默认参数设置
        util.defaultInit($scope,"5");

        getWorksLists();

    })();

    function getWorksLists(){

        httpServices.req_post('img1.json',{}).success(function(res){

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

    //不通过
    $scope.noPassDate=function(date){

        util.myLayer($scope,0,'不通过提示','您确定不通过此投稿作品么？',sureNoPass);

    };

    function sureNoPass(){

        console.log("不通过提示");

    }
    //通过
    $scope.passDate=function(date){

        util.myLayer($scope,0,'通过提示','您确定通过此投稿作品么？',surePass);

    };
    function surePass(){

        console.log("通过提示");

    }



});