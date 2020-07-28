var applicationDAO = module.exports = function (models) {
    this.models = models;
};
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

};

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
};


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