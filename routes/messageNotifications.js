var express = require('express');
var router = express.Router();
var models = require('../models');
const auth = require('../middleware/auth');
var messageNotificationDAO = require('../dao/messageNotificationDAO');

router.post("/add", auth, (req, res)=>{
    var dao = new messageNotificationDAO(models);

    var propertiesNames = Object.getOwnPropertyNames(req.body);
    var neededProperties = ["id", "candidateId", "companyId", "receiver"];

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

    var newNotification ={
        "id": req.body.id,
        "candidateId" : req.body.candidateId,
        "companyId": req.body.companyId,
        "receiver": req.body.receiver
    };
    
    dao.createNotification(newNotification, (err, notification)=>{
        
        if (err) {
            
            res.status(404).json({
                "Error": err.message
            });
        }
        else {
            res.status(200).json(
                {"message_notification": notification}
            );
        }
    });
});

router.get("/:id", auth, (req, res) => {
    
    var dao = new messageNotificationDAO(models);
    var id = req.params.id;
    dao.getNotification(id, (err, notification)=> {
   
        if (err) {
            res.status(404).json({
                "Error": err.message
            });
        }
        else {
            res.status(200).json(
                {"message_notification": notification}
            );
        }
    });
});

module.exports = router;