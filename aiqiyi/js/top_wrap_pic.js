var curIndex = 0;
function animate() {
    var list = document.getElementById("top_wrap_pic_list");
    var oAs = list.getElementsByTagName("a");
    var oDiv = document.getElementById("top_wrap_pic_tab");
    var otherAs = oDiv.getElementsByTagName("div");
    for (var i = 0; i < oAs.length; i++) {
        oAs[i].index = i;
        oAs[i].onmouseover = function () {
            window.clearInterval(list.timer);
            changeTab(this.index);
            aaa = this.index;
        };
        oAs[i].onmouseout = function () {
            list.timer = window.setInterval(function () {
                    nextAnimate(curIndex);
                }, 2000);
        }
    }
    function changeTab(index) {
        for (var i = 0; i < oAs.length; i++) {
            utils.removeClass(oAs[i], "top_wrap_pic_select");
            utils.removeClass(otherAs[i], "top_wrap_pic_select");
        }
        utils.addClass(oAs[index], "top_wrap_pic_select");
        utils.addClass(otherAs[index], "top_wrap_pic_select");
    }
    var reg = /(^| +)top_wrap_pic_select( +|$)/;
    for (var i = 0; i < oAs.length; i++) {
        if (reg.test(oAs[i].className)) {
            return i;
        }
    }
}
animate();
function nextAnimate(i) {
    var interval = 2000;
    var list = document.getElementById("top_wrap_pic_list");
    window.clearInterval(list.timer);
    function step() {
        var oDiv = document.getElementById("top_wrap_pic_tab");
        var otherAs = oDiv.getElementsByTagName("div");
        var oAs = list.getElementsByTagName("a");
        utils.removeClass(oAs[i], "top_wrap_pic_select");
        utils.removeClass(otherAs[i], "top_wrap_pic_select");
        i++;
        if (i > 9) {
            i = 0;
        }
        utils.addClass(oAs[i], "top_wrap_pic_select");
        utils.addClass(otherAs[i], "top_wrap_pic_select");
    }

    list.timer = window.setInterval(step, interval);
}
nextAnimate(animate());

/*
 *搜索按钮：如果是Ie浏览器下则使用图片图标
 * */

var butImgForIe = document.getElementById("btn_forIE");
if (navigator.userAgent.indexOf('MSIE') >= 0) {
    butImgForIe.style.display = "block";
}
