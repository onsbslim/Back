var express = require('express');
var router = express.Router();
var models = require('../models');
var notificationDAO = require('../dao/notificationDAO');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');

router.get('/getAll', (req, res)=>{
    var dao = new notificationDAO(models);
    dao.getNotifications((err, notifications)=>{
        if (err) {
            res.status(404).json({
                "Error": err.message
            });
        }
        else {
            res.status(200).json(notifications);
        }
    });
});
module.exports = router;