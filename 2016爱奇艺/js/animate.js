function animate(ele, obj, duration, callback) {
    var oBegin = {};
    var oChang = {};
    var flag = 0;
    for (var attr in obj) {
        var target = obj[attr];
        var begin = animate.getCss(ele, attr);
        var change = target - begin;
        if (change) {
            oBegin[attr] = begin;
            oChang[attr] = change;
            flag++;
        }
    }
    if (flag === 0) {
        return;
    }
    var times = 0;
    var interval = 15;
    clearInterval(ele.timer);
    function step() {
        times += interval;
        if (times < duration) {
            for (var attr in oChang) {
                var chang = oChang[attr];
                var begin = oBegin[attr];
                var val = times / duration * chang + begin;
                animate.setCss(ele, attr, val);
            }
        } else {
            for (var attr in oChang) {
                animate.setCss(ele, attr, obj[attr]);
            }
            clearInterval(ele.timer);
            ele.timer = null;
            if (typeof callback == "function") {
                callback.call(ele);
            }
        }
    }

    ele.timer = window.setInterval(step, interval);
}

animate.getCss = function (ele, attr) {
    if (window.getComputedStyle) {
        return parseFloat(getComputedStyle(ele, null)[attr]);
    }
    if (attr == "opacity") {
        var value = ele.currentStyle.filter;
        value = value.replace(/ +/g, "");
        var reg = /alpha\(opacity=(\d+(\.\d+)?)\)/;
        if (reg.test(value)) {
            return RegExp.$1 / 100;
        } else {
            return 1;
        }
    }
    return parseFloat(ele.currentStyle[attr]);
};
animate.setCss = function (ele, attr, value) {
    if (attr == "opacity") {
        ele.style.opacity = value;
        ele.style.filter = "alpha(opacity=" + value * 100 + ")";
    } else {
        ele.style[attr] = value + "px";
    }
};

var twoButton = document.getElementById("auto_button").getElementsByTagName("div");
var autoBox = document.getElementById("auto_pic_box");
var autoImage1 = autoBox.getElementsByTagName("div")[0];
var newImg = autoBox.appendChild(autoImage1.cloneNode(true));
autoBox.style.width = autoBox.offsetWidth + autoImage1.offsetWidth + "px";
for (var i = 0; i < twoButton.length; i++) {
    clearInterval(autoTimer);
    twoButton.item(i).n = i;
    twoButton.item(i).onclick = function () {
        animate(autoBox, {left: this.n * -380}, 10);
        step = this.n;
        clearTimeout(autoTimer);
        autoTimer = window.setTimeout(function () {
            autoTimer = window.setInterval(autoMove, 5000);
        }, 3000);
    }
}
var step = 0;
function autoMove() {
    step++;
    if (step >= 3) {
        autoBox.style.left = 0;
        step = 1;
    }

    animate(autoBox, {left: step * -380}, 10);
}
var autoTimer = window.setInterval(autoMove, 8000);
auto_pic_left.onclick = function () {
    clearInterval(autoTimer);
    step--;
    if (step < 0) {
        autoBox.style.left = "-760px";
        step = 2;
    }
    animate(autoBox, {"left": step * (-380)}, 10);
    autoTimer = window.setInterval(autoMove, 8000);
};
auto_pic_right.onclick = function () {
    clearInterval(autoTimer);
    step++;
    if (step == 3) {
        autoBox.style.left = 0;
        step = 1;
    }
    animate(autoBox, {"left": step * (-380)}, 10);
    autoTimer = window.setInterval(autoMove, 8000);
};

