/**
 * 管理员修改任务
 */
+ function() {
	var updateTaksMng = {
		init: function() {
			this.initUI();
			this.bindUI();
		},
		initUI: function() {
			//checkbox单选
			$('input[type=checkbox]').on('click', function() {
				$(this).attr('checked', 'checked').parent().siblings().find('input').removeAttr('checked');
				if($('input[type=checkbox]').first().is(':checked')) {
					$('.reason').show().siblings().hide();
				} else if($('input[type=checkbox]').last().is(':checked')){
					$('.del-reason').show().siblings().hide();
				} else{
					$('.taskSummary').show().siblings().hide();
				};
			})

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
			};

			//页面加载获取任务类型
			getCategory();

			//获取任务详情
			getTaskById(taskId);

			//获取反馈列表
			getFeedbackList(taskId);

			$('#completeDays').on('blur', function() {
				var weight = parseInt($('#taskType option:selected').attr('data-weight'));
				var score = $('#quality').val() * parseInt($(this).val()) * weight;
				$('#score').val(score);
			})

			//修改任务
			$('#modify').on('click', function() {
				var taskName = $('#taskName').val();
				var userId = $('#userName').val();
				var startDate = $('#starttime').val();
				var endDate = $('#endtime').val();
				var taskCategoryId = $('#taskType').val();
				var url = $('#taskLink').val();
				var quality = $('#quality').val();
				var completeDays = $('#completeDays').val();
				var score = $('#score').val();
				var status = $('.status:checked').val();
				var reason = $.trim($('#update-reason').val());
				var updateTaskValidationSettings = {
					rules: {
						taskName: {
							required: true
						},
						starttime: "required",
						endtime: "required",
						"update-reason": "required"
					},
					messages: {
						taskName: {
							required: "任务名称不能为空"
						},
						starttime: "开始日期不能为空",
						endtime: "预计完成日期不能为空",
						"update-reason": "原因不能为空"
					}
				};
				$.extend(updateTaskValidationSettings, config.validations);
				$('#updateTaskForm').validate(updateTaskValidationSettings);
				if(taskName == '' || startDate == '' || endDate == '' || reason == '') {
					return;
				} else {
					updateTask(taskId, taskName, startDate, endDate, completeDays, quality, url, status, taskCategoryId, userId, score);
				}
			});
			//新增反馈
			$('#feedback-submit').on('click', function() {
				var content = $('#feedback-msg').val();
				feedback(taskId, userId, content);
			});

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
			 * 根据任务id查询任务
			 * @param taskid
			 */
			function getTaskById(taskid) {
				$.ajax({
					url: '/api/task/one',
					type: 'get',
					dataType: 'json',
					data: {
						task_id: taskid
					},
					success: function(data) {
						if(data.status == 'success') {
							var taskName = data.task.task_name;
							var startDate = data.task.start_date;
							var endDate = data.task.expect_date;
							var url = data.task.url;
							var userId = data.task.user_id;
							var taskCategoryValue = data.task.task_category_id;
							loginname = data.task.username;
							var score = data.task.score || '';
							var quality = data.task.quality || '1';
							var completeDays = data.task.complete_day || '';
							status = data.task.status;
							if(status == 1) $('.status-doing').show();
							if(status == 2) $('.status-conform').show();
							if(status == 3) {
								$('.status-done').show();
								$('#modify').attr('disabled', 'disabled');
								$('#feedback-submit').attr('disabled', 'disabled');
							}
							if(status == 4) {
								$('.status-danger').show();
								$('#modify').attr('disabled', 'disabled');
								$('#feedback-submit').attr('disabled', 'disabled');
							}
							$('#taskName').val(taskName);
							$('#userName').val(userId);
							$('#taskType').val(taskCategoryValue);
							$('#taskLink').val(url);
							$('#quality').val(quality);
							$('#completeDays').val(completeDays);
							$('#score').val(score);
							initDatetimepicker();
							//初始化日历控件
							function initDatetimepicker() {
								$('#starttime').datetimepicker({
									locale: 'zh-CN',
									format: 'YYYY-MM-DD',
									defaultDate: startDate
								});
								$('#endtime').datetimepicker({
									locale: 'zh-CN',
									format: 'YYYY-MM-DD',
									useCurrent: false, //Important! See issue #1075
									defaultDate: endDate
								});
								$("#starttime").on("dp.change", function(e) {
									$('#endtime').data("DateTimePicker").minDate(e.date);
								});
								$("#endtime").on("dp.change", function(e) {
									$('#starttime').data("DateTimePicker").maxDate(e.date);
								});
							};

						}

					}
				});
			}

			/**
			 * 修改任务
			 */
			function updateTask(taskid, taskName, startDate, endDate, completeDay, quality, url, status, taskCategoryId, userId, score) {
				$.ajax({
					url: '/api/task/mod',
					type: 'post',
					dataType: 'json',
					data: {
						task_id: taskid,
						name: taskName,
						start_date: startDate,
						expect_date: endDate,
						update_date: moment().format('YYYY-MM-DD hh:mm'),
						complete_day: completeDay,
						quality: quality,
						url: url,
						status: status,
						task_category_id: taskCategoryId,
						user_id: userId,
						score: score
					},
					success: function(data) {
						if(data.status == 'success') {
							var feedbackMsg = $.trim($('#update-reason').val());
//							sendPopo(taskName, loginname);
							if(feedbackMsg) {
								feedback(taskId, userId, feedbackMsg);
							}
							window.location.href = './task_list.html';
						}

					}
				});
			}
			var feedbackTpl = function(data) {
				var html = template('feedbackTpl', data);
				document.getElementById('feedback-list').innerHTML = html;
			}

			/**
			 * 根据任务id 获取反馈列表
			 * @param {Object} taskId
			 */
			function getFeedbackList(taskid) {
				$.ajax({
					url: '/api/feedback/list',
					type: 'get',
					dataType: 'json',
					data: {
						task_id: taskid
					},
					success: function(data) {
						if(data.status == 'success') {
							feedbackTpl(data);
						}

					}
				});
			}

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
						content: content,
						user_id: userId
					},
					success: function(data) {
						if(data.status == 'success') {
							window.location.href = './task_list.html';
						}

					}
				});
			}

			/**
			 * 修改内容
			 * @param {Object} account 通知用户
			 * @param {Object} taskname 任务名
			 */
			function sendPopo(taskname, account) {
				var str = '管理员查看了你的任务: ' + taskname;
				var account = account + '@corp.netease.com';
				var options = 'http://220.181.29.178:5820/popo?account=' + account + '&msg=' + str;
				console.log(options);
				$.getScript(options);
			}

		}
	};

	//初始化
	$(function() {
		updateTaksMng.init();
	});

}();