/*user model*/
var Sequelize = require('sequelize')
var sequelize = require('../common/mysql')
var User = require('./user')

var Notice = sequelize.define('notice', {
	id: {
		type: Sequelize.BIGINT(11),
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	content: {
		type: Sequelize.STRING(240),
		allowNull: false,
		comment: '消息内容'
	},
	notice_date: {
		type: Sequelize.DATE,
		allowNull: false,
		comment: '消息日期'
	},
	is_read: {
		type: Sequelize.BIGINT(11),
		defaultValue: 0,
		comment: '所属任务,外键'
	},
	user_id: {
		type: Sequelize.BIGINT(11),
		allowNull: false,
		references: {
			model: User,
			key: 'id'
		},
		comment: '消息所属人, 外键'
	}

});

module.exports = Notice