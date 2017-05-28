
var commonService= angular.module("common.service", [])
    .constant('baseUrl', '/chenshaoqiang/zipaigan/')
    .service('util', function($rootScope,$window,$timeout,errorCode){

    var self = this;

    //初始化默认参数设置--由于多个控制器设置雷同，所以提取出来
    self.defaultInit=function(scope){//

        //保存搜索条件的对象
        scope.search={};

        //设置默认显示开始时间 当前日期的前一天
        scope.search.startTime=self.formatDate(new Date()-86400000,"yyyy-MM-dd");

        //设置默认显示结束时间 当前日期
        scope.search.endTime=self.formatDate(new Date(),"yyyy-MM-dd");

        //第一次加载从第一页开始
        scope.search.pageNumber=1;

        //默认每次请求数
        scope.search.pageSize="10";

    };

    //分页设置
    self.setPagination=function(scope,res){
        /*
        * pageArr，totalPage为后台对应键值，pageArr为返回的分页数组，totalPage为返回的总页数，需注意。
        * search为所在控制器作用域上的设值，用于保存分页相关值，命名和nav中相对应，要修改命名需要两边同时改。
        * Lists为所在控制器作用域上的设值，用于保存表格的信息，用于表格repeat，同样修改命名需对应改变表格repeat处的值。
        * */

        scope.listPages=res.pageArr;//分页数组
        scope.totalPage=res.totalPage;//总页数

        var num=parseInt(scope.search.pageNumber);

        if(scope.totalPage>6){

            //设置分页省略号 设置显示四个页码
            if(scope.search.pageNumber<=res.totalPage-4){

                scope.listPages=[num,num+1,num+2,"...",res.totalPage];

            }else if(scope.search.pageNumber==res.totalPage-3){

                scope.listPages=[num,num+1,num+2,res.totalPage];

            }else if(scope.search.pageNumber>res.totalPage-3){

                scope.listPages=[res.totalPage-3,res.totalPage-2,res.totalPage-1,res.totalPage];

            }
        }

        scope.Lists=res.data;

    };

    //分页跳转
    self.goTargetPage=function(page,scope,callBack){

        /*
        * callBack为用于请求表格信息的函数
        *
        * */

        //点到省略号的时候不响应,输入为空不跳转
        if(page != "..." && page != "" && page != undefined){

            //输入的值为正整数才跳转
            if(self.zDigital(page)){

                //输入跳转的时候判断值溢出
                if(parseInt(page)> parseInt(scope.totalPage)){

                    layer.alert("您的输入[ " + page + " ]大于总页数[ " + scope.totalPage + " ]请重新输入！");

                }else{

                    scope.search.pageNumber = parseInt(page);//注意，必须转换，否则出错

                    callBack();
                }
            }else{

                layer.alert("您的输入[ "+ page + " ]不是一个有效数字，请您重新输入！");
            }

        }

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
            return $http.get(baseUrl + url , {
                params: data
            });
        };

        //POST 请求
        self.req_post=function (url, data) {
            var data = data || {};
            return $http.post(
                baseUrl + url ,
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
        };
        return self;
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
