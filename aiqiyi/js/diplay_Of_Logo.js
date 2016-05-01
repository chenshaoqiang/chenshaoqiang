
var docEle = document.getElementsByTagName("body")[0];
var topWrapLogo = document.getElementById("top_wrap_logo");
/*-------------导航栏的相关元素获取-----------------*/
var logoImag = document.getElementById("top_wrap_logo_LOG_Img");
var logoImagBg = document.getElementById("top_wrap_logo_LOG");
var bottomListCopy = document.getElementById("top_wrap_bottomList_copy");

/*导航栏弹出*/
EventUtil.addHandler(docEle, "click", function (e) {
    var event = EventUtil.getEvent(e);
    var target = EventUtil.getTarget(event);
    var reg1 = /imags\/log1.png/;
    var reg2 = /imags\/log2.png/;
    if (target == logoImag) {
        if (reg1.test(logoImag.src)) {
            logoImag.src = "imags/log2.png";
            logoImagBg.style.background = "#171717";
            bottomListCopy.style.display = "block";
        } else if (reg2.test(logoImag.src)) {
            logoImag.src = "imags/log1.png";
            logoImagBg.style.background = "#101010";
            bottomListCopy.style.display = "none";
        }
    }else{
        logoImag.src = "imags/log1.png";
        logoImagBg.style.background = "#101010";
        bottomListCopy.style.display = "none";
    }
});

var winScoTop=docEle.scrollTop;
docEle.onscroll=function(e){
    winScoTop=docEle.scrollTop;
    console.log(winScoTop,typeof winScoTop);
    if(winScoTop>580){
        logoImagBg.style.display = "block";
        topWrapLogo.style.position="fixed";
        topWrapLogo.style.left=0;
        topWrapLogo.style.top=0;
        topWrapLogo.style.zIndex=1000;
    }else{
        topWrapLogo.style.position="";
        logoImagBg.style.display = "none";
        bottomListCopy.style.display = "none";

        logoImag.src = "imags/log1.png";
        logoImagBg.style.background = "#101010";
    }
};