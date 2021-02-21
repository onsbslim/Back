var express = require('express');
var router = express.Router();
var models = require('../models');
var companyDAO = require('../dao/companyDAO');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const checkRefresh = require('../middleware/checkRefresh');

const upload = require('../middleware/upload');

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

			jwt.sign({
				id: company.id,
			}, process.env.SECRET,
				{ expiresIn: '7d' },
				(err, refreshToken) => {
					if (err) throw err;
					jwt.sign(
						{
							id: company.id,
							name: company.name,
							email: company.email,
						},
						process.env.KEY,
						{ expiresIn: 360 },
						(err, token) => {
							if (err) throw err;

							process.env.REFRESH = refreshToken;
							res.status(200).json({
								refreshToken,
								token,
								company,
							});

						}
					);
				});


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

	dao.create(newCompany, (err, company) => {
		if (err) {
			res.status(404).json({
				"Error": err.message,
			});
			// console.log(process.env.KEY);
		}

		else {
			jwt.sign({
				id: company.id,
			}, process.env.SECRET,
				{ expiresIn: '7d' },
				(err, refreshToken) => {
					if (err) throw err;
					jwt.sign(
						{
							id: company.id,
							name: company.name,
							email: company.email,
						},
						process.env.KEY,
						{ expiresIn: 360 },
						(err, token) => {
							if (err) throw err;

							process.env.REFRESH = refreshToken;
							res.status(200).json({
								refreshToken,
								token,
								company,
							});

						}
					);
				});




		}
	});




});

/** Update Company */

router.put('/update', auth, (req, res) => {
	var dao = new companyDAO(models);
	const decoded = jwt.verify(req.get('x-auth-token'), process.env.KEY);
	var id = decoded.id;
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
		else res.status(200).json({
			"company" : company
		}
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

router.post('/me', auth, function (req, res) {
	const decoded = jwt.verify(req.get('x-auth-token'), process.env.KEY);
	var id = decoded.id;
	var dao = new companyDAO(models);
	
	dao.getConnected(id, (err, company) => {
		if (err) res.status(404).json({
			"Error": err.message
		});
		else res.status(200).json(
			company
		)
	});

});

// Token
router.post('/token', checkRefresh, function (req, res) {
	// refresh the damn token
	const decoded = jwt.verify(req.get('x-refresh-token'), process.env.SECRET);
	var id = decoded.id;
	var dao = new companyDAO(models);
	dao.get(id, (err, company) => {
		if (err) res.status(404).json({
			"Error": err.message
		});
		else {
			const c = {
				id: company.id,
				name: company.name,
				email: company.email,
			}
			const token = jwt.sign(c, process.env.KEY, { expiresIn: 360 });
			const response = {
				"token": token
			}
			// update the token in the list
			res.status(200).json(response);
		}
	});
});

// Check Refresh Token

router.post('/checkRefresh', checkRefresh, function(req, res){
	var response = req.get('x-refresh-token');
	res.status(200).json({"refreshToken": response});
});



// Check Token

router.post('/checkToken', auth ,function(req, res){
	var response = req.get('x-auth-token');
	res.status(200).json({"refresh": response});
});


// Upload photo
router.post('/uploadLogo', auth, upload.single('pic'),(req, res) => {
	var dao = new companyDAO(models);
	const decoded = jwt.verify(req.get('x-auth-token'), process.env.KEY);
	var id = decoded.id;
	const file = req.file;
	var companydata = {
		"logo": file.filename,
	};
	dao.upload(id, companydata, (err,company)=>{
		if (err) {
			return res.status(404).json({
				"Error" : err.message
			});
		}else {
			return res.status(200).json({
				company: company
			});
		}
	});

});

router.get('/getDetailed/:id', auth, (req, res)=> {
	var dao = new companyDAO(models);
	var id = req.params.id;
	dao.getDetailedCompany(id, (err, company) => {
		if (err) {
			return res.status(404).json({
				"Error" : err.message
			});
		}else {
			return res.status(200).json({
				company: company
			});
		}
	});
});
module.exports = router;