var express = require('express');
var router = express.Router();
var models = require('../models');
var applicationDAO = require('../dao/applicationDAO');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');

router.post('/add', auth, function (req, res) {
    var dao = new applicationDAO(models);

    const decoded = jwt.verify(req.get('x-auth-token'), process.env.KEY);
	var candidateId = decoded.id;

    var propertiesNames = Object.getOwnPropertyNames(req.body);
    var neededProperties = ["interviewId", "status"];

    propertiesNames.forEach(name => {
        if (neededProperties.indexOf(name) < 0 || propertiesNames.length > neededProperties.length) {
            return res.status(400).json({
                "Error": "Uneeded Input Data"
            });
        }
    });
    if (propertiesNames.length < neededProperties.length)
        res.status(400).json({
            "Error": "Missing Input Data"
        });
    var newApplication = {
        "candidateId" : candidateId,
        "interviewId" : req.body.interviewId,
        "status" : req.body.status,
    };


    dao.create(newApplication, (err, application)=>{
        if (err) {
            res.status(404).json({
                "Error": err.message
            });
        }
        else {
            res.status(200).json(
                {"application": application}
            );
        }
    });

});


router.post('/count', auth, function(req, res){
    var dao = new applicationDAO(models);

    var propertiesNames = Object.getOwnPropertyNames(req.body);
    var neededProperties = ["interviewId"];

    propertiesNames.forEach(name => {
        if (neededProperties.indexOf(name) < 0 || propertiesNames.length > neededProperties.length) {
            return res.status(400).json({
                "Error": "Uneeded Input Data"
            });
        }
    });
    if (propertiesNames.length < neededProperties.length)
        res.status(400).json({
            "Error": "Missing Input Data"
        });
    var interviewId = req.body.interviewId;

    dao.countApplications(interviewId, (err, result)=>{
        if(err){
            res.status(404).json({
                "Error": err.message
            });
        }
        else{
            res.status(200).json({
                "count" : result
             });
        }
    });


});

router.post('/verify', auth, function(req, res){
    var dao = new applicationDAO(models);

    const decoded = jwt.verify(req.get('x-auth-token'), process.env.KEY);
	var candidateId = decoded.id;

    var propertiesNames = Object.getOwnPropertyNames(req.body);
    var neededProperties = ["interviewId"];

    propertiesNames.forEach(name => {
        if (neededProperties.indexOf(name) < 0 || propertiesNames.length > neededProperties.length) {
            return res.status(400).json({
                "Error": "Uneeded Input Data"
            });
        }
    });
    if (propertiesNames.length < neededProperties.length)
        res.status(400).json({
            "Error": "Missing Input Data"
        });
    var interviewId = req.body.interviewId;

    dao.verifyApplication(interviewId, candidateId, (err, result)=>{
        if(err){
            res.status(404).json({
                "Error": err.message
            });
        }
        else{
            res.status(200).json({
                "count" : result
             });
        }
    });
});
module.exports = router;