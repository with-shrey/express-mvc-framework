/**
 * 登录
 */
+function() {
    var login = {
      init: function() {
         this.initUI();
         this.bindUI();
      },
      initUI:function() {

      },
      bindUI: function() {
         	
  		//login
		$('#login-btn').on('click', function(){
			var username = $('#username').val();
			var password = $('#password').val();
			if(username==''||password===''){
				return;
			}else{
				login(username, password);
			}	
		});
		
  		function login(username, password){
		   $.ajax({
		        type : "post",
		        dataType : "json",
		        url : "/api/login",
		        data : {
		            username : username,
		            password : password
		        },
		        success : function(data) {
		            if(data.result) {
		                console.log("登录成功");
		                $('.login-tips').empty().hide();
		                var isRemember = $('#remember').is(':checked');
		                if(isRemember){
		                	$.cookie('username',username,{ expires: 7, path: '/' });
		                };
		                window.location.href = './task_list.html';
		            } else {
		            	$('.login-tips').show().text('用户名密码错误请重新输入');
		            	window.location.href = './login.html';
		            }
		        }
		    });
  		}

      }
    };



  //初始化
  $(function() {
     login.init();
  });

}();