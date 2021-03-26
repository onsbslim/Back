var express = require('express');
var router = express.Router();
var models = require('../models');
var candidateDAO = require('../dao/candidateDAO');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const checkRefresh = require('../middleware/checkRefresh');
const upload = require('../middleware/upload');
const uploadCV = require('../middleware/uploadCV');
var axios = require('axios');

/** Login Google Candidate */
router.post('/loginGoogle', (req, res ) => {
	var dao = new candidateDAO(models);
	var propertiesNames = Object.getOwnPropertyNames(req.body);
	var neededProperties = ["email"];

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
	var candidateData = {
		"email": req.body.email
	};
	dao.auth(candidateData, (err, candidate) => {
		if (err) {
			res.status(404).json({
				"Error": err.message,
			});
			// console.log(process.env.KEY);
		}
		else {
			jwt.sign({
				id: candidate.id,
			}, process.env.SECRET,
				{ expiresIn: '7d' },
				(err, refreshToken) => {
					if (err) throw err;
					jwt.sign(
						{
							id: candidate.id,
							email: candidate.email,
						},
						process.env.KEY,
						{ expiresIn: 360 },
						(err, token) => {
							if (err) throw err;

							process.env.REFRESH = refreshToken;
							res.status(200).json({
								refreshToken,
								token,
								candidate,
							});

						}
					);
				});
		}
	});
});

/** Login Candidate */
router.post('/login', (req, res, next) => {
	var dao = new candidateDAO(models);
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
	var candidateData = {
		"email": req.body.email,
		"password": req.body.password,
	};
	dao.auth(candidateData, (err, candidate) => {
		if (err) {
			res.status(404).json({
				"Error": err.message,
			});
			// console.log(process.env.KEY);
		}
		else {

			jwt.sign({
				id: candidate.id,
			}, process.env.SECRET,
				{ expiresIn: '7d' },
				(err, refreshToken) => {
					if (err) throw err;
					jwt.sign(
						{
							id: candidate.id,
							email: candidate.email,
						},
						process.env.KEY,
						{ expiresIn: 360 },
						(err, token) => {
							if (err) throw err;

							process.env.REFRESH = refreshToken;
							res.status(200).json({
								refreshToken,
								token,
								candidate,
							});

						}
					);
				});
		}
	});
});

// Register Candidate via Google

router.post('/registerGoogle', (req, res) => {
	dao = new candidateDAO(models);

	var propertiesNames = Object.getOwnPropertyNames(req.body);
	var neededProperties = ["email", "firstname", "lastname"];

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
	var candidateData = {
		"email": req.body.email,
		"firstname": req.body.firstname,
		"lastname": req.body.lastname
	};

	dao.createViaGoogle(candidateData, (err, candidate) => {
		if (err) res.status(404).json({
			"Error": err.message
		});
		else {
			jwt.sign({
				id: candidate.id,
			}, process.env.SECRET,
				{ expiresIn: '7d' },
				(err, refreshToken) => {
					if (err) throw err;
					jwt.sign(
						{
							id: candidate.id,
							email: candidate.email,
						},
						process.env.KEY,
						{ expiresIn: 360 },
						(err, token) => {
							if (err) throw err;

							process.env.REFRESH = refreshToken;
							res.status(200).json({
								refreshToken,
								token,
								candidate
							});

						}
					);
				});
		}
	});
});

/** Register Candidate */
router.post('/register', (req, res, next) => {
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
	var newCandidate = {
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
			jwt.sign({
				id: candidate.id,
			}, process.env.SECRET,
				{ expiresIn: '7d' },
				(err, refreshToken) => {
					if (err) throw err;
					jwt.sign(
						{
							id: candidate.id,
							email: candidate.email,
						},
						process.env.KEY,
						{ expiresIn: 360 },
						(err, token) => {
							if (err) throw err;

							process.env.REFRESH = refreshToken;
							res.status(200).json({
								refreshToken,
								token,
								candidate
							});

						}
					);
				});


		}
	});

});

/** Get candidate */
router.get('/:id', auth,(req, res) => {
	var dao = new candidateDAO(models);
	var id = req.params.id;
	dao.get(id, (err, candidate) => {
		if (err) return res.status(404).json({
			'Error': err.message
		})
		else return res.status(200).json({
			"candidate": candidate
		});
	})
});

/** Get All candidate */
router.get('/', (req, res) => {
	var dao = new candidateDAO(models);
	dao.list((err, candidates) => {
		if (err) return res.status(404).json({
			'Error': err.message
		})
		else return res.status(200).json(candidates);
	});
});

/** Delete candidate */
router.delete('/:id', (req, res) => {
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

/** Upload Image */

router.post('/upload', auth, upload.single('pic'), (req, res) => {
	var dao = new candidateDAO(models);

	const decoded = jwt.verify(req.get('x-auth-token'), process.env.KEY);
	var id = decoded.id;

	const file = req.file;
	var candidateData = {
		"photo": file.filename,
	};
	dao.upload(id, candidateData, (err, candidate) => {
		if (err) {
			res.status(404).json({
				"Error": err.message
			});
		}
		else {
			res.status(200).json({
				candidate: candidate
			});
		}
	});
});

/** Update candidate */
router.put('/update', auth, (req, res) => {
	var dao = new candidateDAO(models);
	const decoded = jwt.verify(req.get('x-auth-token'), process.env.KEY);
	var id = decoded.id;
	if (!req.body)
		return res.status(404).json({ 'Error': 'There is no updating data' })
	var candidateData = {
		"email": req.body.email,
		"firstname": req.body.firstname,
		"lastname": req.body.lastname,
		"about": req.body.about,
		"country": req.body.country,
		"industry": req.body.industry,
		"address": req.body.address,
		"phone": req.body.phone,
		"photo": req.body.photo,
		"cv": req.body.cv,
		"degree": req.body.degree
	};
	dao.updateCandidate(id, candidateData, (err, candidate) => {
		try {
			if (err) return res.status(404).json({
				"Error": err.message
			})
			else return res.status(200).json({
				candidate: candidate
			})
		} catch (error) {
			return res.status(404).json({
				"Error": err.message
			})
		}

	});
});

/** Upload CV */

router.post('/uploadCV', auth, uploadCV.single('cv'), (req, res) => {
	var dao = new candidateDAO(models);

	const decoded = jwt.verify(req.get('x-auth-token'), process.env.KEY);
	var id = decoded.id;

	const file = req.file;
	var candidateData = {
		"cv": file.filename,
	};
	dao.uploadCV(id, candidateData, (err, candidate) => {
		if (err) {
			res.status(404).json({
				"Error": err.message
			});
		}
		else {
			res.status(200).json({
				candidate: candidate
			});
		}
	});
});

// Token
router.post('/token', checkRefresh, (req, res) => {
	// refresh the token
	const decoded = jwt.verify(req.get('x-refresh-token'), process.env.SECRET);
	var id = decoded.id;
	var dao = new candidateDAO(models);
	dao.get(id, (err, candidate) => {
		if (err) res.status(404).json({
			"Error": err.message
		});
		else {
			const c = {
				id: candidate.id,
				email: candidate.email,
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
router.post('/checkRefresh', checkRefresh, (req, res) => {
	var response = req.get('x-refresh-token');
	res.status(200).json({ "refreshToken": response });
});



// Check Token
router.post('/checkToken', auth, (req, res) => {
	var response = req.get('x-auth-token');
	res.status(200).json({ "refresh": response });
});

router.post('/me', auth, (req, res) => {

	var dao = new candidateDAO(models);

	const decode = jwt.verify(req.get('x-auth-token'), process.env.KEY);
	var id = decode.id;

	dao.getDetailed(id, (err, candidate) => {
		if (err)
			res.status(404).json({
				"Error": err.message
			});
		else
			res.status(200).json({
				candidate: candidate
			});

	});

});

// Get Detailed Candidate

router.get('/detailedCandidate/:id', auth, (req, res) => {
	var dao = new candidateDAO(models);
	var id = req.params.id;

	dao.getDetailed(id, (err, candidate) => {
		if (err)
			res.status(404).json({
				"Error": err.message
			});
		else
			res.status(200).json({
				candidate: candidate
			});

	});

});

// check photo

router.post('/checkPhoto', auth, (req, res) => {
	var dao = new candidateDAO(models);
	const decode = jwt.verify(req.get('x-auth-token'), process.env.KEY);
	var id = decode.id;
	dao.checkImage(id, (err, photo) => {
		if (err)
			res.status(404).json({
				"Error": err.message
			});
		else
			res.status(200).json({
				candidate: photo
			});
	})
});


// Add player id and update candidate
router.post('/addPlayerId', auth, (req,res)=> {
	var dao = new candidateDAO(models);
	const decode = jwt.verify(req.get('x-auth-token'), process.env.KEY);
	var id = decode.id;

	var propertiesNames = Object.getOwnPropertyNames(req.body);
	var neededProperties = ["device_os", "device_model", "ad_id"];

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


	const url = "https://onesignal.com/api/v1/players";
	const headers = {
		"Accept": "*/*",
		"Content-Type": "application/json"
	};
	const data = {
		"app_id": "",
		"device_type": 0,
		"identifier" : "",
		"sender": sender,
		"test_type": 1,
		"language": "en",
		"game_version": "1.0",
		"device_os": req.body.device_os,
		"device_model": req.body.device_model,
		"ad_id": req.body.ad_id,
		"external_user_id": "Interviewee-" + id
	};

	
});

module.exports = router;
