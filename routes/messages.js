var express = require('express');
var models = require('../models');
var messageDao = require('../dao/messageDAO');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const messageDAO = require('../dao/messageDAO');

var router = express.Router();

router.post('/addMessage', auth, (req, res)=> {
    var dao = new messageDao(models);
    const decoded = jwt.verify(req.get('x-auth-token'), process.env.KEY);
    var idCompany = decoded.id;
   
    var propertiesNames = Object.getOwnPropertyNames(req.body);
	var neededProperties = ["idCandidate", "message", "sender"];

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
        
    var messageData = {
        "message": req.body.message,
        "candidateId": req.body.idCandidate,
        "companyId": idCompany,
        "sender": req.body.sender
    };

    dao.addMessageFromCompany(messageData, (err, message) => {
        if (err) {
            res.status(404).json({
                "Error": err.message
            });
        }
        else {
            res.status(200).json(
                {"message": message}
            );
        }
    });
});
router.post('/getMessagesCompany', auth, (req, res)=> {
    var dao = new messageDAO(models);
    const decoded = jwt.verify(req.get('x-auth-token'), process.env.KEY);
    var id = decoded.id;

    var propertiesNames = Object.getOwnPropertyNames(req.body);
	var neededProperties = ["id"] ;

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

    idCandidate = req.body.id;
   
    
    var data = {
        candidateId: idCandidate,
        companyId: id
    };
    dao.getCompanysMessages(data, (err, messages) => {
        if (err) res.status(404).json({
			"Error": err.message
		});
		else res.status(200).json({
            "messages": messages
        });
    });
});

router.post('/candidateDiscussions', (req, res) => {
    var dao = new messageDAO(models);
    // const decoded = jwt.verify(req.get('x-auth-token'), process.env.KEY);
    // var id = decoded.id;

    dao.getCandidatesDiscussions(1, (err, messages)=> {
        if (err) res.status(404).json({
			"Error": err.message
		});
		else res.status(200).json({
            "messages": messages
        });
    });
});

module.exports = router;