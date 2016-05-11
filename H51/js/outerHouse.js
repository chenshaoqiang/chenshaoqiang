(function(){
    var outerHouse = document.getElementById("outerHouse");//整个页面的控制开关
    var outerHouseBgHouse = document.getElementById("outerHouseBg_house");//房子图标
    var outerHouseBg2 = document.getElementById("outerHouseBg2");//房子里蒙板图标
    var outerHouseBg1 = document.getElementById("outerHouseBg1");//草地背景
    /*-------------*/
    var font_beforeAll = document.getElementById("font_beforeAll");
    var hammerIcon = document.getElementById("hammerIcon");//锤子
    var littleMan1 = document.getElementById("littleMan1");//睡的孩子
    var littleMan2 = document.getElementById("littleMan2");//站的孩子
    var speakBox = document.getElementById("speakBox");//对话框整体
    var speakBox_say3 = document.getElementById("speakBox_say3");//对话框3
    var speakBox_say2 = document.getElementById("speakBox_say2");//对话框3
    var speakBox_say1 = document.getElementById("speakBox_say1");//对话框3
    var contrlDiplay = document.getElementById("contrlDiplay");//控制人和对话框的显示的盒子
    //var wrapBox = document.getElementById("wrapBox");//整体3D
    /*------------------*/
    var talk = document.getElementById("talk");//自言自语
    var talk_say3 = document.getElementById("talk_say3");//自言自语
    var talk_say2 = document.getElementById("talk_say2");//自言自语
    var talk_say3_p1 = document.getElementById("talk_say3_p1");//自言自语
    var talk_say3_p2 = document.getElementById("talk_say3_p2");//自言自语
    /*----------房子图标触发事件列表-----------*/
    outerHouseBgHouse.addEventListener("touchstart", HouseStart, false);
    outerHouseBgHouse.addEventListener("touchend", HouseEnd, false);
    hammerIcon.addEventListener("touchstart", hammerStart, false);
    hammerIcon.addEventListener("touchend", hammerEnd, false);
    /*-----------------*/
    function HouseStart(ev) {
        console.log("点击了房子");
        ev.preventDefault();
        clearInterval(outerHouseBg2.timer);
        if(hammerIcon.style.display=="none"){
            outerHouseBgHouse.style.opacity=1;//小房子变清晰
            contrlDiplay.style.display="none";//人和对话框消失
            clearInterval(speakBox_say2.timer);//清除一个个定时器
            clearInterval(speakBox_say1.timer);
            clearInterval(speakBox.timer);

        }else{
            console.log("点击了房子,但锤子还在哦");
        }
    }
    function HouseEnd(ev) {
        console.log("点击了房子后");
        if(hammerIcon.style.display=="none"){
            outerHouseBg2.style.webkitTransform = "translateZ(3rem) translateX(-.9rem) translateY(1rem)";
            outerHouseBg2.style.webkitTransition = "3s";
            outerHouseBg1.style.opacity=1;
            font_beforeAll.style.display="none";
            outerHouseBg2.timer = window.setTimeout(function () {
                outerHouseBgHouse.style.display="none";
                wrapBox.style.display="block";
                outerHouseBg2.style.webkitTransform = "translateZ(-3.2rem) translateY(3rem)";
            }, 3000);

        }else{
            console.log("点击了房子,但锤子还在哦");
        }
    }
    /*-----------------*/
    function hammerStart(ev) {
        console.log("点击了锤子");
        clearInterval(hammerIcon.timer);
        ev.preventDefault();
    }
    function hammerEnd(ev) {
        console.log("点击了锤子后");
        if(talk_say3_p2.style.display=="block"){
            talk.style.display="none";
            utils.addClass(hammerIcon,"hammer");
            hammerIcon.timer = window.setTimeout(function(){
                utils.removeClass(hammerIcon,"hammer");
                hammerIcon.style.display="none";
                /*锤子消失后，睡着的孩子也要隐藏*/
                littleMan1.style.display="none";
                littleMan2.style.display="block";
                speakBox.style.display="block";
                speakBox.timer=window.setTimeout(function(){
                    speakBox_say1.style.display="block";
                    speakBox_say1.timer=window.setTimeout(function(){
                        speakBox_say2.style.display="block";
                        speakBox_say2.timer=window.setTimeout(function(){
                            speakBox_say3.style.display="block";
                        },300);
                    },600);
                },600);
            },1000);
        }else{
            console.log("对话还没完成");
        }
    }
    /*-------------------------*/

    talk_say2.timer= window.setTimeout(function(){
        talk_say2.style.display="block";
        talk_say3.timer= window.setTimeout(function(){
            talk_say3.style.display="block";
            talk_say3_p1.style.display="block";
            talk_say3_p1.timer= window.setTimeout(function(){
                talk_say3_p1.style.display="none";
                talk_say3_p2.style.display="block";
            },3000);
        },500);
    },1000);
})();