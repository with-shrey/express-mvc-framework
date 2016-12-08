/**
 * 消息列表
 */
+function() {
  var messageList = {
    init: function() {
      this.bindUI();
    },
    bindUI: function() {
      //页面加载获取所有任务
      getAllMsgs(1, 10,user.userId);

      //消息分页
      var PageClick = function(pageclickednumber) {
        getAllMsgs(pageclickednumber,10, user.userId);
      };
      var msgList = function(data){
      		var html = template('msgTpl', data);
          	document.getElementById('message-list').innerHTML = html;
      }

      /**
       * 分页获取所有消息
       */
      function getAllMsgs(pageNum, pageSize,userId){
        $.ajax({
          url: '/api/message/list',
          type: 'get',
          dataType: 'json',
          data: {
          	user_id:  userId,
            pageNum: pageNum,
            pageSize: pageSize
          },
          success: function(data) {
            if(data.status == 'success'){
              msgList(data);
              $("#pager").pager({
                pagenumber: pageNum,
                pagecount: data.totalPage,
                buttonClickCallback: PageClick
              });
            }

          }
        });
      }

    }
  };

  //初始化
  $(function() {
    messageList.init();
  });

}();