/**
 * Author: Vikash kumar
 */

var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('posttable');

var service1 = {};

service1.create = create;
service1.getstatusData = getstatusData;

module.exports = service1;

function create(userParam) {
	
	userParam.created_at = new Date();
//	console.log(userParam); return;
    var deferred = Q.defer();
    createPost();
    function createPost() {
        db.posttable.insert(
        	userParam,
            function (err, doc) {
                if (err) deferred.reject(err);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function getstatusData() {
    var deferred = Q.defer();
    var collection = db.collection('posttable');
    collection.find().sort({ _id : -1 }).toArray(function(err, status) {
        if (err) deferred.reject(err);
        if (status) {
            deferred.resolve(_.omit(status, 'hash'));
        } else {
            deferred.resolve();
        }
    });

    return deferred.promise;
}
