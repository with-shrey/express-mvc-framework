$("#btnSubmit").click(function() {
    var username = $.trim($("#username").val());
    var name = $.trim($("#name").val());
    if(username === "" || name === "") {
        alert("用户名和姓名都不能为空！");
        return;
    }
    $.ajax({
        url : "/test/addUser",
        method : "POST",
        dataType : "json",
        data : {
            username : username,
            name : name
        },
        success : function(ret) {
            if(ret.status === "success") {
                alert("添加用户成功！");
                location.reload();
            } else {
                alert("添加失败！");
            }
        }
    });
});
$("table").on("click", ".del-user", function() {
    
});