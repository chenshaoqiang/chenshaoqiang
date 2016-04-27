
var list = document.getElementById("top_wrap_pic_list");
var oAs = list.getElementsByTagName("a");
var oDiv = document.getElementById("top_wrap_pic_tab");
var otherAs = oDiv.getElementsByTagName("div");

function animate(){
    for(var i=0;i<oAs.length;i++){
        oAs[i].index=i;
        oAs[i].onmouseover=function(){
            window.clearInterval(list.timer);
            changeTab(this.index);
        };
        oAs[i].onmouseout=function(){
            list.timer=window.setTimeout(function(){
                nextAnimate(animate())
            },2000);
        }
    }
    function changeTab(index){
        for(var i=0;i<oAs.length;i++){
            utils.removeClass(oAs[i],"top_wrap_pic_select");
            utils.removeClass(otherAs[i],"top_wrap_pic_select");
        }
        utils.addClass(oAs[index],"top_wrap_pic_select");
        utils.addClass(otherAs[index],"top_wrap_pic_select");
    }
    var reg=/(^| +)top_wrap_pic_select( +|$)/;
    for(var i=0;i<oAs.length;i++) {
        if (reg.test(oAs[i].className)) {
            return i;
        }
    }
}
animate();
function nextAnimate(i){
    var interval=2000;
    window.clearInterval(list.timer);
    function step(){
        utils.removeClass(oAs[i],"top_wrap_pic_select");
        utils.removeClass(otherAs[i],"top_wrap_pic_select");
        i++;
        if(i>9){
            i=0;
        }
        utils.addClass(oAs[i],"top_wrap_pic_select");
        utils.addClass(otherAs[i],"top_wrap_pic_select");
    }
    list.timer=window.setInterval(step,interval);
}
nextAnimate(animate());
/*function changetab() {
    for (var i = 0; i < oLis.length; i++) {
        oLis[i].index = i;
        oLis[i].onmouseover = function () {
            //window.clearInterval(oUl.timer);
            change(this.index);
        };
      /!*  oLis[i].onmouseout = function () {
            oUl.timer = window.setTimeout(function () {
                autoMove(changetab());
            }, 2000);
        }*!/
    }
    function change(dex) {
        console.log(oLis);
        for (var i = 0; i < oLis.length; i++) {
            oLis[i].className = "";
            oDivs[i].className = "";
        }
        oLis[dex].className = "top_wrap_pic_select";
        oDivs[dex].className = "top_wrap_pic_select";
    }

    var reg = /(^| +)top_wrap_pic_select( +|$)/;
    for (var i = 0; i < oLis.length; i++) {
        //得到当前显示的那项
        if (reg.test(oLis[i].className)) {
            return i;
        }
    }
}
changetab();
function autoMove(i) {
    window.clearInterval(oUl.timer);
    function steps() {
        var step = i;
        oLis[step].className = "";
        oDivs[step].className = "";
        step++;
        if (step > 9) {
            step = 0;
        }
        oLis[step].className = "top_wrap_pic_select";
        oDivs[step].className = "top_wrap_pic_select";
    }

    oUl.timer = window.setInterval(steps, 2000);
}
autoMove(changetab());
function getNextEle(ele) {
    if (ele.nextElementSibling) {
        return ele.nextElementSibling;
    }
    var next = ele.nextSibling;
    while (next) {
        if (next.nodeType === 1) {
            return next;
        }
        next = next.nextSibling;
    }
    return null;
}
function previousElement(ele) {
    if (typeof ele.previousElementSibling == "object") {
        return ele.previousElementSibling;
    }
    var pre = ele.previousSibling;
    while (pre) {
        if (pre.nodeType === 1) {
            return pre;
        }
        pre = ele.previousSibling;
    }
    return null;
}
function childrens(parent, str) {
    var arr = [];
    var childNodes = parent.childNodes;
    if (parent && parent.nodeType === 1) {
        if (str && typeof str == "string") {
            for (var i = 0; i < childNodes.length; i++) {
                if (childNodes[i].nodeType === 1 && childNodes[i].tagName == str.toUpperCase()) {
                    arr.push(childNodes[i]);
                }
            }
            return arr;
        } else {
            for (var j = 0; j < childNodes.length; j++) {
                if (childNodes[j].nodeType === 1) {
                    arr.push(childNodes[j]);
                }
            }
            return arr;
        }
    } else {
        console.log("argumentts error!");
    }
}*/
/*
 *搜索按钮：如果是Ie浏览器下则使用图片图标
 * */

var butImgForIe = document.getElementById("btn_forIE");
if (navigator.userAgent.indexOf('MSIE') >= 0) {
    butImgForIe.style.display = "block";
}
