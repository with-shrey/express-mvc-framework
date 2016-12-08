var models = require('../models');
var sequelize = require('../common/mysql');
var Task = models.Task;
var User = models.User;
var TaskCategory = models.TaskCategory;

exports.getAllTasksQuery = function(query, callback) {
	if (name.length === 0) return callback(null, []);
	Task.findAll({
		attributes: ['*', [sequelize.fn('COUNT', sequelize.col('*')), 'totalCount']],
		include: [{
			model: Task,
			where: {
				user_id: sequelize.col('User.id')
			}
		}, {
			model: Task,
			where: {
				task_category_id: sequelize.col('TaskCategory.id')
			}
		}]
	}).then(function() {

	})
}