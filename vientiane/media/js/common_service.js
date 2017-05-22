

angular.module("common.service", [])
    .constant('baseUrl', '/')
    .service('layer', function($rootScope,$window,$timeout,errorCode){

    var self = this;
    //屏幕宽度
    var w_width = $(window).width();
    //当前div最大宽度
    var d_maxWidth = 400;
    //屏幕高度
    var w_height =  $(window).height();

    /**
     * div层动态计算比例
     * u_width: width比例
     * */
    var divCount = function(u_width) {

        if(angular.isUndefined(u_width)) {
            u_width = 0.8;
        }

        var s_width = (w_width -  d_maxWidth) / 2;	//用于遮罩层
        var d_width = 0;							//普通层
        var c_width = 0;							//取消层
        var max_width = d_maxWidth;					//普通层当前最大宽度

        if(w_width > d_maxWidth) {
            d_width = (w_width - d_maxWidth) / 2;
            if(w_width*u_width > d_maxWidth-200) {
                max_width = d_maxWidth*u_width;
                d_width += (d_maxWidth - max_width) / 2;
            }
            c_width = d_width + d_maxWidth*u_width - 20;
        } else {
            d_width = (w_width - d_maxWidth * u_width) / 2;
            c_width = d_width + d_maxWidth*u_width - 20;
        }

        return {
            s_width 	: s_width,
            d_width 	: d_width,
            c_width		: c_width,
            max_width	: max_width
        };
    };


    //js获取项目根路径，如： http://localhost:8080/index
    self.getRootPath = function(){
        //获取当前网址，如： http://localhost:8080/share/meun.jsp
        var curWwwPath=window.document.location.href;
        //获取主机地址之后的目录，如： share/meun.jsp
        var pathName=window.document.location.pathname;
        var pos=curWwwPath.indexOf(pathName);
        //获取主机地址，如： http://localhost:8083
        var localhostPath=curWwwPath.substring(0,pos);
        //获取带"/"的项目名，如：/share
        var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
        return (localhostPath+projectName);
    };

    /*
     截取访问地址栏后的参数
     */
    self.getParameters = function() {
        var url = decodeURI(location.search);//取访问地址url?后的部分
        var obj = new Object();	//返回对象
        var str;	//截取后的字符串
        if(url.charAt(0) == "?") {
            url = url.substring(1, url.length);
            //两个参数以上的情况
            if(url.indexOf("&") != -1) {
                str = url.split("&");
                for(var i = 0; i < str.length; i++) {
                    var str1 = str[i].split("=");
                    if(str1.length == 2 && str1[0] != '') {
                        obj[str1[0]] = str1[1];
                    }
                }
            }
            //一个参数的情况
            else {
                str = url.split("=");
                if(str.length == 2 && str[0] != '') {
                    obj[str[0]] = str[1];
                }
            }
        }
        return obj;
    };

    /**
     * 滚动条事件
     * _callback: 下拉加载
     * _callback2: 上拉刷新
     * */
    self.scroll = function(_callback,_callback2) {
        $(window).bind('scroll', function() {
            if($(window).scrollTop() + $(window).height() >= $(document).height()) {
                _callback();
            } else if($(window).scrollTop() <= 0) {
                if(angular.isFunction(_callback2)) {
                    _callback2();
                }
            }
        });
    };

    /**
     * 阻止事件冒泡,防止事件穿透
     * */
    var preventEvent = function() {
        var e=arguments.callee.caller.arguments[0]||event;

        if (e && e.stopPropagation) {
            // this code is for Mozilla and Opera
            e.stopPropagation();
        } else if (window.event) {
            // this code is for IE
            window.event.cancelBubble = true;
        }
    };


    /**
     提示信息框
     _msg: 提示信息内容
     */
    self.show = function(_msg,obj) {
        var deft = {
            title : this.getResources().prompt,
            time : 2000,	//设置时间
            error : false,	//默认为报错框，提示为true
            backFun : function(){}	//关闭时回调
        };
        $.extend(deft, obj);
        if(angular.isObject(_msg)) {
            _msg = errorCode.msg(_msg);
        }
        if(!angular.isUndefined($("#l-hintShow").html())){
            $("#l-hintShow").attr('class','');
            $timeout(function(){
                $("#l-hintShow").attr('class','donglR');
            });
        }else{
            var style = deft.error == true ? 'color:#008CD7;' : '',
                div = $("<div id='l-hintShow' class='in' style='"+style+"border:1px solid #d9d9d9;'>"+
                    "<div id='dialog_title' style='padding:8px 12px;text-align:left;color:#333;border:none;border-bottom:1px solid #dfdfdf;'>"+deft.title+"</div>"+
                    "<div style='padding:80px 30px;'>"+_msg+"</div><div id='l-Close'>×</div></div>"),
                divOut = function(div){
                    //div.attr('class','out');
                    div.fadeOut();
                    $timeout(function(){
                        div.remove();
                    },500);
                };
            div.appendTo($("body")).fadeIn("slow",function(){
                $('#l-Close').click(function(){
                    divOut(div);
                    deft.backFun();
                });
                $timeout(function(){
                    divOut(div);
                    deft.backFun();
                },deft.time);
            });
        }
    };


    /**
     确认框提示框
     _msg: 提示内容
     _func: 确定按钮回调事件
     _func1: 取消按钮回调事件
     */
    self.confirm = function(_msg, options) {
        preventEvent();
        if(angular.isUndefined($("#l-confirm").html())) {
            var deft = {	//默认参数
                title : this.getResources().prompt,
                width : 480,
                height : 240,
                confirm : function(){},
                cancel : function(){},
                shade : true,
                msgPadding : '12%'
            };
            $.extend(deft, options);
            var divLeft = (w_width - deft.width)/2;
            var divTop = (w_height - deft.height)/2;

            var warp = "width:"+deft.width+"px;height:"+deft.height+"px;position:fixed;left:"+divLeft+"px;top:"+divTop+"px;z-index:9999;background:#fff;border-radius:3px;overflow:hidden;";
            var close  = "font-size:32px;cursor: pointer;color:#999;width:25px;height:25px;line-height:20px;text-align:center;position:absolute;z-index:10000;top:7px;right:7px;";
            var message = "text-align:center;word-break:break-word;overflow:hidden;padding:"+deft.msgPadding;
            var btnBar = "max-width:260px;margin:0 auto;";
            var queding = "padding:6px 40px;";
            var cancel = "padding:6px 40px;";
            var confirm = $("<div id='l-confirm' style='"+warp+"'>"+
                "<div id='l-close' style='"+close+"'>×</div><div id='dialog_title'>"+deft.title+"</div>"+
                "<div id='l-comfirm-msg' style='"+message+"'>"+_msg+"</div>"+
                "<div style='"+btnBar+"' class='clearfix'>"+
                "<button id='l-queding' class='btn btn_blue pull-left' style='"+queding+"'>"+this.getResources().sure+"</button>"+
                "<button id='l-cancel' class='btn pull-right' style='"+cancel+"'>"+this.getResources().cancel+"</button></div>"+
                "</div>");
            var shade = $("<div id='l-shade' style='width:100%;height:"+w_height+"px;background:black;position:fixed;opacity:0.5;filter:alpha(opacity=50);z-index:9998;top:0;left:0px;'></div>");

            confirm.appendTo($('body'));
            deft.shade && shade.appendTo($('body'));

            $("#l-queding").bind('click',function(){
                removeEle();
                if(angular.isFunction(deft.confirm)){
                    deft.confirm();
                }
                preventEvent();
            });
            $("#l-cancel").bind('click',function(){
                removeEle();
                if(angular.isFunction(deft.cancel)){
                    deft.cancel();
                }
                preventEvent();
            });
            $("#l-close").bind('click',function(){
                removeEle();
                preventEvent();
            }).hover(function(){
                $(this).css('color','#666');
            },function(){
                $(this).css('color','#999');
            });

            function removeEle(){
                $("#l-shade").remove();
                //$("#l-confirm").attr('class','out');
                $("#l-confirm").fadeOut();
                $timeout(function(){
                    $("#l-confirm").remove();
                },500);
            }
        }
    };


    /**
     * 将div变成弹出层
     * divId: 要变成弹出层的div
     * */
    self.popup = function(divId, options) {
        //preventEvent();
        var deft = {	//默认参数
            width : 480,
            height : 320,
            callback : function(){},
            close : function(){}
        };
        $.extend(deft, options);
        if(w_width <= 400){w_width = 1200;}
        if(w_height <= 480){w_height = 600;}
        var divLeft = (w_width - deft.width)/2;
        var divTop = (w_height - deft.height)/2 + $(window).scrollTop();

        var warp = "width:"+deft.width+"px;height:"+deft.height+"px;position:fixed;left:50%;top:50%;margin-left:"+(-deft.width/2)+"px;margin-top:"+(-deft.height/2)+"px;z-index:9999;background:#fff;border-radius:2px;overflow:hidden;";
        $("#"+divId).attr('style',warp).fadeIn('slow');

        //var title = $("<div id='dialog_title'>"+deft.title+"</div>");

        var canel = $("<div id='embs_canel' style='font-size:32px;cursor: pointer;color:#999;width:25px;height:25px;line-height:20px;text-align:center;position:absolute;z-index:10000;top:7px;right:7px;'>×</div>");
        //遮罩层
        var shade = $("<div id='embs_shade' style='width:100%;height:"+(w_height*3/2)+"px;background:black;position:fixed;opacity:0.5;filter:alpha(opacity=50);z-index:9998;top:0;left:0px;'></div>");
        shade.appendTo($('body'));
        //$("#"+divId).prepend(title);
        $("#"+divId).prepend(canel);

        if(angular.isFunction(deft.callback)){
            deft.callback();
        }

        $("#embs_canel").bind('click',function(){
            self.closePopup(divId,deft.close);
            preventEvent();
        }).hover(function(){
            $(this).css('color','#666');
        },function(){
            $(this).css('color','#999');
        });

    };


    /**
     * 关闭弹出层
     * divId: 要变成弹出层的div
     * */
    self.closePopup = function(divId, closeFun) {
        $("#embs_shade").remove();	//删除遮罩层
        //$("#dialog_title").remove();	//删除标题栏
        $("#embs_canel").remove();	//删除弹出层
        $('#'+divId).fadeOut('fast');
        $('.threesixty').empty();
        if(angular.isFunction(closeFun)){
            closeFun();
        }
    };


    //获取浏览器语言
    self.getLanguage = function(){
        var language;
        if (navigator.language) {
            language = navigator.language;
        } else {
            language = navigator.browserLanguage;
        }
        return language;
    };

    self.spaceVer = function(e){
        if(angular.element(e.target).val().indexOf(' ') != -1){
            angular.element(e.target).val(angular.element(e.target).val().replace(/\s/g,'')).change();
        }
    };
    //加密
    /*self.baseDes = function(ls){
     return base64encode(strEnc(ls,1,2,3));
     };*/
    self.baseDes = function(ls){
        return new Base64().encode(ls);
    };
    //解密
    /*self.desBase = function(ls){
     return strDec(base64decode(ls),1,2,3);
     };*/
    self.desBase = function(ls){
        return new Base64().decode(ls);
    };

    //获取存储
    self.getItem = function(ls){
        ls = localStorage.getItem(ls);
        if(!ls){
            return ls;
        }
        return self.desBase(ls);
    };
    //设置存储
    self.setItem = function(ls,um){
        return localStorage.setItem(ls,self.baseDes(um));
    };
    //删除存储
    self.removeItem = function(ls){
        return localStorage.removeItem(ls);
    };

    //获取临时存储
    self.getSession = function(item){
        return sessionStorage.getItem(item);
    };
    //设置临时存储
    self.setSession = function(item, value){
        return sessionStorage.setItem(item, value);
    };
    //删除临时存储
    self.removeSession = function(item){
        return sessionStorage.removeItem(item);
    };

    //判断是否是正确邮箱
    self.mailVer = function(cla){
        return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(cla);
    };
    //判断是否有汉字
    self.chinese = function(cla){
        return /^[a-zA-Z\u4e00-\u9fa5]+$/.test(cla);
    };
    //只能输入数字
    self.digital = function(cla){
        return /^([0-9.]+)$/.test(cla);
    };
    //只能输入正整数
    self.zDigital = function(cla){
        return /^[0-9]*[1-9][0-9]*$/.test(cla);
    };
    //只能输入数字和两位小数点
    self.minDig = function(cla){
        return /^\d*\.?\d{0,2}$/.test(cla);
    };
    //判断是否是正确的身份证
    self.cid = function(cla){
        return /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(cla);
    };
    //判断是否是正确的手机号码(包含港澳台)
    self.phone = function(cla){
        return /^(0|86|17951)?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$|^([6|9])\d{7}$|^[0][9]\d{8}$|^[6]([8|6])\d{5}$/.test(cla);
        /*	/^[1][3-8]\d{9}$|^([6|9])\d{7}$|^[0][9]\d{8}$|^[6]([8|6])\d{5}$/.test(cla);      大陆+港澳台
         /^(0|86|17951)?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/.test(cla);  大陆
         */
    };
    //判断是否是正确的时间
    self.isDate = function(cla){
        return /^(19|20)\d{2}-(1[0-2]|0?[1-9])-(0?[1-9]|[1-2][0-9]|3[0-1])$/.test(cla);
    };
    //判断是否是固话
    self.isTel = function(cla){
        return /\d{3}-\d{8}|\d{4}-\d{7}/.test(cla);
    };
    //去空格
    self.qKeyup = function(cla){//传id名 #id
        $(cla).val($(cla).val().replace(/(^\s+)|(\s+$)/g,"")).change();
    };
    //去掉所有空格
    self.replaceAll = function(cla){//字符串
        if(cla != null && cla != ''){
            for(var i = 0;i<cla.length;i++){
                cla = cla.replace(' ','');
            }
            return cla;
        }
    };
    //转换时间
    self.getDate = function(cla){
        return cla = new Date(parseInt(cla)).toLocaleString();
    };
    //时间转换秒数
    self.getSeconds = function(cla){
        return cla = new Date(cla).getTime();
    };


    // 格式化日期
    self.formatDate = function(date, format) {
        if (!date) return;
        if (!format) format = "yyyy-MM-dd";
        switch(typeof date) {
            case "string":
                date = new Date(date.replace(/-/, "/"));
                break;
            case "number":
                date = new Date(date);
                break;
        }
        if (!date instanceof Date) return;
        var dict = {
            "yyyy": date.getFullYear(),
            "M": date.getMonth() + 1,
            "d": date.getDate(),
            "H": date.getHours(),
            "m": date.getMinutes(),
            "s": date.getSeconds(),
            "MM": ("" + (date.getMonth() + 101)).substr(1),
            "dd": ("" + (date.getDate() + 100)).substr(1),
            "HH": ("" + (date.getHours() + 100)).substr(1),
            "mm": ("" + (date.getMinutes() + 100)).substr(1),
            "ss": ("" + (date.getSeconds() + 100)).substr(1)
        };
        return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function() {
            return dict[arguments[0]];
        });
    };

    //图片放大插件
    self.fancybox = function(sid){
        $('.'+sid).fancybox({
            openEffect  : 'none',
            closeEffect : 'none',
            prevEffect : 'none',
            nextEffect : 'none',
            closeBtn  : false,
            helpers : {
                title : {
                    type : 'inside'
                },
                buttons	: {}
            },
            afterLoad : function() {
                this.title = '第' + (this.index + 1) + '张   共	' + this.group.length + (this.title ? ' - ' + this.title + '	张' : '');
            }
        });
    };


})
    .factory('httpServices', function($http, baseUrl) {

        var self = this;
        self.RootUrl = "";

        //json参数转换
        self.jsonToHttpPara = function(para) {
            if(para == '') return {};
            var httpPara = [];
            angular.forEach(para, function(v, k) {
                if (angular.isObject(v)) {
                    v = angular.toJson(v);
                }
                httpPara.push(k + '=' + v);
            });
            return httpPara.join('&');
        };
        //string参数转换
        self.stringToHttpPara = function(para) {
            var text ='{';
            for(var i in para){
                text+='"'+i+'":"'+para[i]+'",';
            }
            return text.substring(0,text.length-1) + '}';
        };
        //安全
        self.make_basic_auth = function(user, pass){
            var tok = user + ':' + pass;
            var hash = new Base64().encode(tok);
            return "Basic " + hash;
        };

        //GET 请求
        self.req_get=function (url, data) {
            return $http.get(baseUrl + url, {
                params: data
            });
        };

        //POST 请求
        self.req_post=function (url, data) {
            var data = data || {};
            return $http.post(
                baseUrl + url,
                data
            );
        };
        // 判断是否为空
        self.notEmpty=function (str) {
            if (typeof str === "undefined") {
                return false;
            } else if (str == null) {
                return false;
            } else if (((str) + "") == '') {
                return false;
            } else {
                return true;
            }
        };
        // 判断数组是否为空
        self.notArrayEmpty=function (array) {
            if (typeof array === "undefined") {
                return false;
            } else if (array == null) {
                return false;
            } else if (array == '[]') {
                return false;
            } else if (array.length == 0) {
                return false;
            } else {
                return true;
            }
        };
        // 判断对象是否为空
        self.notObjEmpty=function (obj) {
            if (typeof obj === "undefined") {
                return false;
            } else if (obj == null) {
                return false;
            } else {
                return true;
            }
        }
    })
    .factory('errorCode', function(){
        /**
         获取服务器返回的错误信息
         data：服务器返回的错误对象，{'code':'','message':''}
         */
        return {
            msg : function(data) {
                if(angular.isUndefined(data.code)) {
                    return '服务器故障!';
                }
                var _msg = '';
                switch(parseInt(data.code)) {
                    case 1001 :
                        _msg = data.msg;
                        break;
                    case 1002 :
                        _msg = "链接超时";
                        break;
                    case 1003 :
                        _msg = "请重新登录";
                        break;
                    default :
                        _msg = '错误代码: ' + data.code;
                        break;
                }
                return _msg;
            }
        }
    })
    .config(function($httpProvider){
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    });
