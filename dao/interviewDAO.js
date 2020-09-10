
var interviewDAO = module.exports = function (models) {
    this.models = models;
};

// Create Interview
interviewDAO.prototype.create = function (interview, cb) {

    var newInterview = {
        "companyId": interview.companyId,
        "title": interview.title,
        "accepted_degree": interview.accepted_degree,
        "experience_years": interview.experience_years,
        "about": interview.about,
        "sector": interview.sector
    }

    this.models.interviews.create(newInterview)
        .then(createdInterview => {
            if (!createdInterview)
                return cb(Error("interview not created !"));
            else
                return cb(null, createdInterview)
        })
        .catch(err => cb(err))


};

// upload image

interviewDAO.prototype.update = function (id, interviewToUpdate, cb) {
    
    this.models.interviews.findOne({
        where: {
            id
        }
    }).then(interview => {
        if (!interview) return cb(Error('Interview not found'))
        else interview.update({
            "photo": interviewToUpdate.photo,
            where: {
                id: interview.id
            }
        })
            .then(updatedInterview => {
                if (!updatedInterview) return cb(Error('Interview is not updated !'))
                else return cb(null, updatedInterview);

            })
            .catch(err => {
                cb(err)
            })
    })
        .catch(err => {
            cb(err)
        })
}

interviewDAO.prototype.list = function(idCompany,cb){
    this.models.interviews.findAll({
        where:{
            companyId: idCompany,
        }, 
        order: [ ['updatedAt',  'DESC'] ],
        include: [this.models.companies]
    }).then(interviews => {
			if (!interviews) cb(Error('There is no interview found'));
			else cb(null, interviews);
		}).catch(err => cb(err));
}

// Get Company
interviewDAO.prototype.get = function (id, cb) {
	this.models.interviews.findByPk(id)
		.then(interview => {
			if (!interview) cb(Error('interview not found!'));
			else cb(null, interview);
		}).catch(err => cb(err));

}

// GET ALL
interviewDAO.prototype.getAll = function(cb){
    this.models.interviews.findAll({
        order: [ ['updatedAt',  'DESC'] ],
    })
    .then(interviews => {
        if (!interviews) cb(Error('There is no interview found'));
        else cb(null, interviews);
    }).catch(err => cb(err));
}
