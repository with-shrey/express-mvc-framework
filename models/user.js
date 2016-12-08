/*user model*/
var Sequelize = require('sequelize');
var sequelize = require('../common/mysql');

var User = sequelize.define('user', {
	id: {
		type: Sequelize.INTEGER(11),
		autoIncrement: true,
		primaryKey: true,
		unique: true,
		allowNull: false
	},
	username: {
		type: Sequelize.STRING(50),
		allowNull: false,
		unique: true,
		comment: '用户名'
	},
	password: {
		type: Sequelize.STRING(50),
		allowNull: false,
		comment: '密码'
	},
	role: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		comment: '角色'
	},
	name: {
		type: Sequelize.STRING(50),
		allowNull: false,
		comment: '姓名'
	},
	photo: {
		type: Sequelize.STRING(200),
		comment: '头像'
	}

});

module.exports = User