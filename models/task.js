/*user model*/
var Sequelize = require('sequelize');
var sequelize = require('../common/mysql');
var User = require('./user');
var TaskCategory = require('./task_category');

var Task = sequelize.define('task', {
	id: {
		type: Sequelize.BIGINT(11),
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	name: {
		type: Sequelize.STRING(100),
		allowNull: false,
		comment: '任务名称'
	},
	start_date: {
		type: Sequelize.DATE,
		allowNull: false,
		comment: '开始日期'
	},
	end_date: {
		type: Sequelize.DATE,
		comment: '结束日期'
	},
	expect_date: {
		type: Sequelize.DATE,
		allowNull: false,
		comment: '预计完成日期'
	},
	complete_day: {
		type: Sequelize.BIGINT(11),
		comment: '实际完成天数'
	},
	quality: {
		type: Sequelize.FLOAT(2, 1),
		comment: '完成质量 0-2值, 1表示标准质量'
	},
	url: {
		type: Sequelize.STRING(200),
		comment: '项目链接地址'
	},
	status: {
		type: Sequelize.ENUM('1', '2', '3', '4'),
		comment: '任务状态:1.进行中 2.待确认 3.已完成'
	},
	description: {
		type: Sequelize.STRING(200),
		comment: '任务描述'
	},
	task_category_id: {
		type: Sequelize.BIGINT(11),
		references: {
			model: TaskCategory,
			key: 'id'
		},
		comment: '任务类别, 外键'
	},
	user_id: {
		type: Sequelize.BIGINT(11),
		references: {
			model: User,
			key: 'id'
		},
		comment: '负责人, 外键'
	},
	score: {
		type: Sequelize.BIGINT(11),
		comment: '积分'
	}

});

module.exports = Task