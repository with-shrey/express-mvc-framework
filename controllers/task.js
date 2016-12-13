var Task = require('../services').Task;
var config = require('../config');
var async = require('async');

exports.list = (req, res, next) => {
	var query = {};
	query.userId = req.query.userId;
	query.keyword = req.query.keyword;
	var pageNum = query.pageNum = req.query.pageNum;
	var pageSize = query.pageSize = req.query.pageSize || 10;
	console.log(req.query);
	async.series({
		total: (cb) => {
			Task.getTotalCount(query, (rows) => {
				cb(null, rows[0].totalCount);
			});
		},
		list: (cb) => {
			Task.getAllTasksQuery(query, (rows) => {
				cb(null, rows[0])
			});
		}

	}, (err, ret) => {
		var totalCount = ret.total;
		var totalPage = totalCount % pageSize == 0 ? totalCount / pageSize : Math.ceil(totalCount / pageSize);
		var data = {
			status: "success",
			list: ret.list,
			totalCount: ret.totalCount,
			pageNum: pageNum,
			pageSize: pageSize,
			totalPage: totalPage
		};
		res.json(data);
	});

};

exports.getOne = (req, res, next) => {
	var task_id = req.query.task_id;
	Task.getOneTasksQuery(task_id, (rows) => {
		if (!rows || !rows.length) {
			res.json({
				"status": "failed",
				"task": null
			})
		} else {
			res.json({
				"status": "success",
				"task": rows[0]
			})
		}
	})
};