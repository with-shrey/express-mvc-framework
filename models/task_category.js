/*user model*/
var Sequelize = require('sequelize');
var sequelize = require('../common/mysql');

var TaskCategory = sequelize.define('task', {
	id: {
		type: Sequelize.INTEGER(11),
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	name: {
		type: Sequelize.STRING(100),
		allowNull: false,
		comment: '类别名称'
	},
	weight: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		comment: '权重'
	}

});

module.exports = TaskCategory