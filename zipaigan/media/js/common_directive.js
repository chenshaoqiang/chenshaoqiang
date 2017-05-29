/**
 * 用于自定义指令
 */

mainModule.directive('imgLazyLoad', function() {
    //图片延迟加载
    return {

        restrict: 'AE',

        link: function(scope, element, attr) {
            var realSrc = scope.work.worksUrl;
            var tempImg=new Image;
            tempImg.src=realSrc;
            tempImg.onload=function(){
                $(element[0]).attr("src",realSrc);
            };
            function offset(ele){
                var t=ele.offsetTop;
                var l=ele.offsetLeft;
                var p=ele.offsetParent;
                while(p){
                    if(window.navigator.userAgent.indexOf("MSIE 8")==-1){
                        t+=p.offsetTop+p.clientTop;
                        l+=p.offsetLeft+p.clientLeft;
                    }else{
                        t+=p.offsetTop;
                        l+=p.offsetLeft;
                    }
                    p=p.offsetParent;
                }
                return {left:l,top:t};
            }
        }
    };
});
