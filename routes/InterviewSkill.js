var express = require('express');
var router = express.Router();
var models = require('../models');
const auth = require('../middleware/auth');
var interviewSkillDAO = require('../dao/InterviewSkillDAO');

router.post('/addSkill', auth, (req, res)=> {
    var dao = new interviewSkillDAO(models);
    var propertiesNames = Object.getOwnPropertyNames(req.body);
	var neededProperties = ["skill", "idInterview"];

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
    var idInterview = req.body.idInterview;

    dao.addSkill(idInterview, skill, (err, interviewSkill) => {
        if (err) res.status(404).json({
            "Error": err.message
        });
        else res.status(200).json({
            "skill": interviewSkill
        });
    });
});

router.get('/getSkills/:interviewId', (req, res) => {
    var dao = new interviewSkillDAO(models);
    var interviewId = req.params.interviewId;

    dao.getInterviewSkills(interviewId, (err, skills)=> {
        if (err) res.status(404).json({
            "Error" : err.message
        });
        else res.status(200).json(
          skills
        );
    });
});

router.delete('/deleteSkill', (req, res)=> {
    var dao = new interviewSkillDAO(models);
    
    var propertiesNames = Object.getOwnPropertyNames(req.body);
	var neededProperties = ["skillId", "interviewId"];

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
    var skillId = req.body.skillId;

    dao.deleteSkillFromInterview(interviewId, skillId, (err, result)=> {
        if (err) return res.status(404).json({
            "Error": err.message,
            "result": 0
        });
        else return res.status(200).json({
            "result" : parseInt(result),
            "Error" : null
        })
    });

});
module.exports = router;