/**
 * 用于处理过滤
 */
var commonFilter = angular.module("common.filter", []);

/**
 * 时间格式化
 */
commonFilter.filter("dateFormat", function () {
    return function (input, type) {
        if (input == null || input == '' || typeof(input) == "undefined") {
            return "";
        }
        var _date = new Date(input);
        var year = _date.getFullYear();
        var month = _date.getMonth() + 1 > 9 ? _date.getMonth() + 1 : "0" + (_date.getMonth() + 1);
        var day = _date.getDate() > 9 ? _date.getDate() : "0" + _date.getDate();
        var hour = _date.getHours() + 1 > 9 ? _date.getHours() : "0" + _date.getHours();
        var minutes = _date.getMinutes() + 1 > 9 ? _date.getMinutes() : "0" + _date.getMinutes();
        var seconds = _date.getSeconds() + 1 > 9 ? _date.getSeconds() : "0" + _date.getSeconds();
        if (type == "date") {
            return year + "-" + month + "-" + day;
        } else if (type == "time") {
            return hour + ":" + minutes + ":" + seconds;
        } else {
            return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
        }
    }
});