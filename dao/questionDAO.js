var questionDAO = module.exports = function (models) {
    this.models = models;
};

// Create Question
questionDAO.prototype.create = function (question, cb) {

    var newQuestion = {
        "interviewId": question.interviewId,
        "text_question": question.text_question,
    }

    this.models.questions.create(newQuestion)
        .then(createdQuestion => {
            if (!createdQuestion)
                return cb(Error("question not created !"));
            else
                return cb(null, createdQuestion)
        })
        .catch(err => cb(err))


};

// Update Question / upload audio

questionDAO.prototype.upload = function(id, questionUpdate, cb) {
    this.models.questions.findOne({
        where: {
            id
        }
    }).then(question => {
        if (!question) return cb(Error('question not found'))
        else question.update({
            "audio_question": questionUpdate.audio_question,
            where: {
                id: question.id
            }
        })
            .then(updatedQuestion => {
                if (!updatedQuestion) return cb(Error('Question is not updated !'))
                else return cb(null, updatedQuestion);

            })
            .catch(err => {
                cb(err)
            })
    })
        .catch(err => {
            cb(err)
        })
};

questionDAO.prototype.countQuestions = function(interviewId,cb){
    this.models.questions.findAndCountAll({
        where: {
            interviewId : interviewId
        }
    }).then( result =>{
        return cb(null, result.count);
    }).catch(err =>{
        cb(err);
    });
};


