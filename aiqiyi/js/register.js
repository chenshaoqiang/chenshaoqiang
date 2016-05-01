
var zindex105 = document.getElementById("z-index_105");
var registerBtn = document.getElementById("register_btn");
var registerPage = document.getElementById("register_page");
var removeImagOfRegister = document.getElementById("removeImag_ofRegister");

EventUtil.addHandler(registerBtn,"click",function(e){
    zindex105.style.display = "block";
    registerPage.style.display = "block";
    EventUtil.stopPropagation(e);
});
EventUtil.addHandler(removeImagOfRegister,"click",function(e){
    zindex105.style.display = "none";
    registerPage.style.display = "none";
    EventUtil.stopPropagation(e);
});


var otherwise = document.getElementById("otherwise_login_two");
var otherwise_text = document.getElementById("otherwise_login_text_two");
var otherwise_icon = document.getElementById("otherwise_login_icon_two");
var loginIcon1 = document.getElementById("login_indexIcon3");
var loginIcon2 = document.getElementById("login_indexIcon4");

EventUtil.addHandler(otherwise,"click",function(e){
    otherwise_text.style.display = "none";
    otherwise_icon.style.display = "block";
    loginIcon1.style.display = "none";
    loginIcon2.style.display = "block";
    EventUtil.stopPropagation(e);
});
EventUtil.addHandler(loginIcon1,"click",function(e){
    otherwise_text.style.display = "none";
    otherwise_icon.style.display = "block";
    loginIcon1.style.display = "none";
    loginIcon2.style.display = "block";
    EventUtil.stopPropagation(e);
});
EventUtil.addHandler(loginIcon2,"click",function(e){
    otherwise_text.style.display = "block";
    otherwise_icon.style.display = "none";
    loginIcon2.style.display = "none";
    loginIcon1.style.display = "block";
    EventUtil.stopPropagation(e);
});


var iAgreeIconOne = document.getElementById("agreeAlliconONE");
var iAgreeIconTwo = document.getElementById("agreeAlliconTWO");
/*console.log(iAgreeIconOne);
console.log(iAgreeIconTwo);*/
EventUtil.addHandler(iAgreeIconOne,"click",function(e){
    alert("1");
    iAgreeIconOne.style.display="none";
    iAgreeIconTwo.style.display="block";
    EventUtil.stopPropagation(e);
});
EventUtil.addHandler(iAgreeIconTwo,"click",function(e){
    alert("2");
    iAgreeIconTwo.style.display="none";
    iAgreeIconOne.style.display="block";
});















