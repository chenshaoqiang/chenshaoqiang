/*自适应设备调整根字体大小*/
var desW=640;//设计稿的宽度
var winW=document.documentElement.clientWidth;//设备的实际宽度
var scale=640/100;
document.documentElement.style.fontSize=winW/scale+"px";

