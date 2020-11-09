var express = require('express');
var router = express.Router();
var models = require('../models');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const skillDAO = require('../dao/skillDAO');

router.get('/getAll', auth, (req, res) => {
    var dao = new skillDAO(models);
    dao.getAll((err, skills) => {
        
        if (err) res.status(404).json({
            "Error": err.message
        });
        else res.status(200).json({
            "skills": skills
        });
    });
});

router.post('/createSkill', (req, res)=> {
    var dao = new skillDAO(models);

    var propertiesNames = Object.getOwnPropertyNames(req.body);
	var neededProperties = ["skill"];

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
   
    var skill = req.body.skill;
    dao.addSkill(skill, (err, createdSkill) => {
        if (err) res.status(404).json({
            "Error": err.message
        });
        else res.status(200).json({
            "skill" : createdSkill
        });
    });
});



module.exports = router;
