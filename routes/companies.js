var express = require('express');
var router = express.Router();
var models = require('../models');
var companyDAO = require('../dao/companyDAO');

/** Register Company */
router.post('/register', function (req, res, next) {
	var dao = new companyDAO(models);
	//check if there is a non needed property
	var propertiesNames = Object.getOwnPropertyNames(req.body);


	var neededProperties = ["email", "password", "name"]
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
	var newCompany = {
		"email": req.body.email,
        "password": req.body.password,
        "name": req.body.name,
	};


	dao.create(newCompany, (err, company) => {
		if (err) res.status(404).json({
			"Error": err.message
		});
		else {
			res.status(200).json(
				company
			);
		}
	});

});

/** Update Company */

router.put('/:id', (req, res) => {
	var dao = new companyDAO(models);
	var id = req.params.id;

	if(!req.body ) 
		return res.status(404).json({'Error':'There is no updating data'})
	var companyData = {
		"email":req.body.email,
		"name":req.body.name,
		"about" : req.body.about,
		"sector" : req.body.sector,
		"phone":req.body.phone,
		"website":req.body.website,
		"founded":req.body.founded,
		"linkedin":req.body.linkedin,
		"size":req.body.size,
		"logo":req.body.logo,
		"cover":req.body.cover,
		"country":req.body.country,
		"state":req.body.state,
		"city":req.body.city,
        "street":req.body.street,
        "postal_code":req.body.postal_code,
        "longitude":req.body.longitude,
        "latitude":req.body.latitude,
        "verified":req.body.verified,
	}
	dao.update(id, companyData, (err, company) => {
		try {
			if (err) return res.status(404).json({
				"Error": err.message
			})
			else return res.status(200).json(
				company
			);
		} catch (error) {
			return res.status(404).json({
				"Error": err.message
			})
		}

	});
});

/** Delete company */


module.exports = router;