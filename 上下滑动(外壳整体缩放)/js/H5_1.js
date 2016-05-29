var main = document.getElementById("main");
var sourceW = 640;//设计稿
var sourceH = 960;
var winW = document.documentElement.clientWidth;
var winH = document.documentElement.clientHeight;
//console.log(window.devicePixelRatio);//这个可以获取dpr的值
if ((winW / winH) < (sourceW / sourceH)) {//如果高比较大，拿高来适应
    main.style.webkitTransform = "scale(" + (winH / sourceH) + ")";
} else {//如果宽比较大，拿宽来适应
    main.style.webkitTransform = "scale(" + (winW / sourceW) + ")";
}
var oLis = document.getElementById("list").getElementsByTagName("li");
//console.log(oLis);
[].forEach.call(oLis, function () {
    var oLi = arguments[0];
    oLi.index = arguments[1];
    //console.log(oLi,oLi.index);
    oLi.addEventListener("touchstart", start, false);
    oLi.addEventListener("touchmove", move, false);
    oLi.addEventListener("touchend", end, false);
});

function start(ev) {
    //console.log("碰到了");
    this.startX = ev.changedTouches[0].pageX;
    this.startY = ev.changedTouches[0].pageY;
    //console.log(startY,startX);
}
function move(ev) {
    //console.log("在移动");
    ev.preventDefault();
    var touchY = ev.changedTouches[0].pageY;
    var touchX = ev.changedTouches[0].pageX;
    var changeY = touchY - this.startY;
    var changeX = touchX - this.startX;
    var nowIndex = this.index;
    var step = 1 / 4;

    this.flag = true;/*表示滑动而不是点击*/
    //记录下移动的时候的触摸点的坐标
    if(Math.abs(changeX)>Math.abs(changeY)){
        this.flag = false;
        console.log(changeX,changeY,nowIndex);
        return;
    }
    [].forEach.call(oLis,function(){
        //除了自己其他所有的隐藏(通过索引来判断当前这张是不是自己)
        if(nowIndex != arguments[1]){
            arguments[0].style.display = "none";
        }
        arguments[0].className = "";
        //arguments[0].firstElementChild.id = "";
    });
    if (changeY < 0) {//小于0说明是向上移动
        this.nextIndex = nowIndex == oLis.length - 1 ? 0 : nowIndex + 1;
        var duration=winH + changeY;
        oLis[this.nextIndex].style.webkitTransform = "translate(0," + duration + "px)";
    } else if((changeY > 0)){
        var duration=-winH + changeY;
        this.nextIndex = nowIndex == 0 ? oLis.length - 1 : nowIndex - 1;
        oLis[this.nextIndex].style.webkitTransform = "translate(0," + duration + "px)";
    }
    oLis[this.nextIndex].className = "zIndex";
    oLis[this.nextIndex].style.display = "block";
    this.style.webkitTransform = "scale(" + (1 - Math.abs(changeY / winH)* step ) + ") translate(0," + changeY + "px)";

}
function end(ev) {
    //console.log("离开屏幕了");
    if(this.flag){
        //让上一张或者下一张都回到0,0的位置
        oLis[this.nextIndex].style.webkitTransform = "translate(0,0)";
        oLis[this.nextIndex].style.webkitTransition = "0.5s";
        oLis[this.nextIndex].addEventListener("webkitTransitionEnd",function(){
            this.style.webkitTransition = "";
            //增加执行动画的id名
            //this.firstElementChild.id = "a"+this.index;

        },false);
        this.flag = false;
    }

}