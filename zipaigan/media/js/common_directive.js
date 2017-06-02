/**
 * 用于自定义指令
 */

mainModule.directive('imgLazyLoad', function() {

    var maxWidth=$("#imgBox").width()-100;

    //图片延迟加载+双击展示
    return {

        restrict: 'AE',

        link: function(scope, element, attr) {

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

                $(element[0]).on("dblclick",function(){

                    layer.open({
                        type: 1,
                        title: '原图',
                        area: ['98%','95%'],
                        shade:0.9,
                        btnAlign: 'c',
                        scrollbar: false,
                        content:"<div class='img_box w ofa'>" +
                            "<img id='curImages' src='"+realSrc+"'/>"+
                        "</div>"
                    });

                });
            };
        }
    };
});
mainModule.directive('loadCommonUl', function(httpServices,util) {

    return {

        restrict: 'AE',
        scope: true,
        templateUrl:'./common_ul/common_ul.html',
        link: function(scope, element, attr) {

            function getCommentLists(){

                httpServices.req_post("comment.json",{}).success(function(res){

                    if(res.code=="200"){

                        //设置分页，获取表格信息。
                        util.setPagination(scope,res);

                        if(util.notArrayEmpty(scope.Lists)){

                            for(var i=0;i<scope.Lists.length;i++){

                                for(key in scope.Lists[i]){//键值统一化

                                    scope.Lists[i].selected=false;//默认不选中

                                    (key=="commentMan")?scope.Lists[i].listName=scope.Lists[i][key]
                                        :(key=="comment")?scope.Lists[i].listContent=scope.Lists[i][key]
                                        :(key=="cTime")?scope.Lists[i].listTime=scope.Lists[i][key]
                                        :void 0;

                                }

                            }

                        }

                    }
                });
            }
            function getGreatLists(){

                httpServices.req_post("great.json",{}).success(function(res){

                    if(res.code=="200"){

                        //设置分页，获取表格信息。
                        util.setPagination(scope,res);

                        if(util.notArrayEmpty(scope.Lists)){

                            for(var i=0;i<scope.Lists.length;i++){

                                for(key in scope.Lists[i]){//键值统一化

                                    (key=="greatMan")?scope.Lists[i].listName=scope.Lists[i][key]
                                        :(key=="greatContent")?scope.Lists[i].listContent=scope.Lists[i][key]
                                        :(key=="gTime")?scope.Lists[i].listTime=scope.Lists[i][key]
                                        :void 0;

                                }

                            }

                        }

                    }
                });
            }
            function getShareLists(){

                httpServices.req_post("share.json",{}).success(function(res){

                    if(res.code=="200"){

                        //设置分页，获取表格信息。
                        util.setPagination(scope,res);

                        if(util.notArrayEmpty(scope.Lists)){

                            for(var i=0;i<scope.Lists.length;i++){

                                for(key in scope.Lists[i]){//键值统一化

                                    (key=="shareMan")?scope.Lists[i].listName=scope.Lists[i][key]
                                        :(key=="shareContent")?scope.Lists[i].listContent=scope.Lists[i][key]
                                        :(key=="sTime")?scope.Lists[i].listTime=scope.Lists[i][key]
                                        :void 0;

                                }

                            }

                        }

                    }
                });
            }

            var comBlack='../media/images/comment_icon_black.png';//黑图标
            var comYellow='../media/images/comment_icon_yellow.png';//黄图标

            var greatBlack='../media/images/parise_icon_black.png';//黑图标
            var greaYellow='../media/images/parise_icon_yellow.png';//黄图标

            var shareBlack='../media/images/fenxiang_icon_black.png';//黑图标
            var shareYellow='../media/images/fenxiang_icon_yellow.png';//黄图标

            scope.commentSrc= comBlack;//评论默认小图标
            scope.greatSrc= greatBlack;   //点赞默认小图标
            scope.shareSrc= shareBlack; //分享默认小图标

            //开发公用的评论、点赞、分享列表
            scope.openCommonUl=function(ev,date,type){

                $("#checkboxDiv"+date.id).css("display","none");

                util.defaultInit(scope,"4");

                switch (type){

                    case 'comment'://点击了评论按钮

                        if(scope.commentSrc==comBlack){//黑图

                            scope.commentSrc=comYellow;//图标点亮
                            scope.greatSrc= greatBlack;
                            scope.shareSrc= shareBlack;

                            getCommentLists();

                            //列表跳转
                            scope.getPage=function(page){

                                util.goTargetPage(page,scope,getCommentLists);

                            };

                            $("#checkboxDiv"+date.id).css("display","block");

                            $("#"+date.id).css("display","block");//打开列表

                        }else{

                            scope.commentSrc=comBlack;

                            $("#"+date.id).css("display","none");//打开列表
                        }

                        break;

                    case 'great'://点击了点赞按钮

                        if(scope.greatSrc==greatBlack){//黑图

                            scope.greatSrc=greaYellow;//图标点亮
                            scope.commentSrc= comBlack;
                            scope.shareSrc= shareBlack;

                            getGreatLists();

                            //列表跳转
                            scope.getPage=function(page){

                                util.goTargetPage(page,scope,getGreatLists);

                            };

                            $("#"+date.id).css("display","block");//打开列表

                        }else{

                            scope.greatSrc=greatBlack;

                            $("#"+date.id).css("display","none");//打开列表
                        }

                        break;

                    case 'share'://点击了分享按钮

                        if(scope.shareSrc==shareBlack){//黑图

                            scope.shareSrc=shareYellow;//图标点亮
                            scope.commentSrc= comBlack;
                            scope.greatSrc= greatBlack;

                            getShareLists();

                            //列表跳转
                            scope.getPage=function(page){

                                util.goTargetPage(page,scope,getShareLists);

                            };

                            $("#"+date.id).css("display","block");//打开列表

                        }else{

                            scope.shareSrc=shareBlack;

                            $("#"+date.id).css("display","none");//打开列表
                        }

                        break;


                    default :

                        break;

                }


            };

            scope.selectData=function(date){

                date.selected=!(date.selected);

                console.log(date.selected);

            };

        }
    };
});
