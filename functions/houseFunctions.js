'use strict';
const mongoose = require('mongoose');
const constants = require('./Contants');
require('mongoose').set('debug', true);


const userModel = require('../models/User');

const tripsModel = require('../models/House');

const allianceModel = require('../models/Alliance');

const mongoString = 'mongodb://miaguila:RZxVxZNMnwj8ms9H@52.204.156.26:27017/modules'; // MongoDB Url
var ObjectID = mongoose.Types.ObjectId;
var moment=require('moment-timezone');


module.exports = {
    getReportUsersTripsAllUsers: function(startDate, endDate, limit,fromNumberParam,toNumberParam) {
        var limitQuery = constants.QUERY_LIMIT;
        var fromNumber = constants.FROM_NUMBER;
        var toNumber = constants.TO_NUMBER;
        var fromDate=constants.FROM_DATE;
        var toDate=moment().tz('UTC').format();

        if (limit !== undefined && limit != 0 && limit != -1) limitQuery = limit
        if (fromNumberParam !== undefined &&  fromNumberParam != -1) fromNumber = fromNumberParam
        if (toNumberParam !== undefined && toNumberParam != 0 && toNumberParam != -1) toNumber = toNumberParam
        if (startDate !== undefined) fromDate = new Date(startDate)
        if (endDate !== undefined) toDate = new Date(endDate)


        return tripsModel.aggregate([

            {
                $match: {
                    createdAt: {
                        $gte: fromDate,
                        $lte: toDate
                    }
                }
            },

            {
                $group: {
                    _id: "$requester_id",
                    count: {
                        $sum: 1
                    }
                }
            }
            ,{$match:{ count: {$gte:fromNumber, $lte: toNumber} }}

            , {
                $sort: {
                    "count": -1
                }}
            , {
                $limit: limitQuery
            }
        ]).exec().then(function (queryResut) {
            if(queryResut!==undefined){
                for(var i=0;i<queryResut.length;i++){
                    queryResut[i].userid=queryResut[i]._id;
                    queryResut[i]._id=undefined;
                }
            }
            return queryResut;
        });

    },
    getReportUsersTripsByUsersId: function(startDate, endDate, usersIds, limit,fromNumberParam,toNumberParam) {
        var limitQuery = constants.QUERY_LIMIT;
        var fromNumber = constants.FROM_NUMBER;
        var toNumber = constants.TO_NUMBER;
        var fromDate=constants.FROM_DATE;
        var toDate=moment().tz('UTC').format();

        if (limit !== undefined && limit != 0 && limit != -1) limitQuery = limit
        if (fromNumberParam !== undefined &&  fromNumberParam != -1) fromNumber = fromNumberParam
        if (toNumberParam !== undefined && toNumberParam != 0 && toNumberParam != -1) toNumber = toNumberParam
        if (startDate !== undefined) fromDate = new Date(startDate)
        if (endDate !== undefined) toDate = new Date(endDate)


        return tripsModel.aggregate([

            {
                $match: {
                    createdAt: {
                        $gte: fromDate,
                        $lte: toDate
                    },
                    requester_id: {
                        $in: usersIds
                    }
                }
            },

            {
                $group: {
                    _id: "$requester_id",
                    count: {
                        $sum: 1
                    }
                }
            }
            ,{$match:{ count: {$gte:fromNumber, $lte: toNumber} }}

            , {
                $sort: {
                    "count": -1
                }}
            , {
                $limit: limitQuery
            }
        ]).exec().then(function (queryResut) {
            if(queryResut!==undefined){
                for(var i=0;i<queryResut.length;i++){
                    queryResut[i].userid=queryResut[i]._id;
                    queryResut[i]._id=undefined;
                }
            }
            return queryResut;
        });

    }

}