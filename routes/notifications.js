var express = require('express');
var router = express.Router();
var models = require('../models');
var notificationDAO = require('../dao/notificationDAO');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
var axios = require('axios');
var urlOneSignal = "https://onesignal.com/api/v1/notifications";

router.post("/add", auth, (req, res) => {
    var dao = new notificationDAO(models);
    var propertiesNames = Object.getOwnPropertyNames(req.body);
    var neededProperties = ["candidateId", "companyId", "receiver", "title", "description"];
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

    var newNotification = {
        "title": req.body.title,
        "description": req.body.description,
        "receiver": req.body.receiver,
        "candidateId": req.body.candidateId,
        "companyId": req.body.companyId
    };
    dao.sendNotification(newNotification, (err, notification) => {
        if (err) {
            res.status(404).json({
                "Error": err.message
            });
        }
        else {
            // res.status(200).json(
            //     {"notification": notification}
            // );
            if (req.body.receiver == "company") {
                var players = ["Linkup-" + req.body.companyId];
                var app_id = process.env.LINKUP_APP_ID;
                var contents = { "en": "Test" };
                var headings = { "en": "Test Notification" };
                var dataOneSignal = {
                    "include_external_user_ids": players,
                    "app_id": app_id,
                    "contents": contents,
                    "headings": headings,
                    "content_available": 1,
                };
                const headersLinkupOneSignal = {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                    "Authorization": "Basic " + process.env.LINKUP_REST_API_KEY
                };
                axios.post(urlOneSignal, dataOneSignal, { headers: headersLinkupOneSignal }).then(oneSignalResponse => {
                    // dao.updateNotification(notification.id,)
                    console.log("test id notification : "+ notification.id);
                }).catch(err => {
                    res.status(404).json({
                        "Error": err.message
                    });
                });
            }
        }
    });
});
module.exports = router;