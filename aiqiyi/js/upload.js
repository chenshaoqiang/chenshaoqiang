
var docEle = document.getElementsByTagName("body")[0];
var uploadUl=document.getElementById("upload_ul");

EventUtil.addHandler(docEle, "click", function (e) {
    var event = EventUtil.getEvent(e);
    var target = EventUtil.getTarget(event);
    if (target.id == "top_index_upload_a"){
        if(uploadUl.style.display=="block"){
            uploadUl.style.display="none";
        }else{
            uploadUl.style.display="block";
        }
    }else if(target.id != "top_index_upload_a"){
        uploadUl.style.display="none";
    }
});

