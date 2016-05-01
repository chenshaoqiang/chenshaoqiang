/*自适应设备调整根字体大小*/
var desW=320;//设计稿的宽度
var desH=568;
var main=document.getElementById("main");
var winW=document.documentElement.clientWidth;//设备的实际宽度
var winH=document.documentElement.clientHeight;//设备的实际高度
var scale=320/100;
document.documentElement.style.fontSize=winW/scale+"px";

/*-----------*/
console.log("当前设备宽度是："+winW
    +"当前设备高度是:"+winH+"根字体大小是:"+winW/scale+"px");
/*-----------*/
