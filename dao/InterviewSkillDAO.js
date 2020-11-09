var Op;
var sequelize;

var interviewSkillDAO = module.exports = function (models) {
    this.models = models;
    Op = this.models.Sequelize.Op;
    sequelize = this.models.Sequelize;
};

interviewSkillDAO.prototype.addSkill = function(idInterview, skill,cb){
    var skillEntry = {
        "skill": skill
    };
    this.models.skills.findAndCountAll({
        where: {
            "skill": skill
        }
    }).then(result => {
        if (result.count == 0) {

            this.models.skills.create(skillEntry)
                .then(createdSkill => {
                    if (!createdSkill) cb(Error("Skill is not created!"));
                    else {
                        var infos = {
                            "skillId": createdSkill.id,
                            "interviewId": idInterview
                        };

                        this.models.InterviewSkill.create(infos)
                            .then(created => {
                                if (!created) cb(Error("Association not created!"));
                                else cb(null, created);
                            }).catch(err => cb(err));
                    }
                })
                .catch(err => cb(err));
        } else {
            var infos = {
                "skillId": result.rows[0].dataValues.id,
                "interviewId": idInterview
            };

            this.models.InterviewSkill.findAndCountAll({
                where: {
                    "skillId": result.rows[0].dataValues.id,
                    "interviewId": idInterview
                }
            }).then(result => {
                if (result.count == 0) {
                    this.models.InterviewSkill.create(infos)
                        .then(created => {
                            if (!created) cb(Error("Association not created!"));
                            else cb(null, created);
                        }).catch(err => cb(err));
                } else {
                    cb(Error("already exists"));
                }
            }).catch(err => cb(err));

        }
    }).catch(err => console.log(err));
};

interviewSkillDAO.prototype.getInterviewSkills = function(interviewId, cb){
    this.models.interviews.findOne({
        where: {
            "id": interviewId
        },
        attributes: [],
        include: [this.models.skills]
    }).then(interviewsSkills => {
        if (!interviewsSkills) cb(Error('interviews not found'));
        else cb(null, interviewsSkills);
    }).catch(err => cb(err));
};

interviewSkillDAO.prototype.deleteSkillFromInterview = function(interviewId, skill, cb){
    this.models.InterviewSkill.findOne({
        where: {
            "interviewId": interviewId,
            "skillId": skill
        }
    }).then(interiewskill => {
        if (!interiewskill) cb(Error('not Found!'));
        else {
            this.models.InterviewSkill.destroy({
                where: {
                    "interviewId": interiewskill.interviewId,
                    "skillId": interiewskill.skillId
                }
            }).then(result => {
                if (!result) cb(Error('Not found'));
                else cb(null, result)
            }).catch(err => cb(err));
        }
    }).catch(err => cb(err));
};