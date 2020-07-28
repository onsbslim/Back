var answerDAO = module.exports = function (models) {
    this.models = models;
};

answerDAO.prototype.create = function(answer, cb){
    var newAnswer = {
        "applicationId" : answer.applicationId,
        "questionId" : answer.questionId,
    };
    this.models.answers.create(newAnswer).then( createdAnswer =>{
        if (!createdAnswer){
            return cb(Error("answer not created !"));
        }else{
            return cb(null, createdAnswer)
        }
    }).catch(err => cb(err));

};

answerDAO.prototype.upload = function(id, answerToUpdate,cb){
    this.models.answers.findOne({
        where: {
            id
        }
    }).then( answer =>{
        if (!answer) return cb(Error('Answer not found'))
        else answer.update({
            "video": answerToUpdate.video,
            where: {
                id: answer.id
            }
        }).then(updatedAnswer =>{
            if (!updatedAnswer) return cb(Error("answer not updated!"));
            else return cb(null, updatedAnswer);
        }).catch(err => {cb(err)});

    });
    
};