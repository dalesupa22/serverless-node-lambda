'use strict';
const mongoose = require('mongoose');
require('mongoose').set('debug', true);

var houseFunctions = require('./functions/houseFunctions');
var ObjectID = mongoose.Types.ObjectId;






module.exports.generateReports = (event, context, callback) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Go Serverless v1.0! Your function executed successfully!',
            input: event,
        }),
    };

    callback(null, response);
};


