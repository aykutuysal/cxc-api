
exports.createResponse = function(data, success, err) {
	response = new Object();
	response.success = success;
	response.data = data;
	response.errors = err;
	return response;
};


exports.sendResponse = function(res, data, success, err) {
	response = new Object();
	response.success = success;
	response.data = data;
	response.errors = err;
	res.jsonp(response);
};