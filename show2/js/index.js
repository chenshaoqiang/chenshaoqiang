$(document).ready(function () {

    var TRANSITION = 'transition';
    var TRANSITION_END = 'transitionend';
    var TRANSFORM = 'transform';
    var TRANSFORM_PROPERTY = 'transform';
    var TRANSITION_PROPERTY = 'transition';

    if (typeof document.body.style.webkitTransform !== undefined) {
        TRANSFORM = 'webkitTransform';
        TRANSITION = 'webkitTransition';
        TRANSITION_END = 'webkitTransitionEnd';
        TRANSFORM_PROPERTY = '-webkit-transform';
        TRANSITION_PROPERTY = '-webkit-transition';
    }
    var distance = {};
    var origin;
    var imgScale = 1;
    var limitFlag = false;
    //从后台获取
    function showImagesWithId(workId){

        var url = 'http://123.57.3.33:9000/api/work/id/' + workId;

        $.get(url, function(data){

            if (data.code!=0){

                console.log("code="+data.code);

            } else {

                var jsonData = data.data;
                processJsonData(jsonData);
            }

        });
    }

    function isEmpty(obj){

        for(var name in obj) {

            if(obj.hasOwnProperty(name)) {

                return false;

            }

        }
        return true;

    }

    function processJsonData(jsonData){

        jsonData.title != null ? $(".goods_name").html(jsonData.title) : void 0;
        jsonData.desc != null ? $(".goods_item_desc").text(jsonData.desc) : void 0;
        jsonData.price != null ? $(".goods_buy_left_1").text("即刻限时特价：￥"+jsonData.price) : void 0;
        jsonData.saleCount != null ? $(".goods_buy_left_2").text("销量: "+jsonData.saleCount) : void 0;
        jsonData.likeCount != null ? $(".item_like").text(jsonData.likeCount) : void 0;
        jsonData.userName != null ? $(".user_name").text(jsonData.userName) : void 0;

        //pic list
        if (jsonData.picUrls!=null){

            var imgArray = new Array();

            if(limitFlag){

                imgArray = [];

                for (var i = 0; i < jsonData.hotPicUrls.length; i++) {

                    //imgArray.push('http://123.57.3.33:9000/pic/work/'+jsonData.picUrls[i]);
                    imgArray.push(jsonData.hotPicUrls[i]);

                }
            }else{

                imgArray = [];

                for (var i = 0; i < jsonData.picUrls.length; i++) {

                    //imgArray.push('http://123.57.3.33:9000/pic/work/'+jsonData.picUrls[i]);
                    imgArray.push(jsonData.picUrls[i]);

                }
            }

            var descList = new Array();

            //旋转图片跟随简介-非热点
            if (!isEmpty(jsonData.picTags) && !limitFlag){
                descList = [];
                if(jsonData.picTags.length == 0){

                    $(".img_desc").hide();

                }else{

                    $(".img_desc").show();
                    var index = new Array;

                    for(key in jsonData.picTags){

                        index[index.length] = key;

                    }
                    if(index.length == 1){

                        descList.push(jsonData.picTags[index[0]]);

                    }else{

                        for(var i = 1;i < index.length;i++){

                            for(var j = 0;j < parseInt(index[i] - index[i - 1]);j++){

                                descList.push(jsonData.picTags[index[i - 1]]);

                            }
                        }
                        if(index[index.length - 1] < 50){

                            for(var i = 0;i <= 50 -(index[index.length - 1]);i++){

                                descList.push(jsonData.picTags[index[index.length - 1]]);

                            }

                        }
                    }
                }

            }
            //旋转图片跟随简介-热点
            if (!isEmpty(jsonData.hotPicTags) && limitFlag){

                descList = [];

                if(jsonData.hotPicTags.length == 0){

                    $(".img_desc").hide();

                }else{

                    $(".img_desc").show();
                    var index = new Array;

                    for(key in jsonData.hotPicTags){

                        index[index.length] = key;

                    }
                    if(index.length == 1){

                        descList.push(jsonData.hotPicTags[index[0]]);

                    }else{

                        for(var i = 1;i < index.length;i++){
                            for(var j = 0;j<parseInt(index[i] - index[i - 1]);j++){

                                descList.push(jsonData.hotPicTags[index[i - 1]]);

                            }
                        }

                        if(index[index.length - 1] < 50){
                            for(var i = 0;i <= 50 - (index[index.length - 1]);i++){

                                descList.push(jsonData.hotPicTags[index[index.length - 1]]);

                            }
                        }
                    }
                }

            }

            var totalPicNum = imgArray.length;//IMG总张数
            var picHeight = "100%";
            var picWidth = "100%";

            var product_1 = $('.product1').ThreeSixty({

                totalFrames: totalPicNum,
                endFrame: totalPicNum,
                currentFrame: 0,
                zeroBased: true,
                imgList: '.threesixty_images', // selector for image list
                progress: '.spinner',          // selector to show the loading progress
                filePrefix: '',                // file prefix if any
                ext: '.jpg',                   // extention for the assets
                height: picHeight,
                width: picWidth,
                navigation: true,
                disableSpin: false,            // Default false
                imgDescList: descList,
                imgDesc: '.img_desc',
                framerate: 400,
                imgArray: imgArray,
                autoplayDirection:-1,
                onReady: function(){
                    //product_1.play();
                }
            });

        }
        if (jsonData.link != null){

            $(".goods_buy_btn").click(function(){

                window.location.href = jsonData.link;

            });

        }

    }

    function showImagesFromLocalJson(jsonFile){

        $.getJSON(jsonFile, function(data){

            if (data.code != 0) {

                console.log("code: "+data.code);

            } else {

                processJsonData(data.data);

            }

        });
    }

    showImagesFromLocalJson('data/example.json');

    //初始化时播放音乐
    var myAuto = document.getElementById('audio');

    //点击切换音乐播放和暂停效果
    $(".swx-music").bind( "click", tapMusicIcon);

    function tapMusicIcon(){

        if(myAuto.paused){

            $('.swx-music').attr('src','/img/music.png');
            $('.swx-music').removeClass('music-pause');

            myAuto.play();

        }else{

            $('.swx-music').attr('src','/img/music_pause.png');
            $('.swx-music').addClass('music-pause');

            myAuto.pause();
        }
    }

    //点击弹幕
    var ifOpenBarrageFlag = false;
    $(".swx-barrage").bind( "click", tapBarrageIcon);

    function tapBarrageIcon(){

        ifOpenBarrageFlag = !ifOpenBarrageFlag;

        if(ifOpenBarrageFlag){

            $('.zpg-barrage-container').show();
            $('.swx-barrage').attr('src','/statistics_show/img/barrage_open.png');

        }else{

            $('.zpg-barrage-container').hide();
            $('.swx-barrage').attr('src','/statistics_show/img/barrage.png');

        }
    }

    //点击热点
    var ifOpenHotFlag = false;
    $(".swx-hot-spots").bind( "click", tapHotSpotsIcon);

    function tapHotSpotsIcon(){

        ifOpenHotFlag = !ifOpenHotFlag;
        limitFlag = !limitFlag;

        if(ifOpenHotFlag){

            $('.swx-hot-spots').attr('src','/statistics_show/img/hot_on.png');
            showImagesFromLocalJson('data/example.json');

        }else{

            $('.swx-hot-spots').attr('src','/statistics_show/img/hot_off.png');
            showImagesFromLocalJson('data/example.json');

        }
    }

    //滑动
    var winW = document.documentElement.clientWidth;
    var winH = document.documentElement.clientHeight;
    var oLis = $("li.section");
    [].forEach.call(oLis, function () {
        var oLi = arguments[0];
        oLi.index = arguments[1];
        oLi.addEventListener("touchstart", start, false);
        oLi.addEventListener("touchmove", move, false);
        oLi.addEventListener("touchend", end, false);
    });

    function getOrigin(first, second) {
        return {
            x: 150,
            y: 150
        };
    }
    function getDistance(start, stop) {
        return Math.sqrt(Math.pow((stop.x - start.x), 2) + Math.pow((stop.y - start.y), 2));
    }

    function getScale(start, stop) {
        return getDistance(start[0], start[1]) / getDistance(stop[0], stop[1]);
    }
    function setScaleAnimation(element,scale, animation) {

        if(scale<0.5){
             scale=0.5
        }
        // 缩放和位移
        element.style[TRANSFORM] = 'scale(' + scale + ')';
    }
    function start(ev) {
        if(ev.target.nodeName!= "IMG"){
            this.startX = ev.changedTouches[0].pageX;
            this.startY = ev.changedTouches[0].pageY;
        }else{
            if (ev.touches.length === 2) {
                distance.start = getDistance({
                    x: ev.touches[0].screenX,
                    y: ev.touches[0].screenY
                }, {
                    x: ev.touches[1].screenX,
                    y: ev.touches[1].screenY
                });
            }
        }
    }
    function move(ev) {
        ev.preventDefault();
        if(ev.target.nodeName!= "IMG"){
            var touchY = ev.changedTouches[0].pageY;
            var touchX = ev.changedTouches[0].pageX;
            var changeY = touchY - this.startY;
            var changeX = touchX - this.startX;
            var nowIndex = this.index;
            var step = 1 / 5;

            this.flag = true;/*表示滑动而不是点击*/
            //记录下移动的时候的触摸点的坐标
            if(Math.abs(changeX)>Math.abs(changeY)){
                this.flag = false;  //横滑不改变
                return;
            }
            [].forEach.call(oLis,function(){
                //除了自己其他所有的隐藏(通过索引来判断当前这张是不是自己)
                if(nowIndex != arguments[1]){
                    arguments[0].style.display = "none";
                }
                arguments[0].className = "section";
            });
            if (changeY < 0) {//小于0说明是向上移动
                this.nextIndex = nowIndex == oLis.length - 1 ? 0 : nowIndex + 1;
                var duration=winH + changeY;
                if(this.nextIndex==1){
                    oLis[this.nextIndex].style.webkitTransform = "translate(0," + duration + "px)";
                    oLis[this.nextIndex].className = "section zIndex";
                    oLis[this.nextIndex].style.display = "block";
                    this.style.webkitTransform = "scale(" + (1 - Math.abs(changeY / winH)* step ) + ") translate(0," + changeY + "px)";
                }
            } else if((changeY > 0)){
                var duration=-winH + changeY;
                this.nextIndex = nowIndex == 0 ? oLis.length - 1 : nowIndex - 1;
                if(this.nextIndex==0){
                    oLis[this.nextIndex].style.webkitTransform = "translate(0," + duration + "px)";
                    oLis[this.nextIndex].className = "section zIndex";
                    oLis[this.nextIndex].style.display = "block";
                    this.style.webkitTransform = "scale(" + (1 - Math.abs(changeY / winH)* step ) + ") translate(0," + changeY + "px)";

                }
            }
        }else{
            if (ev.touches.length === 2) {
                origin = getOrigin({
                    x: ev.touches[0].pageX,
                    y: ev.touches[0].pageY
                }, {
                    x: ev.touches[1].pageX,
                    y: ev.touches[1].pageY
                });
                distance.stop = getDistance({
                    x: ev.touches[0].screenX,
                    y: ev.touches[0].screenY
                }, {
                    x: ev.touches[1].screenX,
                    y: ev.touches[1].screenY
                });
                imgScale = distance.stop / distance.start;
                setScaleAnimation(ev.target,imgScale, true);
            }
        }

    }
    function end(ev) {
        if(ev.target.nodeName!= "IMG"){
            if(this.flag){
                //让上一张或者下一张都回到0,0的位置
                oLis[this.nextIndex].style.webkitTransform = "translate(0,0)";
                oLis[this.nextIndex].style.webkitTransition = "0.2s";
                oLis[this.nextIndex].addEventListener("webkitTransitionEnd",function(){
                    this.style.webkitTransition = "";
                    //增加执行动画的id名
                    //this.firstElementChild.id = "a"+this.index;

                },false);
                this.flag = false;
            }
        }else{
            imgScale = 1;
            setScaleAnimation(ev.target,imgScale)
        }


    }

});
