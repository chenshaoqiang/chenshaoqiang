/**
 * Created by wbxiaoxz on 2016/12/22 0022.
 */
$(function () {
    var state = localStorage.getItem('login_or_register');
    if (state == 'login'){
        $('.login-overview').show();
        $('#login-li').addClass('active');
    }else if(state == 'register'){
        $('#register-li').addClass('active');
        $('.register-overview').show();
    }
});
$('#login-li').click(function () {
    localStorage.setItem('login_or_register','login');
    $('#login-li').addClass('active');
    $('#register-li').removeClass('active');
    $('.login-overview').show();
    $('.register-overview').hide();
});
$('#register-li').click(function () {
    localStorage.setItem('login_or_register','register');
    $('#register-li').addClass('active');
    $('#login-li').removeClass('active');
    $('.register-overview').show();
    $('.login-overview').hide();
});
$('#actfloating').click(function () {
    $('#actForm').addClass('hide');
    $('#actModal').removeClass('hide');
});
$('#returnRegist').click(function () {
    $('#actForm').removeClass('hide');
    $('#actModal').addClass('hide');
});
function login() {
    var email = $("#email").val();
    var password = $("#password").val();
    var emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    var data = {"email": email, "password": password};
    if(emailReg.test(data.email)&&data.password!=''){
        handleSubmit(data);
    }else{
        swal("提示","请填写正确的的邮箱和密码")
    }
}
function register() {
    var email = $("#email-register").val();
    var password = $("#password-register").val();
    var confirmPassword = $("#confirm-password").val();
    var institution = $("#institution").val();
    var code = $("#code").val();
    var emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    var data = {
        "email": email,
        "password": password,
        "institution": institution,
        "inviteCode":code
    };
    if(emailReg.test(data.email)&&data.password!=''){
        if(password==confirmPassword){
            handleRegister(data);
        }else{
            swal("提示","两次密码输入不一致！");
        }
    }else{
        swal("提示","请填写正确的的邮箱和密码")
    }
}
$('#login').on('click',login);
$('#register').on('click',register);

document.onkeydown=banEnter;
function banEnter(e){
    var ev = e || window.event || arguments.callee.caller.arguments[0];
    if(ev && ev.keyCode==13){
        var state = localStorage.getItem('login_or_register');
        if (state == 'login'){
            login();
        }else if(state == 'register'){
            register();
        }
    }
}
function handleSubmit(data){
    $.ajax({
        type: 'post',
        url: "/onecloud-openapi-platform/user/login",
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function(res){
            if(res.flag=='000000'){
                //登录跳转
                window.location.href = '/onecloud-openapi-platform/content.html';
            }else{
                swal("提示",res.desc);
            }
        },
        error: function(){
            swal("提示",res.desc,"error");
        }
    });
}
function handleRegister(data){
    $.ajax({
        type: 'post',
        url: "/onecloud-openapi-platform/user/register",
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function(res){
            if(res.flag=='000000'){
                swal("恭喜", "注册成功！", "success")
            }else{
                swal("提示",res.desc);
            }
        },
        error: function(){
            swal("提示",res.desc,"error");
        }
    });
}