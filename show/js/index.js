$(document).ready(function () {

    var descList = new Array();
    for (var i=0; i<10; i++)
        descList.push("这是一快表");
    for (var i=0; i<10; i++)
        descList.push("知道了");
    for (var i=0; i<10; i++)
        descList.push("使用人工合成蓝宝石镜面");
    for (var i=0; i<20; i++)
        descList.push("采用瑞士机芯");

    function showLocalImages(){
        var totalPicNum = 50;
        var picHeight = 3.6;//使用rem布局，故此修改此处数字，对应threesixty中亦调整过
        var picWidth = 3.6;//使用rem布局，故此修改此处数字
        var path = "img/watch/";
        var product_1 = $('.product1').ThreeSixty({
            totalFrames: totalPicNum, // Total no. of image you have for 360 slider
            endFrame: totalPicNum, // end frame for the auto spin animation
            currentFrame: 0, // This the start frame for auto spin
            zeroBased: true,
            imgList: '.threesixty_images', // selector for image list
            progress: '.spinner', // selector to show the loading progress
            imagePath: path, // path of the image assets
            filePrefix: '', // file prefix if any
            ext: '.jpg', // extention for the assets
            height: picHeight,
            width: picWidth,
            navigation: true,
            disableSpin: false, // Default false
            imgDescList: descList,
            imgDesc: '.img_desc',
            framerate: 30
        });
        // product_1.play();
    }



    function showImagesWithId(workId){
        var url = 'http://123.57.3.33:9000/api/work/id/' + workId;
        $.get(url, function(data){
            if (data.code!=0){
                console.log("code="+data.code);
                alert("作品不存在");
            } else {
                var jsonData = data.data;
                processJsonData(jsonData);
            }
        });
    }


    function processJsonData(jsonData){
        if (jsonData.title!=null) {
            $(".goods_name").text(jsonData.title);
        }
        if (jsonData.desc!=null) {
            $(".goods_item_desc").text(jsonData.desc);
        }
        if (jsonData.price!=null) {
            $(".goods_buy_left_1").text("￥"+jsonData.price);
        }
        if (jsonData.saleCount!=null) {
            $(".goods_buy_left_2").text("销量: "+jsonData.saleCount);
        }
        if (jsonData.likeCount!=null) {
            $(".item_like").text(jsonData.likeCount);
        }
        if (jsonData.collectCount!=null){

        }
        if (jsonData.lookCount!=null){

        }
        if (jsonData.userName!=null){
            $(".user_name").text(jsonData.userName);
        }
        //pic list
        if (jsonData.picUrls!=null){
            var imgArray = new Array();
            for (var i=0; i<jsonData.picUrls.length; i++) {
                imgArray.push('http://123.57.3.33:9000/pic/work/'+jsonData.picUrls[i]);
                //console.log('http://123.57.3.33:9000/pic/work/'+jsonData.picUrls[i]);
            }
            var descList = new Array();
            /*for (var i=0; i<imgArray.length; i++)
                descList.push("");
            if (jsonData.picTags!=null){
                for (var i=0; i<jsonData.picTags.length&&i<descList.length; i++){
                    descList[i] = jsonData.picTags[i];
                }
            }*/
            //旋转图片跟随简介
            if (jsonData.picTags!=null){
                if(jsonData.picTags.length==0){
                    $(".img_desc").hide();
                }else{
                    $(".img_desc").show();
                    var copies=Math.floor(imgArray.length/jsonData.picTags.length);
                    for(var i=0;i<jsonData.picTags.length;i++){
                        for(var j=0;j<copies;j++){
                            descList.push(jsonData.picTags[i]);
                        }
                    }
                }

            }
            // for (var i=0; i<10&&i<imgArray.length; i++)
            //     descList.push("这是一快表");
            // for (var i=0; i<10&&i+10<imgArray.length; i++)
            //     descList.push("知道了");
            // for (var i=0; i<10&&i+20<imgArray.length; i++)
            //     descList.push("使用人工合成蓝宝石镜面");
            // for (var i=0; i<20&&i+30<imgArray.length; i++)
            //     descList.push("采用瑞士机芯");
            var totalPicNum = imgArray.length;
            var picHeight = "100%";//使用rem布局，故此修改此处数字，对应threesixty中亦调整过
            var picWidth = "100%";
            var product_1 = $('.product1').ThreeSixty({
                totalFrames: totalPicNum, // Total no. of image you have for 360 slider
                endFrame: totalPicNum, // end frame for the auto spin animation
                currentFrame: 0, // This the start frame for auto spin
                zeroBased: true,
                imgList: '.threesixty_images', // selector for image list
                progress: '.spinner', // selector to show the loading progress
                filePrefix: '', // file prefix if any
                ext: '.jpg', // extention for the assets
                height: picHeight,
                width: picWidth,
                navigation: true,
                disableSpin: false, // Default false
                imgDescList: descList,
                imgDesc: '.img_desc',
                framerate: 30,
                imgArray: imgArray
            });
        }
        if (jsonData.link!=null){
            $(".goods_buy_btn").click(function(){
                window.location.href = jsonData.link;
            });
        }
    }


    function showImagesFromLocalJson(jsonFile){
        $.getJSON(jsonFile, function(data){
            if (data.code!=0) {
                console.log("code: "+data.code);
                alert("作品不存在");
            } else {
                processJsonData(data.data);
            }
        });
    }


    //showLocalImages();

    // var currentWorkId = 'adf9dbf9-d7a2-4d69-83a3-de2ea2a4e5e0';
    // showImagesWithId(currentWorkId);

    showImagesFromLocalJson('data/example.json');


});
