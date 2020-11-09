var express = require('express');
var router = express.Router();
var models = require('../models');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const candidateSkillDAO = require('../dao/candidateSkillDAO');


router.post('/addSkill', auth, (req, res) => {
    var dao = new candidateSkillDAO(models);
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
    const decoded = jwt.verify(req.get('x-auth-token'), process.env.KEY);
    var idCandidate = decoded.id;
    var skill = req.body.skill;

    dao.addSkillToCandidate(skill, idCandidate, (err, candidateSkill) => {
        if (err) res.status(404).json({
            "Error": err.message
        });
        else res.status(200).json({
            "skill": candidateSkill
        });
    });
});

router.get('/skills', auth, (req, res)=> {
    var dao = new candidateSkillDAO(models);
   
    var propertiesNames = Object.getOwnPropertyNames(req.body);
	var neededProperties = ["idCandidate"];

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
    var idCandidate = req.body.idCandidate;

    dao.getCandidateSkills(idCandidate, (err, skills)=>{
        if (err) return res.status(404).json({
            "Error": err.message    
        });
        else return res.status(200).json(skills);
    });
});

module.exports = router;
