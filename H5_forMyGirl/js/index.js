var main = document.getElementById("main");
var desW = 320;//
var winW = document.documentElement.clientWidth;//
var winH = document.documentElement.clientHeight;//
var scale = 320 / 100;
var fontsize = document.documentElement.style.fontSize = winW / scale + "px";
main.style.height = winH/(winW / scale)+"rem";
console.log(main.style.height,fontsize);

var background_img1=document.getElementById("background_img1");
var firstpage_green=document.getElementById("firstpage_green");
var background=document.getElementById("background");
var wrap=document.getElementById("wrap");
var list=document.getElementById("list");
var background_p1=document.getElementById("background_p1");
var opa=getComputedStyle(firstpage_green,null);
firstpage_green.timer=window.setInterval(function(){
        //console.log("11111");
        background_img1.style.display="block";
        clearInterval(firstpage_green.timer);
},10000);
background_img1.addEventListener("touchstart", start1, false);
background_img1.addEventListener("touchend", end1, false);
function start1(ev){}
function end1(ev){
    var bgWidth=getComputedStyle(background,null).width;
    var imgWidth=getComputedStyle(background_img1,null).width;
    if(imgWidth<bgWidth){
        utils.addClass(background_img1,"select");
        background_p1.timer=window.setTimeout(function(){
            background_p1.style.display="block";
        },300);
        console.log(imgWidth,bgWidth);
    }else if(imgWidth==bgWidth){
        list.style.display="block";
    }
}















