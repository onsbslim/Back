var express = require('express');
var router = express.Router();
var models = require('../models');
var notificationDAO = require('../dao/notificationDAO');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
var axios = require('axios');

router.post("/add", auth, (req, res)=> {
    var dao = new notificationDAO(models);
    var propertiesNames = Object.getOwnPropertyNames(req.body);
    var neededProperties = ["idNot", "candidateId", "companyId", "receiver", "title", "description"];
});
module.exports = router;