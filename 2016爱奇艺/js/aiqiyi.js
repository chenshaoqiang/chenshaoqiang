function animate(){
    var list=document.getElementById("list");
    var change=document.getElementById("change");
    var oAs=list.getElementsByTagName("a");
    var otherAs=change.getElementsByTagName("a");
    for(var i=0;i<oAs.length;i++){
        oAs[i].index=i;
        oAs[i].onmouseover=function(){
            window.clearInterval(list.timer);
            changeTab(this.index);
        }
        oAs[i].onmouseout=function(){
            list.timer=window.setTimeout(function(){nextAnimate(animate())},2000);
        }
    }
    function changeTab(index){
        for(var i=0;i<oAs.length;i++){
            DOM.removeClass(oAs[i],"selectLi");
            DOM.removeClass(otherAs[i],"selectTab");
        }
        DOM.addClass(oAs[index],"selectLi");
        DOM.addClass(otherAs[index],"selectTab");
    }
    var reg=/(^| +)selectLi( +|$)/;
    for(var i=0;i<oAs.length;i++) {
        if (reg.test(oAs[i].className)) {
            return i;
        }
    }
}
animate();
function nextAnimate(i){
    var interval=2000;
    var list=document.getElementById("list");
    window.clearInterval(list.timer);
    function step(){
        var change=document.getElementById("change");
        var oAs=list.getElementsByTagName("a");
        var otherAs=change.getElementsByTagName("a");
        DOM.removeClass(oAs[i],"selectLi");
        DOM.removeClass(otherAs[i],"selectTab");
        i++;
        if(i>9){
            i=0;
        }
        DOM.addClass(oAs[i],"selectLi");
        DOM.addClass(otherAs[i],"selectTab");
    }
    list.timer=window.setInterval(step,interval);
}
nextAnimate(animate());
function pull_menu(){
    var input=document.getElementsByTagName("form")[0].getElementsByTagName("input")[0];
    var top=document.getElementById("top");
    var pull_down=DOM.getElesByClass("pull-down",top)[0];
    document.body.onclick=function(e){
        e=e||window.event;
        target= e.target|| e.srcElement;
        if(target.tagName=="INPUT"){
            pull_down.style.display="block";
            pull_down.style.zIndex=1;
        }else{
            pull_down.style.display="none";
        }
    }
}
pull_menu();
;(function(){
    var content=document.getElementById("content");
    var pointM=DOM.getElesByClass("pointM",content)[0];
    var oLis=DOM.getElesByClass("middleTop",pointM);
    var clickLs=DOM.getElesByClass("middleTopBg_3",pointM);
    var clickRs=DOM.getElesByClass("middleTopBg_4",pointM);
    for(var i=0;i<clickLs.length;i++){
        clickLs[i].onclick=function(){
            clearInterval(oLis.timer);
            for(var i=0;i<clickLs.length;i++){
                if(clickLs[i]!=this){
                    clickLs[i].parentNode.parentNode.style.display="block";
                }else{
                    this.parentNode.parentNode.style.display="none";
                }
            }
            oLis.timer=window.setInterval(animate,3000);
        };
        clickRs[i].onclick=function(){
            clearInterval(oLis.timer);
            for(var i=0;i<clickRs.length;i++){
                if(clickRs[i]!=this){
                    clickRs[i].parentNode.parentNode.style.display="block";
                }else{
                    this.parentNode.parentNode.style.display="none";
                }
            }
            oLis.timer=window.setInterval(animate,3000);
        }
    }

    function animate(){
        var i = 0;
        if (oLis[i].style.display == "block") {
            oLis[i].style.display = "none";
            i++;
            oLis[i].style.display='block';
        } else{
            oLis[i].style.display='block';
            i++;
            oLis[i].style.display = "none";
        }
    }
    oLis.timer = window.setInterval(animate, 3000);
})();