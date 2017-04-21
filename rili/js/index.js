

Date.prototype.Format = function (fmt) {
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
};
//生成年份下拉列表
function getYearList(){
    var yearList="";
    for(var i=0;i<parseInt((new Date).getFullYear()-2011);i++){
        yearList+="<li>"+parseInt((new Date).getFullYear()-i)+"</li>";
    }
    yearList="<ul>"+yearList+"</ul>";
    return yearList;
}
//生成月份下拉列表
function getMonList(){
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
        $(".selectYear").addClass("diplay-sty");
    }
    if($(ev.target).attr("class")!="time2-span"){
        $(".selectMon").addClass("diplay-sty");
    }
});
function showHide1(){
    $(".selectYear").toggleClass("diplay-sty");
}
function showHide2(){
    $(".selectMon").toggleClass("diplay-sty");
}
//平年闰年的判断
function RunNian(The_Year)
{
    if ((The_Year%0==0) || ((The_Year%4==0) && (The_Year%0!=0)))
        return true;
    else return false;
}
//计算年The_Year月The_Month的1号是星期几，比如，1997年3月1号是星期几
function GetWeekday(The_Year,The_Month)
{
    var Allday, y, i;
    //计算星期的公式S=x-1+[(x-1)/4]-[(x-1)/100]+[(x-1)/400]+C
    //x：公历的年，C：包含当天（此处是1号）在内的日期的天数，即当天是当年的第几天
    y = The_Year - 1;//y:x-1
    //先计算y+[y/4]-[y/100]+[y/400]+1，因为此处是1号，所以最后是加1，假如要计算5号，就是加5
    Allday = y + Math.floor(y/4) - Math.floor(y/100) + Math.floor(y/400) + 1;

    //计算加C，其中，C已经在上述计算中包含了当天的日期 ：1，假如是5号，就已经包含了加5
    for (i=1; i<The_Month; i++)
    {
        switch (i)
        {
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
function chooseday(The_Year,The_Month,The_Day)
{
    var Firstday;
    var completely_date;
    if (The_Day!=0) completely_date = The_Year + "-" + The_Month + "-" + The_Day;
    else completely_date = "No Choose";
    //showdate 只是一个为了显示而采用的东西，（这是原文的注释）
    //如果外部想引用这里的时间，可以通过使用 completely_date引用完整日期
    //也可以通过The_Year,The_Month,The_Day分别引用年，月，日
    //当进行月份和年份的选择时，认为没有选择完整的日期
    // document.getElementById("showdate").innerText = completely_date;
    Firstday = GetWeekday(The_Year,The_Month);
    ShowCalendar(The_Year,The_Month,The_Day,Firstday);
}
function nextmonth(The_Year,The_Month) //下一年
{
    if (The_Month==12) {
        chooseday(The_Year+1,1,0);
        $('a[data-year='+(The_Year-0+1)+']').addClass('current').siblings('a').removeClass('current');
    }else {
        chooseday(The_Year,The_Month+1,0);
        $('a[data-year='+The_Year+']').addClass('current').siblings('a').removeClass('current');
    }
}
function prevmonth(The_Year,The_Month) //上一年
{
    if (The_Month==1){
        chooseday(The_Year-1,12,0);
        $('a[data-year='+(The_Year-1)+']').addClass('current').siblings('a').removeClass('current');
    }else{
        chooseday(The_Year,The_Month-1,0);
        $('a[data-year='+The_Year+']').addClass('current').siblings('a').removeClass('current');
    }
}
function prevyear(The_Year,The_Month) //上一月
{
    chooseday(The_Year-1,The_Month,0);
}
function nextyear(The_Year,The_Month) //下一月
{
    chooseday(The_Year+1,The_Month,0);
}
//显示日历
function ShowCalendar(The_Year,The_Month,The_Day,Firstday)
{
    var showstr;
    var showHeader;
    var Month_Day;
    var ShowMonth;
    var today;
    var M=The_Month;
    if(The_Month<10){
        M=0+''+M
    }
    getDocByYearsAndM(The_Year+'-'+M);
    today = new Date();
    switch (The_Month)
    {
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
    showHeader+="<div class='currenttime1'>"+"<div class='time1-span' onclick=showHide1()>"+The_Year+"</div>"
        +"<div class='time1-div'>"+"年"+"</div>"+
        "<div class='selectYear diplay-sty'>"
        +getYearList()+"</div>"
        +"<div class='time2-span' onclick=showHide2()>"+The_Month+"</div>"
        +"<div class='time2-div'>"+"月"+"</div>"+
        "<div class='selectMon diplay-sty'>"
        + getMonList()+"</div>"+
        "<span class='fl prvm' onclick=prevmonth("+The_Year+"," + The_Month + ")  href='javascript:;'></span><span class='fr nextm' onclick=nextmonth("+The_Year+"," + The_Month + ") href='javascript:;'></span></div>";

    $(".riliHead").html(showHeader);
    showstr = "";
    showstr = "<table class='table'>";
    showstr += "<tr align=center style='background:#efefef'>";
    showstr += "<td><strong><font>日</font></strong></td>";
    showstr += "<td><strong><font>一</font></strong></td>";
    showstr += "<td><strong><font>二</font></strong></td>";
    showstr += "<td><strong><font>三</font></strong></td>";
    showstr += "<td><strong><font>四</font></strong></td>";
    showstr += "<td><strong><font>五</font></strong></td>";
    showstr += "<td><strong><font>六</font></strong></td>";
    showstr += "</tr><tr>";
    for (i=1; i<=Firstday; i++)
        showstr += "<td align=center style='background:#ffffff'> </td>";
    for (i=1; i<=Month_Day; i++)
    {
        if ((The_Year==today.getFullYear()) && (The_Month==today.getMonth()+1) && (i==today.getDate())){
            showstr+="<td align='center' class='day-current' data-tag="+The_Year+"-"+The_Month+"-"+i+">"+i+"</td>";
        }
        else {
            showstr+="<td align='center' data-day="+i+" data-tag="+The_Year+"-"+The_Month+"-"+i+">"+i+"</td>";
        }
        Firstday = (Firstday + 1)%7;
        if ((Firstday==0) && (i!=Month_Day)) showstr += "</tr><tr>";
    }
    if (Firstday!=0)
    {
        for (i=Firstday; i<7; i++)
            showstr += "<td align=center style='background:#ffffff'> </td>";
        showstr += "</tr>";
    }
    showstr += "</tr></table>";
    document.getElementById("calendc").innerHTML = showstr;
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
var Firstday;
today = new Date();
The_Year = today.getFullYear();
The_Month = today.getMonth() + 1;
The_Day = today.getDate();
Firstday = GetWeekday(The_Year,The_Month);
ShowCalendar(The_Year,The_Month,The_Day,Firstday);

$(".calendarHead a").on('click',function(){
    $(this).addClass('current').siblings('a').removeClass('current');
    var num=$(".calendarHead a").index($(this));
    if(num==0){
        var aThe_Year=$(this).attr("data-year");
        var atoday=new Date(aThe_Year,The_Month-1);
        var aThe_Day = atoday.getDate();
        var aFirstday = GetWeekday(aThe_Year, The_Month);
        var aThe_Day = atoday.getDate();
        ShowCalendar(aThe_Year, The_Month, aThe_Day, aFirstday);
    }else{
        var aThe_Year=$(this).attr("data-year");
        var atoday=new Date(aThe_Year,12);
        var aThe_Day = atoday.getDate();
        var aFirstday = GetWeekday(aThe_Year, 12);
        var aThe_Day = atoday.getDate();
        ShowCalendar(aThe_Year, 12, aThe_Day, aFirstday);
    }

});

function getDocByYearsAndM(yearsAndM){
    timerilixuanze = yearsAndM;
    $.ajax({
        url: "http://59.110.114.71:8090/xuexiph/activitiesController/getDocByYearsAndM.do",
        method: 'post',
        data: {
            'yearsAndM':yearsAndM
        },
        dataType: "jsonp", // 数据类型为jsonp
        jsonp: "jsonpCallback", // 服务端用于接收callback调用的function名的参数
        success: function (data) {
            if (data.code == 200) {
                var d = data.data;
                var html ='';
                var newDate = new Date();
                var timestamp3 = d[0].DOCRELTIME.time;
                newDate.setTime(timestamp3);
                var year=newDate.getFullYear();
                var month=newDate.getMonth()+1;
                var date=newDate.getDate();
                var hour=newDate.getHours();
                var minute=newDate.getMinutes();
                var second=newDate.getSeconds();
                var oldDate =year+"-"+month+"-"+date;
                for(var k=0;k<d.length;k++){
                    var timestamp3 = d[k].DOCRELTIME.time;
                    newDate.setTime(timestamp3);
                    var year=newDate.getFullYear();
                    var month=newDate.getMonth()+1;
                    var date=newDate.getDate();
                    var hour=newDate.getHours();
                    var minute=newDate.getMinutes();
                    var second=newDate.getSeconds();
                    var date = year+"-"+month+"-"+date;
                    if(k==0||oldDate!=date){
                        var huo=[];
                        oldDate=date;
                    }
                    var htmlurl = d[k].DOCPUBURL;
                    htmlurl=htmlurl.substring(0,htmlurl.lastIndexOf('/'));
                    var appfile = '';
                    if(d[k].AnnexList[0]!=undefined){
                        appfile =htmlurl+'/'+d[k].AnnexList[0].APPFILE;
                    }
                    huo.push({"data-curror":k,'title':d[k].DOCTITLE,'text':d[k].DOCCONTENT,'img':appfile  ,'time':date,'href':d[k].DOCPUBURL});
                    $("td[data-tag="+date+"]").css({"background":"#fff3f3"})
                    /* .attr("date",date); */
                    var str = JSON.stringify(huo);
                    $("td[data-tag="+date+"]").attr("date",date).attr('data',str);
                    $("td[data-tag="+date+"]").append('<div id="'+date+'div"></div>');
                    var time1 = new Date().Format("yyyy-MM-dd");
                    if(date==time1){
                        $("#"+date+"div").attr('style','position: absolute; bottom: 0; right: 0;float: right; width: 0; height: 0; border-bottom: 10px solid #ffffff; border-left: 10px solid transparent;');
                    }else{
                        $("#"+date+"div").attr('style','position: absolute; bottom: 0; right: 0;float: right; width: 0; height: 0; border-bottom: 10px solid #e2534b; border-left: 10px solid transparent;');
                    }
                    $("td[data-tag="+date+"]").on("click",function(){
                        var data_=$(this).attr('data');
                        var datas=eval('(' + data_ + ')');
                        var target=$(".calendar-alert-box");
                        target.attr('style','top: 950px;');
                        target.fadeIn();
                        var num=$(this).attr('data-curror');

                        if(datas.length<=1){
                            $(".prev-richeng").attr('style','visibility:hidden');
                            $(".next-richeng").attr('style','visibility:hidden');
                        }else{
                            $(".next-richeng").attr('style','visibility:hidden');
                            $(".prev-richeng").attr('style','visibility:visible');
                        }


                        $("#activr-riqi").attr('data-curror',datas.length-1);      //储存第几个
                        $("#activr-riqi").attr('date',$(this).attr("date"));      //储存第几个
                        var vTime=datas[datas.length-1].time.split("-");
                        target.find('.ryear').html(vTime[0]);
                        target.find('.rmonth').html(vTime[1]);
                        target.find('.rday').html(vTime[2]);
                        target.find('.rtitle').html(datas[datas.length-1].title);
                        target.find('.rtext').html(datas[datas.length-1].text);
                        target.find('.rtext').off().on("click",function(){
                            var target=$(".calendar-alert-box");
                            window.open(target.find('.alert-rili-title.rtitle').attr('href'));
                        });
                        target.find('.rimg').off().on("click",function(){
                            var target=$(".calendar-alert-box");
                            window.open(target.find('.alert-rili-title.rtitle').attr('href'));
                        });
                        target.find('.rimg').attr('src',datas[datas.length-1].img);
                        target.find('.alert-rili-title.rtitle').attr('href',datas[datas.length-1].href);
                    });
                }
            }else if(data.code!=500){//不是查询成功弹出消息
                alert(data.msg);
            }
        }
    });
}
//切换不同日期的弹窗
var currorNumT=$("td[data-curror]").length;
$(".next-richeng").on('click',function(){
    var currorNum=$("#activr-riqi").attr('data-curror');
    var date =$("#activr-riqi").attr("date");
    var data =$("td[data-tag="+date+"]").attr("data");
    var datas=eval('(' + data + ')');

    if(currorNum>=datas.length-2){
        $(".next-richeng").attr('style','visibility:hidden');
        $(".prev-richeng").attr('style','visibility:visible');
    }else{
        $(".next-richeng").attr('style','visibility:visible');
        $(".prev-richeng").attr('style','visibility:visible');
    }

    var target=$(".calendar-alert-box");
    var vTime=datas[parseInt(currorNum)+1].time.split("-");
    target.find('.ryear').html(vTime[0]);
    target.find('.rmonth').html(vTime[1]);
    target.find('.rday').html(vTime[2]);
    target.find('.rtitle').html(datas[parseInt(currorNum)+1].title);
    target.find('.rtext').html(datas[parseInt(currorNum)+1].text);
    target.find('.rimg').attr('src',datas[parseInt(currorNum)+1].img);
    target.find('.rtext').off().on("click",function(){
        var target=$(".calendar-alert-box");
        window.open(target.find('.alert-rili-title.rtitle').attr('href'));
    });
    target.find('.rimg').off().on("click",function(){
        var target=$(".calendar-alert-box");
        window.open(target.find('.alert-rili-title.rtitle').attr('href'));
    });
    target.find('.alert-rili-title.rtitle').attr('href',datas[parseInt(currorNum)+1].href);
    $("#activr-riqi").attr('data-curror',++currorNum);

});
$(".prev-richeng").on('click',function(){
    var currorNum=$("#activr-riqi").attr('data-curror');
    if(currorNum<=1){
        $(".next-richeng").attr('style','visibility:visible');
        $(".prev-richeng").attr('style','visibility:hidden');
    }else{
        $(".prev-richeng").attr('style','visibility:visible');
        $(".next-richeng").attr('style','visibility:visible');
    }

    var date =$("#activr-riqi").attr("date");
    var data =$("td[data-tag="+date+"]").attr("data");
    var datas=eval('(' + data + ')');
    var target=$(".calendar-alert-box");
    var vTime=datas[currorNum-1].time.split("-");
    target.find('.ryear').html(vTime[0]);
    target.find('.rmonth').html(vTime[1]);
    target.find('.rday').html(vTime[2]);
    target.find('.rtitle').html(datas[currorNum-1].title);
    target.find('.rtext').html(datas[currorNum-1].text);
    target.find('.rimg').attr('src',datas[currorNum-1].img);
    target.find('.rtext').off().on("click",function(){
        var target=$(".calendar-alert-box");
        window.open(target.find('.alert-rili-title.rtitle').attr('href'));
    });
    target.find('.rimg').off().on("click",function(){
        var target=$(".calendar-alert-box");
        window.open(target.find('.alert-rili-title.rtitle').attr('href'));
    });
    target.find('.alert-rili-title.rtitle').attr('href',datas[currorNum-1].href);
    $("#activr-riqi").attr('data-curror',--currorNum);
});



// 关闭弹窗
$(".close-map-alert").click(function(){
    $(".calendar-alert-box").fadeOut();
});
