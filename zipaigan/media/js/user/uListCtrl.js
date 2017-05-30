/*
* 用户管理--用户列表
* */
mainModule.controller('uListCtrl',function($scope,$rootScope,util,httpServices){

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

        //获取用户信息
        getUserLists();

    })();

    function getUserLists(){

        httpServices.req_post('user.json',{}).success(function(res){

            if(res.code=="200"){

                //设置分页，获取表格信息。
                util.setPagination($scope,res);

            }
        });
    }

    //用户管理列表跳转
    $scope.getPage=function(page){

        util.goTargetPage(page,$scope,getUserLists);

    };

    //点击用户详情
    $scope.getUserDetail =function(user){

        util.setSession("u_Name",user.userName);
        util.setSession("u_account",user.account);
        util.setSession("u_pTime",user.pTime);

        util.setSession("cur","wks");
    }

});