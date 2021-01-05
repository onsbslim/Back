const { application } = require("express");

var applicationDAO = module.exports = function (models) {
    this.models = models;
}
// Create Application
applicationDAO.prototype.create = function (application, cb) {

    var newApplication = {
        "status": application.status,
        "interviewId": application.interviewId,
        "candidateId": application.candidateId ,
    }
    this.models.applications.create(newApplication)
        .then(createdApplication => {
            if (!createdApplication)
                return cb(Error("application not created !"));
            else
                return cb(null, createdApplication)
        })
        .catch(err => cb(err))

}

applicationDAO.prototype.countApplications = function (interviewId, cb){
    this.models.applications.findAndCountAll({
        where: {
            interviewId : interviewId
        }
    }).then(result =>{
        return cb(null, result.count);
    }).catch(err =>{
        cb(err);
    });
}


applicationDAO.prototype.verifyApplication = function(interviewId, candidateId, cb){
    this.models.applications.findAndCountAll({
        where: {
            interviewId : interviewId,
            candidateId : candidateId,
        }
    }).then(result =>{
        return cb(null, result.count);
    }).catch(err =>{
        cb(err);
    });
}

// Get interview's Application
applicationDAO.prototype.getApplications = function(interviewId, cb){
    this.models.applications.findAndCountAll({
        where: {
            interviewId : interviewId,
        },
        include: [this.models.candidates]
    }).then(result => {
        return cb(null, result);
    }).catch(err => {
        cb(err);
    });
}

// Get Application
applicationDAO.prototype.getApplication = function(applicationId, cb){
    this.models.applications.findOne({
        where: {
            id : applicationId,
        },
        include: [this.models.candidates, this.models.interviews, {model: this.models.answers, include: [this.models.questions]}]

    }).then(result => {
        return cb(null, result);
    }).catch(err => {
        cb(err);
    });
}

applicationDAO.prototype.getCandidateApplications = function(candidateId, cb){
    this.models.applications.findAll({
        where: {
            candidateId: candidateId
        },
        include: [{model: this.models.interviews, include: [this.models.companies]}]
    }).then(result =>{
        return cb(null, result);
    }).catch(err => {
        cb(err);
    });
}

applicationDAO.prototype.updateApplication = function(id, status, explanation, cb){
    this.models.applications.findByPk(id).then(application =>{
        if (!application) return cb(Error('Application not found'));
        else application.update({
            "status" : status,
            "explanation": explanation,
            where:{
                id: id,
            }
        }).then(updatedApplication =>{
            if (!updatedApplication) return cb(Error('Application not updated'));
            else return cb(null, updatedApplication);
        }).catch( err => {
            cb(err);
        });
    }).catch(err =>{
        cb(err);
    });
};