/**
 * 任务列表
 */
+ function() {
	var taskList = {
		init: function() {
			this.initUI();
			this.bindUI();
		},
		initUI: function() {

		},
		bindUI: function() {
			//页面加载获取所有任务
			getAllTasks(1, 10);

			$('.my-tasks').on('click', function() {
				var userId = user.userId;
				getSelfTasks(userId, 1, 10)
			});

			$('.all-tasks').on('click', function() {
				getAllTasks(1, 10);
			});

			$('#search').on('keyup', function(event) {
				var keyword = $.trim($(this).val());
				if(keyword == 0) {
					return;
				};
				if(event.keyCode == 13) {
					if(!$('.all-tasks').hasClass('active')){
						$('.all-tasks').trigger('click');
					}
					getTasksByName(keyword, 1, 10);
					
				}
				
			})

			/**
			 * 渲染所有任务模版
			 * @param data 数据源
			 * @param type 任务类型 1 所有任务 0 自己任务
			 */
			var allTaskList = function(data, type) {
				if(type === 1) {
					var html = template('tasksTpl', data);
					document.getElementById('taskContainer').innerHTML = html;
				} else if(type === 0) {
					var html = template('selfTasksTpl', data);
					document.getElementById('selfTask').innerHTML = html;
				};
				//根据权限判断
				if(user.role === 0) {
					$('.mng-mod').show();
					$('.self-mod').hide();
				} else {
					$('.mng-mod').hide();
					$('.self-mod').show();
				}
			};

			//总任务分页
			var PageClick = function(pageclickednumber) {
				getAllTasks(pageclickednumber, 10);
			};
			//自己任务
			var selfPageClick = function(pageclickednumber) {
				getSelfTasks(2, pageclickednumber, 10);
			};

			/**
			 * 分页获取所有任务
			 */
			function getAllTasks(pageNum, pageSize) {
				$.ajax({
					url: '/api/task/list',
					type: 'get',
					dataType: 'json',
					data: {
						pageNum: pageNum,
						pageSize: pageSize
					},
					success: function(data) {
						if(data.status == 'success') {
							allTaskList(data, 1);
							$("#pager").pager({
								pagenumber: pageNum,
								pagecount: data.totalPage,
								buttonClickCallback: PageClick
							});
						}

					}
				});
			}

			function getSelfTasks(userId, pageNum, pageSize) {
				$.ajax({
					url: '/api/task/list',
					type: 'get',
					dataType: 'json',
					data: {
						userId: userId,
						pageNum: pageNum,
						pageSize: pageSize
					},
					success: function(data) {
						if(data.status == 'success') {
							allTaskList(data, 0);
							$("#pager-self").pager({
								pagenumber: pageNum,
								pagecount: data.totalPage,
								buttonClickCallback: selfPageClick
							});
						}

					}
				});
			}
			/**
			 * 根据关键字分页查询任务
			 * @param {Object} keyword
			 * @param {Object} pageNum
			 * @param {Object} pageSize
			 */
			function getTasksByName(keyword, pageNum, pageSize) {
				$.ajax({
					url: '/api/task/list',
					type: 'get',
					dataType: 'json',
					data: {
						keyword: keyword,
						pageNum: pageNum,
						pageSize: pageSize
					},
					success: function(data) {
						if(data.status == 'success') {
							var html = template('tasksTpl', data);
							document.getElementById('taskContainer').innerHTML = html;
							$("#pager").pager({
								pagenumber: pageNum,
								pagecount: data.totalPage,
								buttonClickCallback: selfPageClick
							});
						}

					}
				});
			}

		}
	};

	//初始化
	$(function() {
		taskList.init();
	});

}();