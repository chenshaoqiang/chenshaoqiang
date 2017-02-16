var app = angular.module('app', ['ui.router']);
app.config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
        //路由配置
        $urlRouterProvider.otherwise('page1');
        $stateProvider
            .state('page1', {url:'/page1', templateUrl: 'ui_page/page1.html'})
            .state('page2', {url:'/page2', templateUrl: 'ui_page/page2.html'})
            .state('page3', {url:'/page3', templateUrl: 'ui_page/page3.html'})
            .state('page4', {url:'/page4', templateUrl: 'ui_page/page4.html'})
            .state('page5', {url:'/page5', templateUrl: 'ui_page/page5.html'})
            .state('page6', {url:'/page6', templateUrl: 'ui_page/page6.html'})
            .state('page7', {url:'/page7', templateUrl: 'ui_page/page7.html'})
            .state('page8', {url:'/page8', templateUrl: 'ui_page/page8.html'})
            .state('page9', {url:'/page9', templateUrl: 'ui_page/page9.html'})
            .state('page10', {url:'/page10', templateUrl: 'ui_page/page10.html'})
            .state('page11', {url:'/page11', templateUrl: 'ui_page/page11.html'})
            .state('page12', {url:'/page12', templateUrl: 'ui_page/page12.html'})
            .state('page13', {url:'/page13', templateUrl: 'ui_page/page13.html'})
    }
    ]
);
app.controller('appCtrl',['$scope','$rootScope','$location','$state','$http','$document',function($scope,$rootScope,$location,$state,$http,$document){
    $scope.isClick=$location.path();
    $scope.readyLoad=true;
    //绑定全局键盘事件（左右键）
    $document.bind("keydown keypress", function(event) {
        if(event.keyCode == 37){
            $scope.changePage('prev');
        }else if(event.keyCode == 39){
            $scope.changePage('next');
        }
    });
    //监听路由为小图设置样式
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        $scope.isClick="/"+toState.name;
    });
    //左右箭头点击函数
    $scope.changePage=function(statu){
        //获得当前页数
        var value = $location.path().replace(/[^0-9]/ig,"");
        if(statu=='next'){
            //如果不是最后一页
            if(value!='13'){
                var nextState="page"+(parseInt(value)+1);
                $state.go(nextState);
            }
        }else if(statu=='prev'){
            //如果不是第一页
            if(value!='1'){
                var preState="page"+(parseInt(value)-1);
                $state.go(preState);
            }
        }
    };
    //控制小图选中样式
    if($scope.isClick==''||$scope.isClick==undefined){
        $scope.isClick="/page1";
    }
    //控制模态框内容
    $scope.openModal=function(point){
        $scope.readyLoad=true;
        //获取文件内容
        $http({
            method: 'GET',
            url:"datas.json"+"?DT="+new Date().getTime()
        }).success(function(response) {
            if (response.flag==="000000") {
                var pointVal =parseInt(point.replace(/[^0-9]/ig,""));
                $scope.modalData=response.data.list[pointVal];
                $scope.readyLoad=false;
            }
        }).error(function(response, status) {
            $scope.status = status;
        });
        //分配值
    };
    $scope.goDomState=function(){
        $state.go("page5");
    };
    //ng-repeat测试数据
    $scope.records = [
        {"Name" : "Aimy", "Country" : "Germany"},
        {"Name" : "John", "Country" : "Sweden"},
        {"Name" : "Moctezuma", "Country" : "Mexico"},
        {"Name" : "Handel", "Country" : "Austria"}
    ];
}]);
app.directive("changeWH",['$document',function($document){
    return function(scope,ele,attr){
        ele.bind("mouseover",function(event){
            ele.css({
                width:600+"px",
                height:450+"px"
            });
        });
        ele.bind("mouseleave",function(event){
            ele.css({
                width:400+"px",
                height:300+"px"
            });
        });
    }
}]);
app.directive("draggable",function($document){
    var startX= 0,startY= 0,x= 0,y=0;
    return function(scope,ele,attr){
        ele.bind("mousedown",function(event){
            startX=event.screenX-x;
            startY=event.screenY-y;
            $document.bind("mousemove",mousemove);
            $document.bind("mouseup",mouseup);
        });
        function mousemove(event){
            y=event.screenY-startY;
            x=event.screenX-startX;
            ele.css({
                top:y+"px",
                left:x+"px"
            });
        }
        function mouseup(event){
            $document.unbind("mousemove",mousemove);
            $document.unbind("mouseup",mouseup);
        }
    }
});
angular.element(document).ready(function(){
    angular.bootstrap(document, ['app']);
    (function ($) {
        $.fn.parallaxSlider = function (options) {
            var opts = $.extend({}, $.fn.parallaxSlider.defaults, options);
            return this.each(function () {
                var $img_container = $(this),
                    o = $.meta ? $.extend({}, opts, $img_container.data()) : opts;
                var $thumbnails = $('.thumbnails', $img_container),
                    $thumbs = $thumbnails.children(),
                    $pxs_loading = $('.pxs_loading', $img_container),
                    total_elems = 13;

                var loaded = 0,
                    $images = $('.img_container').find('img');
                $images.each(function () {
                    var $img = $(this);
                    $img.load(function () {
                        ++loaded;
                        if (loaded == total_elems) {
                            $pxs_loading.hide();
                            // $pxs_slider_wrapper.show();

                            var one_image_w = document.body.clientWidth;

                            $thumbnails.css({
                                'width': one_image_w + 'px'
                            });
                            var spaces = one_image_w;
                            $thumbs.each(function (i) {
                                var $this = $(this);
                                var left =$this.width()* (i + 1);
                                $this.css('marginLeft', left + 'px');

                                if (o.thumbRotation) {
                                    var angle = Math.floor(Math.random() * 41) - 20;
                                    $this.css({
                                        '-moz-transform': 'rotate(' + angle + 'deg)',
                                        '-webkit-transform': 'rotate(' + angle + 'deg)',
                                        'transform': 'rotate(' + angle + 'deg)'
                                    });
                                }
                                //hovering the thumbs animates them up and down
                                $this.bind('mouseenter', function () {
                                    $(this).stop().animate({top: '-10px'}, 100);
                                }).bind('mouseleave', function () {
                                    $(this).stop().animate({top: '0px'}, 100);
                                });
                            });
                            //make the first thumb be selected
                            //highlight($thumbs.eq(0));
                            $(window).resize(function () {
                                w_w = $(window).width();
                            });

                        }
                    }).error(function () {
                        alert('here')
                    }).attr('src', $img.attr('src'));
                });


            });
        };

        var w_w = $(window).width();

        var highlight = function ($elem) {
            $elem.siblings().removeClass('selected');
            $elem.addClass('selected');
        };

        $.fn.parallaxSlider.defaults = {
            auto: 0,	//how many seconds to periodically slide the content.
            //If set to 0 then autoplay is turned off.
            speed: 1000,//speed of each slide animation
            easing: 'jswing',//easing effect for the slide animation
            easingBg: 'jswing',//easing effect for the background animation
            circular: true,//circular slider
            thumbRotation: true//the thumbs will be randomly rotated
        };
    })(jQuery);
});
