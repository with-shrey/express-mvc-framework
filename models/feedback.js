/*user model*/
var Sequelize = require('sequelize')
var sequelize = require('../common/mysql')
var User = require('./user')
var Task = require('./task')

var Feedback = sequelize.define('feedback', {
	id: {
		type: Sequelize.BIGINT(11),
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	content: {
		type: Sequelize.STRING(240),
		allowNull: false,
		comment: '反馈内容'
	},
	feedback_date: {
		type: Sequelize.DATE,
		allowNull: false,
		comment: '反馈日期'
	},
	task_id: {
		type: Sequelize.BIGINT(11),
		allowNull: false,
		references: {
			model: Task,
			key: 'id'
		},
		comment: '所属任务,外键'
	},
	user_id: {
		type: Sequelize.BIGINT(11),
		allowNull: false,
		references: {
			model: User,
			key: 'id'
		},
		comment: '反馈人, 外键'
	}

});

module.exports = Feedback