
var searchBoxInput=document.getElementById("search_box_input");
var searchBoxMore=document.getElementById("search_box_more");
EventUtil.addHandler(searchBoxInput,"click",function(e){
    EventUtil.preventDefault(e);
    if(searchBoxMore.style.display=="none"){
        searchBoxMore.style.display="block";
        searchBoxInput.style.background="#ffffff";
        searchBoxInput.defaultValue="";
    }else {
        searchBoxMore.style.display="none";
        searchBoxInput.style.background="#FAF7F7";
        searchBoxInput.defaultValue="";
    }
});


var loginBtn=document.getElementById("login_btn");
var noticeLogin=document.getElementById("notice_login");
var loginPage=document.getElementById("login_page");
var zindex=document.getElementById("z-index_100");
var remove=document.getElementById("removeImag");
var messageTab=document.getElementById("message_tab");

EventUtil.addHandler(loginBtn,"click",function(e){
    zindex.style.display="block";
    loginPage.style.display="block";
    EventUtil.stopPropagation(e);
});
EventUtil.addHandler(noticeLogin,"click",function(e){
    messageTab.style.display="none";
    zindex.style.display="block";
    loginPage.style.display="block";
    EventUtil.preventDefault(e);//�˴����a��ǩ��Ĭ���¼�����ע�⣬����ҳ�潫һ������
});
EventUtil.addHandler(remove,"click",function(e){
    zindex.style.display="none";
    loginPage.style.display="none";
    EventUtil.stopPropagation(e);
});


var otherwiseLogin=document.getElementById("otherwise_login");
var otherwiseLogin_text=document.getElementById("otherwise_login_text");
var otherwiseLogin_icon=document.getElementById("otherwise_login_icon");
var loginIndexIcon1=document.getElementById("login_indexIcon1");
var loginIndexIcon2=document.getElementById("login_indexIcon2");

EventUtil.addHandler(otherwiseLogin,"click",function(e){
    otherwiseLogin_text.style.display="none";
    otherwiseLogin_icon.style.display="block";
    loginIndexIcon1.style.display="none";
    loginIndexIcon2.style.display="block";
    EventUtil.stopPropagation(e);
});
EventUtil.addHandler(loginIndexIcon1,"click",function(e){
    otherwiseLogin_text.style.display="none";
    otherwiseLogin_icon.style.display="block";
    loginIndexIcon1.style.display="none";
    loginIndexIcon2.style.display="block";
    EventUtil.stopPropagation(e);
});
EventUtil.addHandler(loginIndexIcon2,"click",function(e){
    otherwiseLogin_text.style.display="block";
    otherwiseLogin_icon.style.display="none";
    loginIndexIcon2.style.display="none";
    loginIndexIcon1.style.display="block";
    EventUtil.stopPropagation(e);
});


var remenberMeIcon1=document.getElementById("remenberMe_icon1");
var remenberMeIcon2=document.getElementById("remenberMe_icon2");

EventUtil.addHandler(remenberMeIcon1,"click",function(e){
    remenberMeIcon1.style.display="none";
    remenberMeIcon2.style.display="block";
    EventUtil.stopPropagation(e);
});
EventUtil.addHandler(remenberMeIcon2,"click",function(e){
    remenberMeIcon2.style.display="none";
    remenberMeIcon1.style.display="block";
    EventUtil.stopPropagation(e);
});








