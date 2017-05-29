/**
 * 用于自定义指令
 */

mainModule.directive('imgLazyLoad', function() {

    var maxWidth=$("#imgBox").width()-100;

    //图片延迟加载
    return {

        restrict: 'AE',

        link: function(scope, element, attr) {

            $(element[0]).parents(".workList");

            var realSrc = scope.work.worksUrl;
            var tempImg=new Image;
            tempImg.src=realSrc;
            tempImg.onload=function(){

                if(parseInt(this.width)<parseInt(maxWidth)){
                    //处理小图，比例大于70%则设100%；比例小于70%则设置50%
                    var prop=parseInt(parseInt(this.width)/parseInt(maxWidth)*100);//百分比

                    if(prop>=70){

                        $(element[0]).parents(".workList").css("width",'100%');

                    }else{

                        $(element[0]).parents(".workList").css("width",'50%')

                    }

                }
                $(element[0]).attr("src",realSrc);
            };
        }
    };
});
