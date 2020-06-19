var express = require('express');
var router = express.Router();
var models = require('../models');
var companyDAO = require('../dao/companyDAO');
const jwt = require('jsonwebtoken');

const auth = require('../middleware/auth');

/** Login Company */
router.post('/login', function (req, res, next) {
	var dao = new companyDAO(models);
	var propertiesNames = Object.getOwnPropertyNames(req.body);
	var neededProperties = ["email", "password"];

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
	var companyData = {
		"email": req.body.email,
		"password": req.body.password,
	};

	dao.auth(companyData, (err, company) => {
		if (err) {
			res.status(404).json({
				"Error": err.message,
			});
			// console.log(process.env.KEY);
		}

		else {
			jwt.sign(
				{
					id: company.id,
					name: company.name,
					email: company.email,
				},
				process.env.KEY,
				{ expiresIn: 3600 * 2 },
				(err, token) => {
					if (err) throw err;
					res.status(200).json({
						token,
						comapny: company,
					});

				}
			);



		}
	});


});


/** Register Company */
router.post('/register', function (req, res, next) {
	var dao = new companyDAO(models);
	//check if there is a non needed property
	var propertiesNames = Object.getOwnPropertyNames(req.body);
	console.log(propertiesNames)

	var neededProperties = ["email", "password", "name"];
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

	// dao.create(newCompany, (err, company) => {
	// 	if (err) res.status(404).json({
	// 		"Error": err.message
	// 	});
	// 	else {
	// 		res.status(200).json(
	// 			company,
	// 		);
	// 	}
	// });

	dao.create(newCompany, (err, company) => {
		if (err) {
			res.status(404).json({
				"Error": err.message,
			});
			// console.log(process.env.KEY);
		}

		else {
			jwt.sign(
				{
					id: company.id,
					name: company.name,
					email: company.email,
				},
				process.env.KEY,
				{ expiresIn: 3600 * 2 },
				(err, token) => {
					if (err) throw err;
					res.status(200).json({
						token,
						comapny: company,
					});

				}
			);



		}
	});




});

/** Update Company */

router.put('/:id', auth, (req, res) => {
	var dao = new companyDAO(models);
	var id = req.params.id;

	if (!req.body)
		return res.status(404).json({ 'Error': 'There is no updating data' })
	var companyData = {
		"email": req.body.email,
		"name": req.body.name,
		"about": req.body.about,
		"sector": req.body.sector,
		"phone": req.body.phone,
		"website": req.body.website,
		"founded": req.body.founded,
		"linkedin": req.body.linkedin,
		"size": req.body.size,
		"logo": req.body.logo,
		"cover": req.body.cover,
		"country": req.body.country,
		"state": req.body.state,
		"city": req.body.city,
		"street": req.body.street,
		"postal_code": req.body.postal_code,
		"longitude": req.body.longitude,
		"latitude": req.body.latitude,
		"verified": req.body.verified,
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
router.delete('/:id', function (req, res) {
	var dao = new companyDAO(models);
	var id = req.params.id;
	dao.remove(id, (err, company) => {
		if (err) res.status(404).json({
			"Error": err.message
		});
		else res.status(200).json(
			company
		)
	})
});

/** Get Company */
router.get('/:id', function (req, res) {
	var dao = new companyDAO(models);
	var id = req.params.id;
	dao.get(id, (err, company) => {
		if (err) res.status(404).json({
			"Error": err.message
		});
		else res.status(200).json(
			company
		)
	})
});

/** Get All Companies */

router.get('/', auth, function (req, res) {
	var dao = new companyDAO(models);
	dao.list((err, companies) => {
		if (err) res.status(404).json({
			"Error": err.message
		});
		else res.status(200).json(
			companies
		)
	});

});



module.exports = router;