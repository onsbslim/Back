var express = require('express');
var router = express.Router();
var models = require('../models');
var userDao = require('../dao/userDAO');

const jwt = require('jsonwebtoken');
const passport = require('passport');

/** Login User */
router.post('/login', function(req, res, next){
	passport.authenticate()
});
/** Register User */
router.post('/register', function (req, res, next) {
	var dao = new userDao(models);
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
	var newUser = {
		"email": req.body.email,
		"password": req.body.password,
		"firstname": req.body.firstname,
		"lastname": req.body.lastname
	};


	dao.create(newUser, (err, user) => {
		if (err) res.status(404).json({
			"Error": err.message
		});
		else {
			res.status(200).json(
				user
			);
		}
	});

});

/** Get User */
router.get('/:id', function (req, res) {
	var dao = new userDao(models);
	var id = req.params.id;
	dao.get(id, (err, user) => {
		if (err) return res.status(404).json({
			'Error': err.message
		})
		else return res.status(200).json(user);
	})
});

/** Get All Users */
router.get('/', function (req, res) {
	var dao = new userDao(models);
	dao.list((err, users) => {
		if (err) return res.status(404).json({
			'Error': err.message
		})
		else return res.status(200).json(users);
	});
});

/** Delete User */
router.delete('/:id', function (req, res) {
	var dao = new userDao(models);
	var id = req.params.id;
	dao.remove(id, (err, user) => {
		if (err) res.status(404).json({
			"Error": err.message
		});
		else res.status(200).json(
			user
		)
	})
});

/** Update User */
router.put('/:id', (req, res) => {
	var dao = new userDao(models);
	var id = req.params.id;

	if (!req.body)
		return res.status(404).json({ 'Error': 'There is no updating data' })
	var userData = {
		"email": req.body.email,
		"firstname": req.body.firstName,
		"lastname": req.body.lastname,
		"headline": req.body.headline,
		"about": req.body.about,
		"country": req.body.country,
		"location": req.body.location,
		"industry": req.body.industry,
		"birthday": req.body.birthday,
		"address": req.body.address,
		"phone": req.body.phone,
		"availability": req.body.availability,
		"photo": req.body.photo,
		"video": req.body.video,
		"cv": req.body.cv,
	}
	dao.update(id, userData, (err, user) => {
		try {
			if (err) return res.status(404).json({
				"Error": err.message
			})
			else return res.status(200).json(
				user
			);
		} catch (error) {
			return res.status(404).json({
				"Error": err.message
			})
		}

	});
});

module.exports = router;
