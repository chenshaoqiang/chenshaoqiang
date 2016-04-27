

var topIndexUpload_a=document.getElementById("top_index_upload_a");
var uploadUl=document.getElementById("upload_ul");

topIndexUpload_a.onclick=function(){
    if(uploadUl.style.display=="block"){
        uploadUl.style.display="none";
    }else{
        uploadUl.style.display="block";
    }
};

