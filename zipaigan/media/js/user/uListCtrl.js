/*
* 用户管理--用户列表
* */
mainModule.controller('uListCtrl',function($scope,$rootScope,util,httpServices){

    (function initSetting(){

        //默认参数设置
        util.defaultInit($scope);

        //获取用户信息
        getUserLists();

    })();

    //选择开始日期
    $scope.openStartLayDate=function(){
        var start = {
            min: '1900-01-01 00:00:00',
            max: laydate.now(),             //最多只能选择今天
            festival: true,                 //显示节日
            format: 'YYYY-MM-DD',           //日期格式
            istoday: false,
            choose: function(datas){        //选择完成触发
                $scope.search.startTime=datas;
            }
        };
        laydate(start);
    };

    //选择结束日期
    $scope.openEndLayDate=function(){
        var end = {
            min: $scope.search.startTime,//结束日期早于起始日期
            max: laydate.now(),              //最多只能选择今天
            festival: true,                  //是否显示节日
            format: 'YYYY-MM-DD',            //日期格式
            istoday: false,
            choose: function(datas){         //选择完成触发
                $scope.search.endTime=datas;
            }
        };
        laydate(end);
    };

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
        util.setSession("u_resTime",user.resTime);

        util.setSession("cur","wks");
    }

});