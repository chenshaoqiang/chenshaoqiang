/**
 * 用于自定义指令
 */

mainModule.directive('imgLazyLoad', function() {
    //图片延迟加载
    return {

        restrict: 'AE',

        link: function(scope, element, attr) {

            var realSrc = $(element[0]).attr('realSrc');

            var tempImg=new Image;
            tempImg.src=realSrc;

            tempImg.onload=function(){

                $(element)[0].src=realSrc;

            };
        }
    };
});
