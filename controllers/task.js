var Task = require('../services').Task;
var config = require('../config');

exports.list = (req, res, next) => {
	var query = {};
	query.userId = req.query.userId;
	query.keyword = req.query.keyword;
	query.pageNum = req.query.pageNum;
	query.pageSzie = req.query.pageSize || 10;
	Task.getTotalCount(query, (err, data) => {
		console.log(data);
		Task.getAllTasksQuery(query, (err, data) => {
			console.log(data);
		})
	})
}