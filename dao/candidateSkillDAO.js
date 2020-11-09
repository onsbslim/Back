
var Op;
var sequelize;

var candidateSkillDAO = module.exports = function (models) {
    this.models = models;
    Op = this.models.Sequelize.Op;
    sequelize = this.models.Sequelize;
};

candidateSkillDAO.prototype.addSkillToCandidate = function (skill, idCandidate, cb) {
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
                            "candidateId": idCandidate
                        };

                        this.models.CandidateSkill.create(infos)
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
                "candidateId": idCandidate
            };

            this.models.CandidateSkill.findAndCountAll({
                where: {
                    "skillId": result.rows[0].dataValues.id,
                    "candidateId": idCandidate
                }
            }).then(result => {
                if (result.count == 0) {
                    this.models.CandidateSkill.create(infos)
                        .then(created => {
                            if (!created) cb(Error("Association not created!"));
                            else cb(null, created);
                        }).catch(err => cb(err));
                } else {
                    cb(Error("already exists"));
                }
            }).catch(err => cb(err));

        }
    }).catch(err => console.log(err.message));
};

candidateSkillDAO.prototype.getCandidateSkills = function(idCandidate,cb){
    this.models.candidates.findOne({
        where:{
            "id": idCandidate
        },
        attributes: [],
        include:[this.models.skills]
    }).then(skills => {
        if (!skills) cb(Error("No skill Found"));
        else cb(null, skills);
    }).catch(err => cb(err));
};