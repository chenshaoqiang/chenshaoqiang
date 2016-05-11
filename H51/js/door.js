(function(){
    var doorBg1 = document.getElementById("doorOfBody_flag1");//外面的门
    var doorBgLeft1 = document.getElementById("doorOfBody_flag_left1");//外面的左门
    var doorBgRight1 = document.getElementById("doorOfBody_flag_right1");//外面的右门
    var doorBg2 = document.getElementById("doorOfBody_flag2");//里、正面的门
    var doorBgLeft2 = document.getElementById("doorOfBody_flag_left2");//里、正面的左门
    var doorBgRight2 = document.getElementById("doorOfBody_flag_right2");//里、正面右门
    var wrapBox = document.getElementById("wrapBox");//整体
    var box = document.getElementById("box");//整体的3D盒子
    var box1 = document.getElementById("box1");//正面的墙
    var box2 = document.getElementById("box2");//里、正面的墙
    var box3 = document.getElementById("box3");//里、右侧的墙
    var box4 = document.getElementById("box4");//里、左侧的墙
    /*----------事件列表-----------*/
    doorBg1.addEventListener("touchstart", start1, false);
    doorBg1.addEventListener("touchend", end1, false);

    doorBg2.addEventListener("touchstart", start5, false);
    doorBg2.addEventListener("touchend", end5, false);

    box4.addEventListener("touchstart", start2, false);
    box4.addEventListener("touchend", end2, false);

    box3.addEventListener("touchstart", start3, false);
    box3.addEventListener("touchend", end3, false);

    box2.addEventListener("touchstart", start4, false);
    box2.addEventListener("touchend", end4, false);

    /*-------两扇门的事件---------*/
    function start1(ev) {
        console.log("点到外门了");
        window.clearInterval(doorBg1.timer);
        ev.preventDefault();
    }
    function end1(ev) {
        console.log("没点外门了");
        doorBg1.timer = window.setTimeout(function () {
            box1.style.display = "none";
        }, 3000);
        doorBgLeft1.style.webkitTransformOrigin = "left";
        doorBgLeft1.style.webkitTransform = "rotateY(90deg)";
        doorBgLeft1.style.webkitTransition = "4s";
        doorBgRight1.style.webkitTransformOrigin = "right";
        doorBgRight1.style.webkitTransform = "rotateY(-90deg)";
        doorBgRight1.style.webkitTransition = "4s";
    }
    /*---------里面正面的门-----------*/
    function start5(ev) {
        console.log("点到里门了");
        clearInterval(doorBg2.timer);
        ev.preventDefault();
    }
    function end5(ev) {
        console.log("没点里门了");
        //里面开门之后的墙面

        var doorOfTop_box = document.getElementById("doorOfTop_box");
        var faceToFaceDoor = document.getElementById("faceToFaceDoor");
        doorBg2.timer = window.setTimeout(function () {
            doorOfTop_box.style.display = "none";
            faceToFaceDoor.style.display = "block";
        }, 2000);
        doorBgLeft2.style.webkitTransformOrigin = "left";
        doorBgLeft2.style.webkitTransform = "rotateY(90deg)";
        doorBgLeft2.style.webkitTransition = "2s";
        doorBgRight2.style.webkitTransformOrigin = "right";
        doorBgRight2.style.webkitTransform = "rotateY(-90deg)";
        doorBgRight2.style.webkitTransition = "2s";

    }
    /*---------左侧墙的事件---------*/
    function start2(ev) {
        console.log("点到左边的墙了");
        box.style.webkitTransformOrigin = "left";
        clearInterval(box4.timer);
        ev.preventDefault();
    }
    var outerHouseBg2 = document.getElementById("outerHouse");//房子里蒙板图标
//outerHouseBg2.style.webkitTransform = "translateZ(-3.2rem) translateY(3rem)";

    function end2(ev) {
        console.log("离开左边的墙了");
        if (box3.style.display == "none") {
            box.style.webkitTransform = "rotateY(0deg)";
            box.style.webkitTransition = "4s";
            outerHouseBg2.style.webkitTransformOrigin = "6.3rem 0 0";
            outerHouseBg2.style.webkitTransform = "translateZ(-3.2rem) translateY(3rem) rotateY(0deg)";
            outerHouseBg2.webkitTransition = "20s";
            box4.timer = window.setTimeout(function () {
                box3.style.display = "block";
            }, 100);
        } else {
            box.style.webkitTransform = "rotateY(-90deg)";
            box.style.webkitTransition = "4s";
            outerHouseBg2.style.webkitTransformOrigin = "6.3rem 0 0";
            outerHouseBg2.style.webkitTransform = "translateZ(-3.2rem) translateY(3rem) rotateY(-90deg)";
            outerHouseBg2.webkitTransition = "20s";
            box4.timer = window.setTimeout(function () {
                box3.style.display = "none";
            }, 1000);
        }
    }
    /*----------右侧墙的事件----------*/
    function start3(ev) {
        console.log("点到右边的墙了");
        box.style.webkitTransformOrigin = "right";
        clearInterval(box3.timer);
        ev.preventDefault();
    }
    function end3(ev) {
        console.log("离开右边的墙了");
        if (box4.style.display == "none") {
            box.style.webkitTransform = "rotateY(0deg)";
            box.style.webkitTransition = "3s";

            outerHouseBg2.style.webkitTransformOrigin = "-6.3rem 0 0";
            outerHouseBg2.style.webkitTransform = "translateZ(-3.2rem) translateY(3rem) rotateY(0deg)";
            outerHouseBg2.webkitTransition = "4s";
            box3.timer = window.setTimeout(function () {
                box4.style.display = "block";
            }, 100);
        } else {
            box.style.webkitTransform = "rotateY(90deg)";
            box.style.webkitTransition = "3s";

            outerHouseBg2.style.webkitTransformOrigin = "-6.3rem 0 0";
            outerHouseBg2.style.webkitTransform = "translateZ(-3.2rem) translateY(3rem) rotateY(90deg)";
            outerHouseBg2.webkitTransition = "4s";
            box3.timer = window.setTimeout(function () {
                box4.style.display = "none";
            }, 1000);
        }
    }
    /*-----------里，正面墙壁的事件-----------*/
    function start4(ev) {
        console.log("点到里面正面的墙了");
        clearInterval(box2.timer);
        ev.preventDefault();
    }
    function end4(ev) {
        console.log("离开里面正面的墙了");
        box.style.webkitTransform = "translateZ(3.2rem)";
        box.style.webkitTransition = "3s";
        box2.timer = window.setTimeout(function () {
            box2.style.webkitTransform = "translateZ(3.21rem)";
            box2.style.opacity = 1;
        }, 3000);

    }
})();