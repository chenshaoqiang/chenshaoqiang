/*自适应设备调整根字体大小*/
var desW=320;//设计稿的宽度
var winW=document.documentElement.clientWidth;//设备的实际宽度
var winH=document.documentElement.clientHeight;//设备的实际高度
var main=document.getElementById("main");
var scale=320/100;
var allFontSize=document.documentElement.style.fontSize=winW/scale+"px";;
main.style.height=winH/(winW/scale)+"rem";
console.log(allFontSize,main.style.height);
