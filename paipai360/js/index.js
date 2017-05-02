var desW=720;//设置设计稿宽
var winW=document.documentElement.clientWidth;//设备的实际宽度
var scale=desW/100;
document.documentElement.style.fontSize=winW/scale+"px";


var realWidth;//图片真实的宽度
var realHeight;//图片真实的高度

var screenWid = screen.width;
var screenHei = screen.height;

var isPlay = true;
var isShowAll = false;    // 是否展示所有说说内容
var speed = 40;                                   // 自动播放的时,使用的间隔时间,间隔越小速度越大
var timer;    // 用于定时器
var middle_space_work = document.getElementById("middle_space_work");   // 获取middle_space_work对象,大图片
var mainImgWork = document.getElementById("main_img_work");   // 获取middle_space_work对象,大图片
var protionId = $("#protionId").val();

var contentLineStr = "single";
var contentAllStr = "poth";

var audio = document.getElementById("music"); // 音乐

var userHeadImg = $("div.user_head img"); // 用户头像
var userNameSpan = $("div.user_name span"); // 用户姓名

var workContent = $("div.work_content span"); // 说说内容
var contentImg = $("div.content_img_div img");

var howLongSpan = $("div.date_play_num span.howLong");  // 日期
var playNumSpan = $("div.date_play_num span.playNum");  // 播放次数
var commentNumSpan = $("div.commentNum span");          // 评论数
var priseNumSpan = $("div.priseNum span");  // 点赞数目
var bigPic = $("td.big_img img");  // 图片img


marquePic2.innerHTML = marquePic1.innerHTML;

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
            $("#bottom_div").css("display", "none");
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

    screenWid = screen.width;
    screenHei = screen.height;

//        // 方式一
//        // 图片宽和高都比屏幕大
//        if (realHeight >= screenHei && realWidth >= screenWid) {
//            if (realWidth / screenWid > realHeight / screenHei) {
//                realWidth = screenHei / realHeight * realWidth;
//                realHeight = screenHei;
//            } else {
//                realHeight = screenWid / realWidth * realHeight;
//                realWidth = screenWid;
//            }
//        } else
//        // 图片宽和高都比屏幕的小
//        if (realHeight < screenHei && realWidth < screenWid) {
//
//            if (screenWid / realWidth > screenHei / realHeight) {
//                realHeight = screenWid / realWidth * realHeight;
//                realWidth = screenWid;
//            } else {
//                realWidth = screenHei / realHeight * realWidth;
//                realHeight = screenHei;
//            }
//        } else {
//            if (realWidth / screenWid > realHeight / screenHei) {
//                realWidth = screenHei / realHeight * realWidth;
//                realHeight = screenHei;
//            } else {
//                realHeight = screenWid / realWidth * realHeight;
//                realWidth = screenWid;
//            }
//        }

    // 方式二
    if (realHeight < screenHei) { // 图片高度不足（图片高度小于屏幕宽度） 放大图片
        realWidth = screenHei / realHeight * realWidth;
        realHeight = screenHei;
    }

    if (realWidth < screenWid) { // 屏幕宽度不足（图片宽度小于屏幕高度） 放大图片
        realHeight = screenWid / realWidth * realHeight;
        realWidth = screenWid;
    }

    if (window.orientation == 90 || window.orientation == -90) {
        realWidth = (screenHei + 150) / realHeight * realWidth;
        realHeight = screenHei + 150;
    }

    var marginTop = ($(window).height() - realHeight) / 2;
    if (marginTop > 0) {
        marginTop = 5;
        $(bigPic).css("width", realWidth/100 + 'rem').css("height", realHeight/100 + 'rem')
            .css("margin-top", marginTop/100 + "rem");
    } else {
        $(bigPic).css("width", realWidth/100 + 'rem').css("height", realHeight/100 + 'rem');
    }

    marquePic2.innerHTML = marquePic1.innerHTML;
    $('body').attr({width: realWidth, height: realHeight});
}

$(window).bind("orientationchange", function (event) {

    judgeTheOrientation();

    rotatePic();
});

// 界面加载的时候调用
$(function () {
    judgeTheOrientation();
});

function Marquee(n) {       // 实现图片循环滚动的方法

    if (marquePic1.offsetWidth - middle_space_work.scrollLeft <= 0) {

        middle_space_work.scrollLeft = 0;

    } else {

        middle_space_work.scrollLeft = middle_space_work.scrollLeft + n;
    }

}

function stopRolling() {                //停止滚动

    isPlay = true;
    stopMusic();
    clearInterval(timer);
}

function startRolling() {                  //继续滚动

    isPlay = false;
    startMusic();
    timer = setInterval("Marquee(5)", speed);
}

function startMusic() { // 播放音乐

    if (audio.currentSrc !== null) {
        audio.load();
        audio.play();
    }
    $("#switch_div").find('img').attr("src", "img/pause.png");
}

function stopMusic() { // 暂停音乐

    if (!audio.paused) {
        audio.pause();
    }
    $("#switch_div").find('img').attr("src", "img/play.png");
}

/*
 * 开关按钮点击处理函数
 */
function pic_scroll() {

    if (isPlay) {

        // 继续滚动
        startRolling();

    } else {

        stopRolling();
    }
}

// 查看全部说说内容
function content_click() {
    if (isShowAll) {
        contentImg.attr("src", "img/open.png");
        workContent.text(contentLineStr);
    } else {
        contentImg.attr("src", "img/close.png");
        workContent.text(contentAllStr);
    }
    isShowAll = !isShowAll;
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

            userNameSpan.text(username);
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
            workContent.text(contentLineStr);
        }
    }
});

// 根据图片真实尺寸设置body和img的尺寸大小，目的是保证图片不变形（前提是：图片宽大于1024，高大于1000）
$("#main_img_work").each(function (i) {

    //这里做下说明，$("<img/>")这里是创建一个临时的img标签，类似js创建一个new Image()对象！
    $("<img/>").attr("src", $(bigPic).attr("src")).load(function () {
        /*
         如果要获取图片的真实的宽度和高度有三点必须注意
         1、需要创建一个image对象：如这里的$("<img/>")
         2、指定图片的src路径
         3、一定要在图片加载完成后执行如.load()函数里执行
         */
        realWidth = this.width;
        realHeight = this.height;

        rotatePic();
    });
});

// 滑动事件
var startX = 0;
var startY = 0;
// 滑动开始事件处理
var startHandler = function (event) {
    // 停止自动播放
    stopRolling();
    startX = event.touches[0].pageX;
    startY = event.touches[0].pageY;

}
// 滑动过程中事件处理
var moveHandler = function (event) {
    event.preventDefault();

    var touch = event.touches[0];
    var moveX = touch.pageX;
    var moveY = touch.pageY;
    var len = moveX - startX;
    var dY = moveY - startY;

    //console.log("len = " + len + "dY = " + dY);

    len = len * -1;   // 为了矫正方向

    len = len / 10;   // 为了减速

    if (marquePic1.offsetWidth - middle_space_work.scrollLeft <= 0) {

        middle_space_work.scrollLeft = 0;

    } else {

        middle_space_work.scrollLeft = middle_space_work.scrollLeft + len;

        // 如果最近一次的向右滑动，图片滑动到了左边的边缘，重置一下
        if (middle_space_work.scrollLeft <= 0) {
            middle_space_work.scrollLeft = realWidth - 2; // 目的是为了能继续向右滑动
        }

        // 如果最近一次的向左滑动，图片滑动到了右边的边缘，重置一下
        if (middle_space_work.scrollLeft >= marquePic1.offsetWidth) {
            middle_space_work.scrollLeft = 0; // 目的是为了能继续向左滑动
        }
    }

}
// 滑动结束事件处理
var endHandler = function (event) {

}
middle_space_work.addEventListener("touchstart", startHandler, false);
middle_space_work.addEventListener("touchmove", moveHandler, false);
middle_space_work.addEventListener("touchend", endHandler, false);
