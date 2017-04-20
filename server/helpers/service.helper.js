var request = require('request');

var Q = require('q');

let service = {};

service.post = returnPostRequest;
service.get = returnGetRequest;
service.put = returnPutRequest;
service.delete = returnDeleteRequest;
service.options = Options;

module.exports = service;

function returnGetRequest(options) {
	var deferred = Q.defer();
  request.get(options, function (error, response, body){
    if (error) {
      deferred.reject(error);
    }
    if (response.body) {
        deferred.resolve(response.body);
    } else {
      deferred.resolve();
    }
  });
  return deferred.promise;
}

function returnPostRequest(options) {
  console.log(options);
  var deferred = Q.defer();
  request.post(options, function (error, response, body){
    if (error) {
        deferred.reject(error);
    }
    if (response.body) {
        deferred.resolve(response.body);
    } else {
        deferred.resolve();
    }
  });
  return deferred.promise;
}

function returnPutRequest(options) {
  var deferred = Q.defer();
  request.put(options, function (error, response, body){
    if (error) {
        deferred.reject(error);
    }
    if (response.body) {
        deferred.resolve(response.body);
    } else {
        deferred.resolve();
    }
  });
  return deferred.promise;
}

function returnDeleteRequest(options) {
  var deferred = Q.defer();
  request.delete(options, function (error, response, body){
    if (error) {
        deferred.reject(error);
    }
    if (response.body) {
        deferred.resolve(response.body);
    } else {
        deferred.resolve();
    }
  });
  return deferred.promise;
}

function Options(appId, token, url, data, params) {
  return {
    url: url,
    headers : getHeaders(appId, token),
    json: data,
    qs: params
  }
}