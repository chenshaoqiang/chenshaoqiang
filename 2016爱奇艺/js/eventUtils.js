var EventUtil = {
    //跨浏览器的事件处理程序
    addHandler: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;//默认采用DOM0级方法
        }
    },
    //事件对象
    getEvent: function (event) {
        return event ? event : window.event;
    },
    //目标元素
    getTarget: function (event) {
        return event.target || event.srcElement;
    },
    //阻止事件的默认
    preventDefault: function (event) {
        if (event.preventDefault) {
            return event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    //跨浏览器的事件移除程序
    removeHandler: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    },
    //阻止事件传播
    stopPropagation:function(event){
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancelBubble=true;
        }
    },
    //相关元素
    getRelatedTarget:function(event){
        if(event.relatedTarge){
            return event.relatedTarget;
        }else if(event.toElement){
            return event.toElement;
        }else if(event.fromElement){
            return event.fromElement;
        }else{
            return null;
        }
    },
    //鼠标点击
    getButton:function(event){
        if(document.implementation.hasFeature("MouseEvents","2.0")){
            return event.button;
        }else{
            switch(event.button){
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0;//主鼠标按钮
                case 2:
                case 6:
                    return 2;//中间鼠标按钮
                case 4:
                    return 1;//次鼠标按钮
            }
        }
    },
    processThis:function(){

    }

};