var Mongoose = require('mongoose'),
    Passport = require('passport'),
    CheckIn = Mongoose.model('CheckIn'),
    Errors = require('../../config/errors.js'),
    Utils = require('../../config/middlewares/utils.js'),
    config = require('../../config/config.js'),
    ElasticJS = require('elastic.js'),
    ElasticNodeClient = require('elastic.js/elastic-node-client');


ElasticJS.client = ElasticNodeClient.NodeClient(config.elastic.serverOptions.host, config.elastic.serverOptions.port);


exports.getUserCheckIns = function(req, res) {    
	
    // TO_BE_IMPLEMENTED

};


exports.checkIn = function(req, res) {
 
    var sourceDoc = req.profile.getIndexDocument();
    var location = {
        "lat" : req.body.location[0],
        "lon" : req.body.location[1]
    };
    sourceDoc.location = location;

    var indexDoc = ElasticJS.Document(config.elastic.checkIn.index, config.elastic.checkIn.type);
    indexDoc.source(sourceDoc);
    indexDoc.ttl(config.elastic.checkIn.ttl);
    indexDoc.doIndex(

        function(result) {

            // index success callback
            if( result.error ) {
                Utils.sendResponse(res, null, false, Errors.errors.custom(result.error) );
                return;
            }

            // indexing successful
            // save checkin to db
            checkIn = new CheckIn(req.body);
            checkIn.userId = req.profile.id;
            checkIn.indexId = result._id;

            checkIn.save(function(err){

                if ( err ) {
                    Utils.sendResponse(res, null, false, Errors.errors.custom(err));
                    return;
                }

                Utils.sendResponse(res, checkIn, true, null);
                return;
            });

            console.log("index success : " + JSON.stringify(result));
        },

        function(err) {
            
            // index fail callback
            Utils.sendResponse(res, null, false, Errors.errors.custom(err));
            return;
        }
    );

};


exports.finishCheckIn = function(req, res) {
    
    console.log("started: " + JSON.stringify(req.indexId));

    var indexedDoc = ElasticJS.Document(config.elastic.checkIn.index, config.elastic.checkIn.type, req.indexId);
    indexedDoc.doDelete(
        function(result) {
            
            // delete successfull
            console.log(result);

            Utils.sendResponse(res, true, true, null);
            return;
        },
        function(err) {

            // delete error
            Utils.sendResponse(res, null, false, Errors.custom(err));
            return;
        }
    );
};

exports.populateIndexId = function(req, res, next, id) {
    req.indexId = id;
    next();
};


// NOT_USED
exports.populateCheckIn = function(req, res, next, id) {
    
    CheckIn.findById(id, function(err, checkIn) {

        if (err) {

            if( err.name == "CastError" ) {
                err = Errors.errors.CHECKIN_NOT_FOUND;
            } else {
                err = err.message;
            }
            
            Utils.sendResponse(res, null, false, err);
            return;
        }

        if (!checkIn) {
            Utils.sendResponse(res, null, false, Errors.errors.CHECKIN_NOT_FOUND);
            return;
        }
        
        req.checkIn = checkIn;
        next();
    });
};
