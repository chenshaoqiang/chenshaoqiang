var desW=360;//设置设计稿宽
var winW=document.documentElement.clientWidth;  //设备的实际宽度
var scale=desW/100;
document.documentElement.style.fontSize=winW/scale+"px";

var scrollImg=document.getElementById("scroll-img");
var marquePic1=document.getElementById("marquePic1");
var marquePic2=document.getElementById("marquePic2");
var protionId = $("#protionId").val();
var bigPic = $("td.big_img img");  // 图片img
var realWidth;//图片的宽度
var realHeight;//图片的高度

var userNameSpan = $("div.user_name span"); // 用户姓名
var userHeadImg = $("div.user_head img"); // 用户头像
var howLongSpan = $("div.date_play_num span.howLong");  // 日期
// 实现图片循环滚动的方法
function Marquee(n) {

    if (parseInt($(".scroll-img-box").css("width")) - scrollImg.scrollLeft <= screen.height) {

        scrollImg.scrollLeft = 0;
    } else {

        scrollImg.scrollLeft = scrollImg.scrollLeft + n;
    }

}
$(document).ready(function(){
    var imgBox=document.getElementById("imgBox");

    function resetAll(){
        $("#marquePic2").css("left",parseInt($("#main_img_work").css("width")));
        $(".scroll-img-box").css("width",parseInt($("#main_img_work").css("width"))*2);
        $(".scroll-img-td").css("width",parseInt($("#main_img_work").css("width")));
        marquePic2.innerHTML = marquePic1.innerHTML;
    }
    resetAll();

    var startX = 0;
    var startY = 0;
    var isPlay = true;//是否滚动状态设置，默认滚动
    var isChange = false;//是否翻屏
    var speed = 50;
    var timer;        // 用于定时器

    judgeTheOrientation();
    rotatePic();
    var crrentW=$(".img-box").css("width");
    var crrentH=$(".img-box").css("height");
    $("#switch_div").on("click",function(){
        isChange=true;
        $(".img-box").css({
            "transform-origin":"left bottom",
            "transform":"rotate(90deg)",
            "width":crrentH,
            "height":crrentW,
            "top":parseInt(crrentW)*(-1)
        });
        $("#marquePic2").css("left",parseInt($("#main_img_work").css("width")));
        $(".scroll-img-box").css("width",parseInt($("#main_img_work").css("width"))*2);
        $(".scroll-img-td").css("width",parseInt($("#main_img_work").css("width")));
        //console.log(parseInt($("#main_img_work").css("width")));
        pic_scroll();
    });
    //停止滚动
    function stopRolling() {
        isPlay = true;
        //stopMusic();
        clearInterval(timer);
    }

    //继续滚动
    function startRolling() {
        isPlay = false;
        //startMusic();
        timer = setInterval("Marquee(5)", speed);
    }

    //开关按钮点击处理函数
    function pic_scroll() {

        if (isPlay) {
            // 继续滚动
            startRolling();
        } else {
            stopRolling();
        }
    }
    // 请求接口刷新数据
    $.ajax({
        url: "http://www.paipai360.cn:80/paipai360//production/sharegetProductionDetails.action?id=" + protionId,
        method: 'post',
        data: {"id": protionId, "type": 1},
        dataType: "jsonp", // 数据类型为jsonp
        jsonp: "jsonpCallback", // 服务端用于接收callback调用的function名的参数
        success: function (data) {
            if (data.code == 'success') {
                var username = data.data.username;
                var userHeadUrl = data.data.headimgurl;
                var priseNum = data.data.praiseNum;
                var commentNum = data.data.commentNum;
                var howLong = data.data.howLong;

                var content = data.data.title;
                var songName = data.data.songName;

                /*userNameSpan.text(username);
                userHeadImg.attr("src", userHeadUrl);
                howLongSpan.text(howLong);
                playNumSpan.text(data.data.playNum);
                commentNumSpan.text(commentNum);
                priseNumSpan.text(priseNum);

                bigPic.attr("src", data.data.url);
                if (content !== null && content.length > 14) {
                    contentLineStr = content.substring(0, 14);
                    contentAllStr = content;
                } else if (content !== null) {
                    contentLineStr = content;
                    contentAllStr = content;
                }
                workContent.text(contentLineStr);*/
            }
        }
    });

    // 滑动开始事件处理
    var startHandler = function (event) {
        // 停止自动播放
        stopRolling();
        startX = event.touches[0].pageX;
        startY = event.touches[0].pageY;

    };

    // 滑动过程中事件处理
    var moveHandler = function (event) {
        event.preventDefault();

        var touch = event.touches[0];
        var moveX = touch.pageX;
        var moveY = touch.pageY;
        var dY = moveY - startY;
        var len = moveX - startX;

        if(isChange){
            len = moveY - startY;
        }else{
            len = moveX - startX;
        }
        len = len * -1;   // 为了矫正方向
        len = len / 10;   // 为了减速

        scrollImg.scrollLeft = scrollImg.scrollLeft + len;
        // 如果最近一次的向右滑动，图片滑动到了左边的边缘，重置一下
        if (scrollImg.scrollLeft <= 0) {
            scrollImg.scrollLeft = parseInt($("#main_img_work").css("width"))-screen.width-2; // 目的是为了能继续向右滑动
        }
        // 如果最近一次的向左滑动，图片滑动到了右边的边缘，重置一下
        if (scrollImg.scrollLeft+(screen.width) >= parseInt($("#main_img_work").css("width"))) {

            scrollImg.scrollLeft = 0; // 目的是为了能继续向左滑动
        }


    };

    // 滑动结束事件处理
    var endHandler = function (event) {};

    scrollImg.addEventListener("touchstart", startHandler, false);
    scrollImg.addEventListener("touchmove", moveHandler, false);
    scrollImg.addEventListener("touchend", endHandler, false);
});

// 判断手机屏幕方向
function judgeTheOrientation() {

    switch (window.orientation) {
        case 0://ipad、iphone横屏；Andriod竖屏
            $("body").attr("class", "portrait");
            orientation = 'portrait';
            break;
        case 180://ipad、iphone横屏；Andriod竖屏
            $("body").attr("class", "portrait");
            orientation = 'portrait';
            break;
        case -90://ipad、iphone竖屏；Andriod横屏
            $("#bottom_div").css("display", "none");
            $("body").attr("class", "landscape");
            orientation = 'landscape';
            break;
        case 90://ipad、iphone竖屏；Andriod横屏
            $("body").attr("class", "landscape");
            orientation = 'landscape';
            break;
        default:
            break;
    }
    return false;
}




// 旋转的时候图片适配
function rotatePic() {

    //动态设置获取的图片的高度以适应不同高度图片（统一高度）
    var setImgHeight=$(".scroll-img").height();
    $(".big_img").css("height",setImgHeight/(winW/scale)+"rem");

    console.log($("#main_img_work").css("width"),$("#main_img_work").css("height"));

}
$(window).bind("orientationchange", function (event) {

    judgeTheOrientation();

    rotatePic();
});

