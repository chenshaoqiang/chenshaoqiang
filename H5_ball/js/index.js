var main = document.getElementById("main");
var desW = 640;//设计稿的宽度
var winW = document.documentElement.clientWidth;//设备的实际宽度
var winH = document.documentElement.clientHeight;//设备的实际宽度
var scale = 640 / 100;
var fontsize = document.documentElement.style.fontSize = winW / scale + "px";
main.style.height = winH/(winW / scale)+"rem";
console.log(main.style.height,fontsize);
