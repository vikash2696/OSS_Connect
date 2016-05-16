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

module.exports = service1;

function create(userParam) {
	

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

