var express = require('express');
var router = express.Router();
var models = require('../models');
var candidateDAO = require('../dao/candidateDAO');

const jwt = require('jsonwebtoken');
const passport = require('passport');

/** Login Candidate */
router.post('/login', function(req, res, next){
	passport.authenticate()
});
/** Register Candidate */
router.post('/register', function (req, res, next) {
	var dao = new candidateDAO(models);
	//check if there is a non needed property
	var propertiesNames = Object.getOwnPropertyNames(req.body);


	var neededProperties = ["email", "password", "firstname", "lastname"]
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
	var newCandidate= {
		"email": req.body.email,
		"password": req.body.password,
		"firstname": req.body.firstname,
		"lastname": req.body.lastname
	};


	dao.create(newCandidate, (err, candidate) => {
		if (err) res.status(404).json({
			"Error": err.message
		});
		else {
			res.status(200).json(
				candidate
			);
		}
	});

});

/** Get candidate */
router.get('/:id', function (req, res) {
	var dao = new candidateDAO(models);
	var id = req.params.id;
	dao.get(id, (err, candidate) => {
		if (err) return res.status(404).json({
			'Error': err.message
		})
		else return res.status(200).json(candidate);
	})
});

/** Get All candidate */
router.get('/', function (req, res) {
	var dao = new candidateDAO(models);
	dao.list((err, candidates) => {
		if (err) return res.status(404).json({
			'Error': err.message
		})
		else return res.status(200).json(candidates);
	});
});

/** Delete candidate */
router.delete('/:id', function (req, res) {
	var dao = new candidateDAO(models);
	var id = req.params.id;
	dao.remove(id, (err, candidate) => {
		if (err) res.status(404).json({
			"Error": err.message
		});
		else res.status(200).json(
			candidate
		)
	})
});

/** Update candidate */
router.put('/:id', (req, res) => {
	var dao = new candidateDAO(models);
	var id = req.params.id;

	if (!req.body)
		return res.status(404).json({ 'Error': 'There is no updating data' })
	var candidateData = {
		"email": req.body.email,
		"firstname": req.body.firstName,
		"lastname": req.body.lastname,
		"about": req.body.about,
		"country": req.body.country,
		"industry": req.body.industry,
		"birthday": req.body.birthday,
		"address": req.body.address,
		"phone": req.body.phone,
		"photo": req.body.photo,
		"cv": req.body.cv,
		"degree": req.body.degree
	}
	dao.update(id, candidateData, (err, candidate) => {
		try {
			if (err) return res.status(404).json({
				"Error": err.message
			})
			else return res.status(200).json(
				candidate
			);
		} catch (error) {
			return res.status(404).json({
				"Error": err.message
			})
		}

	});
});

module.exports = router;
