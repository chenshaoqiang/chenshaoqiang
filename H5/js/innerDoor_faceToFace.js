/*--------上下滑动模块---------*/

var main = document.getElementById("faceToFaceDoor");
var sourceW = 320;
var sourceH = 568;
var winW = document.documentElement.clientWidth;
var winH = document.documentElement.clientHeight;

var oLis = document.querySelectorAll("#list>li");
//console.log(oLis);
[].forEach.call(oLis, function () {
    var oLi = arguments[0];
    oLi.index = arguments[1];
    oLi.addEventListener("touchstart", start, false);
    oLi.addEventListener("touchmove", move, false);
    oLi.addEventListener("touchend", end, false);
});

function start(ev) {
    this.startX = ev.changedTouches[0].pageX;
    this.startY = ev.changedTouches[0].pageY;
    console.log("点到了", "X:" + this.startX, "Y:" + this.startY);
}

function move(ev) {

    ev.preventDefault();
    var nowIndex = this.index;
    var step = 1 / 4;
    var touchX = ev.changedTouches[0].pageX;
    var touchY = ev.changedTouches[0].pageY;
    var changeX = touchX - this.startX;
    var changeY = touchY - this.startY;
    this.flag = true;
    //横向移动则不变
    if (Math.abs(changeX) > Math.abs(changeY)) {
        console.log("横向滑动，不改变");
        this.flag = false;
        return;
    }
    [].forEach.call(oLis, function () {
        if (nowIndex != arguments[1]) {
            arguments[0].style.display = "none";
        }
        arguments[0].className = "";
    });
    if (changeY < 0) {//向上
        this.nextIndex = nowIndex == oLis.length - 1 ? 0 : nowIndex + 1;
        oLis[this.nextIndex].style.webkitTransform = "translate(0," + (winH + changeY) + "px)";
        console.log("在向上移动", "Y改变：" + changeY, "下一张：" + this.nextIndex);
    } else if ((changeY > 0)) {//向下
        this.nextIndex = nowIndex == 0 ? oLis.length - 1 : nowIndex - 1;
        oLis[this.nextIndex].style.webkitTransform = "translate(0," + (-winH + changeY) + "px)";
        console.log("在向下移动", "Y改变：" + changeY, "下一张：" + this.nextIndex);
    }
    oLis[this.nextIndex].className = "zIndex";
    oLis[this.nextIndex].style.display = "block";
    this.style.webkitTransform = "scale(" + (1 - Math.abs(changeY / winH) * step ) + ") translate(0," + changeY + "px)";

}

function end(ev) {
    console.log("离开屏幕啦");
    if (this.flag) {
        oLis[this.nextIndex].style.webkitTransform = "translate(0,0)";
        oLis[this.nextIndex].style.webkitTransition = "0.5s";
        oLis[this.nextIndex].addEventListener("webkitTransitionEnd", function () {
            this.style.webkitTransition = "";
        }, false);
        this.flag = false;
    }
}