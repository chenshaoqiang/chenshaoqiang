var main = document.getElementById("main");
var desW = 640;//��Ƹ�Ŀ��
var winW = document.documentElement.clientWidth;//�豸��ʵ�ʿ��
var winH = document.documentElement.clientHeight;//�豸��ʵ�ʿ��
var scale = 640 / 100;
var fontsize = document.documentElement.style.fontSize = winW / scale + "px";
main.style.height = winH/(winW / scale)+"rem";
console.log(main.style.height,fontsize);
