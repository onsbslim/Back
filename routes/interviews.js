var express = require('express');
var router = express.Router();
var models = require('../models');
var interviewDAO = require('../dao/interviewDAO');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const jwt = require('jsonwebtoken');




router.post('/addInterview', auth,  (req, res) => {

    var dao = new interviewDAO(models);
    const decoded = jwt.verify(req.get('x-auth-token'), process.env.KEY);
	var id = decoded.id;
	var propertiesNames = Object.getOwnPropertyNames(req.body);
	var neededProperties = ["title", "accepted_degree", "experience_years", "about", "sector"];

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

   
    var newInterview = {
        "companyId": id,
        "title": req.body.title,
        "accepted_degree": req.body.accepted_degree,
        "experience_years": req.body.experience_years,
        "about": req.body.about,
        "sector": req.body.sector
    };

    dao.create(newInterview, (err, interview) => {
        if (err) {
            res.status(404).json({
                "Error": err.message
            });
        }
        else {
            res.status(200).json(
                {"interview":interview}
            );
        }
    });
});

router.post('/upload/:id', auth, upload.single('pic') , (req, res) => {
    var dao = new interviewDAO(models);
    var id = req.params.id;

    const file = req.file;
    var intervewData = {
        "photo": file.filename,
        
    };
    dao.update(id,intervewData, (err, interview) => {
        if (err) {
            res.status(404).json({
                "Error": err.message
            });
        }
        else {
            res.status(200).json(
                interview
            );
        }
    });
});

router.get('/all', auth, (req, res) => {
    var dao = new interviewDAO(models);
    dao.getAll((err, interviews)=>{
        if (err) res.status(404).json({
            "Error": err.message
        });
        else res.status(200).json({
            "interviews": interviews
        });
    });
});

router.get('/getAllInPage=:page', auth, (req, res) => {
    var dao = new interviewDAO(models);
    
    var page = req.params.page;
    var pageCount ;
    var countInterviews;

    var limit = 5;

    dao.countAll((err, count) => {
        pageCount = Math.ceil(count/limit);;
        countInterviews = count;
        dao.paginationGetAll(limit, page, (err, interviews) => {
            if (err) res.status(404).json({
                "Error" : err.message
            });
            else res.status(200).json({
                "interviews" : interviews,
                "page_count": pageCount,
                "page": Number(page),
                "count": countInterviews
            });
        });
    });

   
});

router.get('/', auth, (req, res) => {
     var dao = new interviewDAO(models);
    const decoded = jwt.verify(req.get('x-auth-token'), process.env.KEY);
	var id = decoded.id;
    dao.list(id,(err, interviews) => {
       
		if (err) res.status(404).json({
			"Error": err.message
		});
		else res.status(200).json({
            "interviews": interviews
        })
	});
});
router.get('/listPage=:page', auth, (req, res)=> {
    var dao = new interviewDAO(models);
   const decoded = jwt.verify(req.get('x-auth-token'), process.env.KEY);
   var idCompany = decoded.id;
 
    var limit = 5;
    var pageCount;
   
    var page = req.params.page;
    var countInterviews;
    dao.countInterviews(idCompany, (err, count) => {
        pageCount = Math.ceil(count/5);
        countInterviews = count;
        dao.paginationList(idCompany, limit, page, (err, interviews) => {
       
            if (err) res.status(404).json({
                "Error" : err.message
            });
            else res.status(200).json({
               "page_count": pageCount,
               "page":Number(page),
                "interviews": interviews,
                "count": countInterviews
            });
        });
    });
   

});

router.get('/:id', auth , function(req, res){
    var dao = new interviewDAO(models);
    var id = req.params.id;
    dao.get(id, (err, interview) => {
		if (err) res.status(404).json({
			"Error": err.message
		});
		else res.status(200).json(
			interview
		)
	});
});

router.get('/getByCompany/:id', auth,  (req, res) => {
    var dao = new interviewDAO(models);
    var id = req.params.id;
    dao.list(id,(err, interviews) => {
       
		if (err) res.status(404).json({
			"Error": err.message
		});
		else res.status(200).json({
            "interviews": interviews
        });
	});
});


module.exports = router;
