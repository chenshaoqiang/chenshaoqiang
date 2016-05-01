var messageTab=document.getElementById("message_tab");

var docEle = document.getElementsByTagName("body")[0];
EventUtil.addHandler(docEle, "click", function (e) {
    var event = EventUtil.getEvent(e);
    var target = EventUtil.getTarget(event);
    if (target.id == "top_index_message_a"){
        if(messageTab.style.display=="block"){
            messageTab.style.display="none";
        }else{
            messageTab.style.display="block";
        }
    }else if(target.id != "top_index_message_a"){
        messageTab.style.display="none";
    }
});

var oUl = document.getElementById("message_tab_real_top");
var oLis = oUl.getElementsByTagName("div");
for (var i = 0; i < oLis.length; i++) {
    oLis[i].onmouseenter = changetab;
}

function changetab() {
    var olis = childrens(this.parentNode, "div");
    var oDivs = childrens(getNextEle(this.parentNode), "div");
    var n = getIndex(this);
    for (var i = 0; i < olis.length; i++) {
        olis[i].className = "";
        oDivs[i].className = "";
    }
    this.className = "message_tab_real_li";
    oDivs[n].className = "message_tab_real_mid_tab";
    function getIndex(ele) {
        var index = 0;
        var prev = ele.previousSibling;
        while (prev) {
            if (prev && prev.nodeType === 1) {
                index++;
            }
            prev = prev.previousSibling;
        }
        return index;
    }
}
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
}