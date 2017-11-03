<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0"/>
    <title>${title}</title>
    <!-- jQuery文件 -->
    <script src="http://libs.baidu.com/jquery/1.10.2/jquery.min.js"></script>
    <!--样式表文件-->
    <link rel="stylesheet" href="css/index.css">
</head>
<body>
<div class="wrap" id="wrap" style="height: auto;padding-bottom: 0.5rem;">
    <!--用户信息-->
    <div class="user_info">
        <div class="user_head">
            <img id="img_user_head" src="${headimgurl}">
        </div>
        <div class="user_name">
            <span id="user_name_span">${username}</span>
            <span id="creat_time_span">${createtime}</span>
        </div>
    </div>
    <!--全景图-->
    <div class="scroll-img2" id="scroll-img2">
        <video id="video" src="${imgpath}" controls="controls" poster="${thumbnail}" width="100%"></video>
    </div>
    <!--描述-->
    <div class="describe">
        <span class="describe_span">${say}</span>
        <!--评论按钮-->
        <div class="comment_div" id="comment_div">
            <img id="comment" src="img/comment_w.png">
        </div>
    </div>
    <!--评论、点赞-->
    <div class="icon_box">
        <img class="comment_icon fl" src="./img/comment_icon_black.png" alt=""/>
        <span class="icon_span fl">${commentCount}</span>
        <img class="comment_icon fl" src="./img/parise_icon_black.png" alt=""/>
        <span class="icon_span fl">${praiseCount}</span>
    </div>
</div>
</body>
<script type="text/javascript">
    (function() {
        function getScale(){

            if(window.orientation == 0 || window.orientation == 180){

                //设置压缩比
                deviceWidth = document.documentElement.clientWidth > 1300 ? 1300 : document.documentElement.clientWidth;
                document.documentElement.style.fontSize = (deviceWidth / 7.5) + 'px';

            }else if(window.orientation == 90 || window.orientation == -90){

                //横屏的时候为避免元素被放大，依然采用竖屏的压缩比
                deviceWidth = window.screen.height > 1300 ? 1300 : window.screen.height;
                document.documentElement.style.fontSize = (deviceWidth / 7.5) + 'px';

            }
        }

        getScale();        //这是页面加载的时候第一次获取压缩比重绘

        window.onresize = function(){

            getScale();    //窗口变化的时候重置压缩比，比如自动横屏的时候

        };

    })();

    //var myVideo = document.getElementById("video");

</script>
</html>