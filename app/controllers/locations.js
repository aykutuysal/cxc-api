var Mongoose = require('mongoose'),
	_ = require('underscore'),
    Errors = require('../../config/errors.js'),
    Utils = require('../../config/middlewares/utils.js'),
    config = require('../../config/config.js'),
    ElasticJS = require('elastic.js'),
    ElasticNodeClient = require('elastic.js/elastic-node-client');


ElasticJS.client = ElasticNodeClient.NodeClient(config.elastic.serverOptions.host, config.elastic.serverOptions.port);


exports.getUsersNearby = function(req, res) {

	var geoPoint = ElasticJS.GeoPoint();
	geoPoint.array(req.body.location);

	var geoDistanceFilter = ElasticJS.GeoDistanceFilter(config.elastic.checkIn.geoPointField);
	geoDistanceFilter.point(geoPoint);
	geoDistanceFilter.distance(config.elastic.checkIn.distance);

	ElasticJS.Request()
			.filter(geoDistanceFilter)
			.doSearch(

				// success callback
				function(result) {

					if( result.error ) {
						Utils.sendResponse(res, null, false, Errors.errors.custom(result.error) );
						return;
					}

					Utils.sendResponse(res, parseSearchResult(result), true, null);
					return;
				},

				// fail callback
				function(err) {

					Utils.sendResponse(res, null, false, Errors.errors.custom(err) );
					return;
				}
			);

};


parseSearchResult = function(result) {

	console.log(result);

	var response = {};
	var users = [];

	response.total = result.hits.total;
	_.each(result.hits.hits, function(hit) {

		console.log("hit: " + hit);

		if( hit ) {
			var user = {};
			user.indexId = hit._id;
			user.userId = hit._source.userId;
			user.firstname = hit._source.firstname;
			user.lastname = hit._source.lastname;
			user.photo = hit._source.photo;
			user.createDate = hit._source.createDate;
			user.location = hit._source.location;
			users.push(user);
		}

	});
	response.users = users;
	return response;
};