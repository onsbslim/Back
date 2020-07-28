var express = require('express');
var router = express.Router();
var models = require('../models');
var answerDAO = require('../dao/answerDAO');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');

const upload = require('../middleware/video');

router.post('/add', auth, function(req,res){
    var dao = new answerDAO(models);
    var propertiesNames = Object.getOwnPropertyNames(req.body);
    var neededProperties = ["applicationId", "questionId"];

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

    var newAnswer = {
        "applicationId": req.body.applicationId, 
        "questionId": req.body.questionId
    };
    dao.create(newAnswer, (err, answer)=>{
        if (err) {
            res.status(404).json({
                "Error": err.message
            });
        }
        else {
            res.status(200).json(
                {"answer": answer}
            );
        }
    });
});

router.post('/upload/:id', auth, upload.single('video'),function(req, res){
    var dao = new answerDAO(models);

    var id = req.params.id;
    const file = req.file;
    var answerData = {
        "video" : file.filename
    };

    dao.upload(id, answerData, (err, answer) => {
        if (err) {
            res.status(404).json({
                "Error": err.message
            });
        }
        else {
            res.status(200).json(
                answer
            );
        }
    });

});

module.exports = router;