var express = require('express');
var router = express.Router();
var models = require('../models');
var applicationDAO = require('../dao/applicationDAO');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');


router.post('/add', auth, (req, res) => {
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
        "candidateId": candidateId,
        "interviewId": req.body.interviewId,
        "status": req.body.status,
    };


    dao.create(newApplication, (err, application) => {
        if (err) {
            res.status(404).json({
                "Error": err.message
            });
        }
        else {
            res.status(200).json(
                { "application": application }
            );
        }
    });

});


router.post('/count', auth, (req, res) => {
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

    dao.countApplications(interviewId, (err, result) => {
        if (err) {
            res.status(404).json({
                "Error": err.message
            });
        }
        else {
            res.status(200).json({
                "count": result
            });
        }
    });


});

router.post('/verify', auth, (req, res) => {
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

    dao.verifyApplication(interviewId, candidateId, (err, result) => {
        if (err) {
            res.status(404).json({
                "Error": err.message
            });
        }
        else {
            res.status(200).json({
                "count": result
            });
        }
    });
});

router.get('/:id', auth, (req, res) => {

    var dao = new applicationDAO(models);
    var interviewId = req.params.id;

    dao.getApplications(interviewId, (err, result) => {
        if (err) {
            res.status(404).json({
                "Error": err.message
            });
        } else {
            res.status(200).json(result);
        }
    });

});

router.get('/getDetailedApplication/:id', auth, (req, res) => {
    var dao = new applicationDAO(models);
    var applicationId = req.params.id;
    dao.getApplication(applicationId, (err, result) => {
        if (err) {
            res.status(404).json({
                "Error": err.message
            });
        } else {
            res.status(200).json({
                "application": result
            });
        }
    });

});

router.post('/getCandidateApps', auth, (req, res) => {
    var dao = new applicationDAO(models);
    const decoded = jwt.verify(req.get('x-auth-token'), process.env.KEY);
    var candidateId = decoded.id;
    dao.getCandidateApplications(candidateId, (err, result) => {
        if (err) {
            res.status(404).json({
                "Error": err.message
            });
        } else {
            res.status(200).json({
                "applications": result
            })
        }
    });

});

router.put('/updateStatus', auth, (req, res) => {
    var dao = new applicationDAO(models);

    if (!req.body)
    return res.status(404).json({ 'Error': 'There is no updating data' });

    var status = req.body.status;
    var explanation = req.body.explanation;
    var id = req.body.id;

    if(status == "Pending"){
        dao.updateApplication(id, status, null, (err, application) => {
            try {
                if (err) return res.status(404).json({
                    "Error": err.message
                })
                else return res.status(200).json({
                    application: application
                })
            } catch (error) {
                return res.status(404).json({
                    "Error": err.message
                })
            }
        });
    }else{
        dao.updateApplication(id, status, explanation, (err, application) => {
            try {
                if (err) return res.status(404).json({
                    "Error": err.message
                })
                else return res.status(200).json({
                    application: application
                })
            } catch (error) {
                return res.status(404).json({
                    "Error": err.message
                })
            }
        });
    }

    
});

module.exports = router;