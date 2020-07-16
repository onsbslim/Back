var express = require('express');
var router = express.Router();
var models = require('../models');
var questionDao = require('../dao/questionDAO');
const auth = require('../middleware/auth');
const upload = require('../middleware/audio');
const jwt = require('jsonwebtoken');

router.post('/addQuestion', auth,  function (req, res) {
    var dao = new questionDao(models);
    var propertiesNames = Object.getOwnPropertyNames(req.body);
    var neededProperties = ["text_question", "interviewId"];

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
    var newQuestion = {
        "interviewId": req.body.interviewId,
        "text_question": req.body.text_question,
    };
    dao.create(newQuestion,(err, question)=>{
        if (err) {
            res.status(404).json({
                "Error": err.message
            });
        }
        else {
            res.status(200).json(
                {"question": question}
            );
        }
    });

});

router.post('/upload/:id', auth, upload.single('audio_question'), function(req, res){
    var dao = new questionDao(models);
    var id = req.params.id;
    const file = req.file;
    var questionData = {
        "audio_question": file.filename,
    };
    dao.upload(id, questionData, (err, question) => {
        if (err) {
            res.status(404).json({
                "Error": err.message
            });
        }
        else {
            res.status(200).json(
                question
            );
        }
    });
});
router.post('/count', auth, function(req, res){
    var dao = new questionDao(models);
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
    
    dao.countQuestions(interviewId, (err, result) => {
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
