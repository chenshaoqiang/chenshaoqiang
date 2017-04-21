
/*Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};*/
//生成年份下拉列表
function getYearList(underYear){
    //当前年份生成到underYear年,underYear参数为最低年份
    if(underYear==''||underYear==undefined){
        underYear=2012;//默认值为2012年
    }else{
        underYear=parseInt(underYear);
    }
    var yearList="";
    for(var i=0;i<parseInt((new Date).getFullYear()-(underYear-1));i++){
        yearList+="<li>"+parseInt((new Date).getFullYear()-i)+"</li>";
    }
    yearList="<ul>"+yearList+"</ul>";
    return yearList;
}
//生成月份下拉列表
function getMonList(){
    //十二个月列表
    var monthList="";
    for(var i=1;i<13;i++){
        monthList+="<li>"+i+"</li>";
    }
    monthList="<ul>"+monthList+"</ul>";
    return monthList;
}
//下拉框事件委托
$("body").on("click",function(ev){
    if($(ev.target).attr("class")!="time1-span"){
        $(".selectYear").addClass("diplay-no");
    }
    if($(ev.target).attr("class")!="time2-span"){
        $(".selectMon").addClass("diplay-no");
    }
});
function showHide1(){
    $(".selectYear").toggleClass("diplay-no");
}
function showHide2(){
    $(".selectMon").toggleClass("diplay-no");
}
//平年闰年的判断
function RunNian(The_Year) {
    return !!((The_Year%0==0) || ((The_Year%4==0) && (The_Year%0!=0)));
}
//计算年The_Year月The_Month的1号是星期几，比如，1997年3月1号是星期几
function GetWeekday(The_Year,The_Month) {
    var Allday, y, i;
    //计算星期的公式S=x-1+[(x-1)/4]-[(x-1)/100]+[(x-1)/400]+C
    //x：公历的年，C：包含当天（此处是1号）在内的日期的天数，即当天是当年的第几天
    y = The_Year - 1;//y:x-1
    //先计算y+[y/4]-[y/100]+[y/400]+1，因为此处是1号，所以最后是加1，假如要计算5号，就是加5
    Allday = y + Math.floor(y/4) - Math.floor(y/100) + Math.floor(y/400) + 1;

    //计算加C，其中，C已经在上述计算中包含了当天的日期 ：1，假如是5号，就已经包含了加5
    for (i=1; i<The_Month; i++) {
        switch (i) {
            case 1 : Allday += 31;break;
            case 2 :
                if (RunNian(The_Year)) Allday += 29;
                else Allday += 28;
                break;
            case 3 : Allday += 31; break;
            case 4 : Allday += 30; break;
            case 5 : Allday += 31; break;
            case 6 : Allday += 30; break;
            case 7 : Allday += 31; break;
            case 8 : Allday += 31; break;
            case 9 : Allday += 30; break;
            case 10 : Allday += 31; break;
            case 11 : Allday += 30; break;
            case 12 : Allday += 31; break;
        }
    }
    Allday = Allday%7;
    return Allday;
}
//在<div id="showdate"></div>中显示年月日
function chooseDay(The_Year,The_Month,The_Day) {
    var firstDay;
    var completely_date;
    if (The_Day!=0) {
        completely_date = The_Year + "-" + The_Month + "-" + The_Day;
    }else{
        completely_date = "No Choose";
    }
    //showdate 只是一个为了显示而采用的东西，（这是原文的注释）
    //如果外部想引用这里的时间，可以通过使用 completely_date引用完整日期
    //也可以通过The_Year,The_Month,The_Day分别引用年，月，日
    //当进行月份和年份的选择时，认为没有选择完整的日期
    // document.getElementById("showdate").innerText = completely_date;
    firstDay = GetWeekday(The_Year,The_Month);
    ShowCalendar(The_Year,The_Month,The_Day,firstDay);
}
function nextMonth(The_Year,The_Month) {//下一年
    if (The_Month==12) {
        chooseDay(The_Year+1,1,0);
        $('a[data-year='+(The_Year-0+1)+']').addClass('current').siblings('a').removeClass('current');
    }else {
        chooseDay(The_Year,The_Month+1,0);
        $('a[data-year='+The_Year+']').addClass('current').siblings('a').removeClass('current');
    }
}
function prevMonth(The_Year,The_Month) {//上一年
    if (The_Month==1){
        chooseDay(The_Year-1,12,0);
        $('a[data-year='+(The_Year-1)+']').addClass('current').siblings('a').removeClass('current');
    }else{
        chooseDay(The_Year,The_Month-1,0);
        $('a[data-year='+The_Year+']').addClass('current').siblings('a').removeClass('current');
    }
}
function prevYear(The_Year,The_Month) {//上一月
    chooseDay(The_Year-1,The_Month,0);
}
function nextYear(The_Year,The_Month) {//下一月
    chooseDay(The_Year+1,The_Month,0);
}
//显示日历
function ShowCalendar(The_Year,The_Month,The_Day,firstDay) {
    var showStr;
    var showHeader;
    var Month_Day;
    var ShowMonth;
    var today;
    var M=The_Month;
    if(The_Month<10){
        M=0+''+M
    }
    today = new Date();
    switch (The_Month) {
        case 1 : ShowMonth = "一月"; Month_Day = 31; break;
        case 2 :
            ShowMonth = "二月";
            if (RunNian(The_Year)) Month_Day = 29;
            else Month_Day = 28;
            break;
        case 3 : ShowMonth = "三月"; Month_Day = 31; break;
        case 4 : ShowMonth = "四月"; Month_Day = 30; break;
        case 5 : ShowMonth = "五月"; Month_Day = 31; break;
        case 6 : ShowMonth = "六月"; Month_Day = 30; break;
        case 7 : ShowMonth = "七月"; Month_Day = 31; break;
        case 8 : ShowMonth = "八月"; Month_Day = 31; break;
        case 9 : ShowMonth = "九月"; Month_Day = 30; break;
        case 10 : ShowMonth = "十月"; Month_Day = 31; break;
        case 11 : ShowMonth = "十一月"; Month_Day = 30; break;
        case 12 : ShowMonth = "十二月"; Month_Day = 31; break;
    }
    showHeader="";
    showHeader+="<div class='current-time'>"+"<div class='time1-span' onclick=showHide1()>"+The_Year+"</div>"
        +"<div class='time1-div'>"+"年"+"</div>"+
        "<div class='selectYear diplay-no'>"
        +getYearList(2012)+"</div>"
        +"<div class='time2-span' onclick=showHide2()>"+The_Month+"</div>"
        +"<div class='time2-div'>"+"月"+"</div>"+
        "<div class='selectMon diplay-no'>"
        + getMonList()+"</div>"+
        "<span class='fl prv-month' onclick=prevMonth("+The_Year+"," + The_Month + ")  href='javascript:;'></span><span class='fr next-month' onclick=nextMonth("+The_Year+"," + The_Month + ") href='javascript:;'></span></div>";

    $(".calendar-head").html(showHeader);
    showStr = "";
    showStr = "<table class='calendar-table'>";
    showStr += "<tr align=center style='background:#efefef'>";
    showStr += "<td>日</td>";
    showStr += "<td>一</td>";
    showStr += "<td>二</td>";
    showStr += "<td>三</td>";
    showStr += "<td>四</td>";
    showStr += "<td>五</td>";
    showStr += "<td>六</td>";
    showStr += "</tr><tr>";
    for (i=1; i<=firstDay; i++){
        showStr += "<td align=center style='background:#efefef'> </td>";
    }
    for (i=1; i<=Month_Day; i++) {
        if ((The_Year==today.getFullYear()) && (The_Month==today.getMonth()+1) && (i==today.getDate())){
            showStr+="<td align='center' class='day-current' data-tag="+The_Year+"-"+The_Month+"-"+i+">"+i+"</td>";
        }
        else {
            showStr+="<td align='center' data-day="+i+" data-tag="+The_Year+"-"+The_Month+"-"+i+">"+i+"</td>";
        }
        firstDay = (firstDay + 1)%7;
        if ((firstDay==0) && (i!=Month_Day)) showStr += "</tr><tr>";
    }
    if (firstDay!=0) {
        for (i=firstDay; i<7; i++)
            showStr += "<td align=center style='background:#efefef'> </td>";
        showStr += "</tr>";
    }
    showStr += "</tr></table>";
    document.getElementById("calendar-body").innerHTML = showStr;
    //下拉选择年份的时候显示日历
    $(".selectYear").find("li").on("click",function(){
        ShowCalendar(parseInt($(this).text()),The_Month,The_Day,GetWeekday(parseInt($(this).text()),The_Month));
    });
    //下拉选择月份的时候显示日历
    $(".selectMon").find("li").on("click",function(){
        ShowCalendar(The_Year,parseInt($(this).text()),The_Day,GetWeekday(The_Year,parseInt($(this).text())));
    });
}
var The_Year,The_Day,The_Month;
var today;
var firstDay;
today = new Date();
The_Year = today.getFullYear();
The_Month = today.getMonth() + 1;
The_Day = today.getDate();
firstDay = GetWeekday(The_Year,The_Month);
ShowCalendar(The_Year,The_Month,The_Day,firstDay);









