/**
 * 添加任务
 */
+ function() {
	var addTask = {
		init: function() {
			this.initUI();
			this.bindUI();
		},
		initUI: function() {
			//日历控件
			initDatetimepicker();
			//获取日期
			function getDay(index){
			   	var dd = new Date();
			    	dd.setDate(dd.getDate()+index);
			    var y = dd.getFullYear();
			    var m = dd.getMonth()+1;
			    var d = dd.getDate();
			    return y+'-'+m+'-'+d;
			};

			//初始化日历控件
			function initDatetimepicker() {
				var nowDay = getDay(0);
				$('#starttime').datetimepicker({
					locale: 'zh-CN',
					format: 'YYYY-MM-DD',
					defaultDate: nowDay
				});
				$('#endtime').datetimepicker({
					locale: 'zh-CN',
					format: 'YYYY-MM-DD',
					useCurrent: false //Important! See issue #1075
				});
				$('#endtime').data("DateTimePicker").minDate($('#starttime').val());
				$("#starttime").on("dp.change", function(e) {
					$('#endtime').data("DateTimePicker").minDate(e.date);
				});
				$("#endtime").on("dp.change", function(e) {
					$('#starttime').data("DateTimePicker").maxDate(e.date);
				});
			};
		},
		bindUI: function() {
			var config = {};
			//validation configuration
			config.validations = {
				debug: true,
				errorClass: 'has-error',
				validClass: 'success',
				errorElement: "span",

				// add error class
				highlight: function(element, errorClass, validClass) {
					$(element).parents("div.form-group")
						.addClass(errorClass)
						.removeClass(validClass);
				},

				// add error class
				unhighlight: function(element, errorClass, validClass) {
					$(element).parents(".has-error")
						.removeClass(errorClass)
						.addClass(validClass);
				}
			}
			
			//普通用户禁用负责人
			if(user.role !== 0){
				$('#userName').val(user.userId);
				$('#userName').attr('disabled','disabled');
			}
			//页面加载获取任务类型
			getCategory();
			//用户角色
			var role = user.role;
			//添加任务
			$('#addTask').on('click', function() {
				var name = $('#taskName').val();
				var userId = $('#userName').val();
				var startDate = $('#starttime').val();
				var expectDate = $('#endtime').val();
				var url = $('#taskLink').val()||'';
				var taskCategoryId = $('#taskType').val();
				var description = $('#taskDesc').val()||'';
				var addTaskValidationSettings = {
					rules: {
						taskName: {
							required: true
						},
						starttime: "required",
						endtime: "required"
					},
					messages: {
						taskName: {
							required: "任务名称不能为空"
						},
						starttime: "开始日期不能为空",
						endtime: "预计完成日期不能为空"
					}
				};
				$.extend(addTaskValidationSettings, config.validations);
				$('#addTaskForm').validate(addTaskValidationSettings);
				if(name == '' || startDate == '' || expectDate == '') {
					return;
				} else {
					addTask(name, userId, startDate, expectDate, taskCategoryId, url, description);
				}

			});

			function addTask(name, user_id, start_date, expect_date, task_category_id, url, description) {
				$.ajax({
					url: '/api/task/add',
					type: 'post',
					dataType: 'json',
					data: {
						name: name,
						user_id: user_id,
						start_date: start_date,
						expect_date: expect_date,
						task_category_id: task_category_id,
						url: url,
						description: description
					},
					success: function(data) {
						if(data.status == 'success') {
							messageData(user_id,name, role);
							//默认新增反馈
							feedback(data.taskId, user_id,'新增任务');
							var URL = window.location.origin + '/update_task_mng.html?task_id='+data.taskId;
							sendPopo(user.username,name,URL,superAdmin.loginname);
							window.location.href = './task_list.html';
						}
					}
				});
			};
			/**
			 * 新增反馈
			 * @param {Object} taskId
			 */
			function feedback(taskId, userId, content) {
				$.ajax({
					url: '/api/feedback/add',
					type: 'post',
					dataType: 'json',
					data: {
						task_id: taskId,
						user_id: userId,
						content: content
					},
					success: function(data) {
						if(data.status == 'success') {

						}

					}
				});
			}

			function getCategory() {
				$.ajax({
					url: '/api/task/category',
					type: 'get',
					dataType: 'json',
					data: {},
					success: function(data) {
						if(data.status == 'success') {
							var lists = data.datas;
							var html = '';
							for(var i = 0; i < lists.length; i++) {
								html += '<option value="' + lists[i].id + '" data-weight="' + lists[i].weight + '">' + lists[i].name + '</option>';
							}
							$('#taskType').empty().html(html);
						}

					}
				});
			};
			
			/**
			 * 生成新增消息
			 * @param {Object} userId
			 * @param {Object} taskName
			 * @param {Object} role
			 */
			function messageData(userId, taskName, role){
				$.ajax({
					url: '/api/message/add',
					type: 'post',
					dataType: 'json',
					data: {
						user_id: userId,
						name: taskName,
						type: 'add',
						role: role
					},
					success: function(data) {
						if(data.status == 'success') {
							
						}

					}
				});
			};
			
			/**
			 * 新增内容
			 * @param {Object} username 当前用户名
			 * @param {Object} account 管理员popo
			 * @param {Object} msg 消息
			 */
			function sendPopo(username,taskname,url,account){
				var str = username+' 新建了任务"'+taskname+'"';
				var account = account+'@corp.netease.com';
				var options = 'http://220.181.29.178:5820/popo?account='+account+'&msg='+str;
				$.getScript(options.toString());
				if(url){
					var opt2 = 'http://220.181.29.178:5820/popo?account='+account+'&msg='+url;
					$.getScript(opt2);
				}
			}
			
			
			

		}
	};

	//初始化
	$(function() {
		addTask.init();
	});

}();