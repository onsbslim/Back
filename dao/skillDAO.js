var skillDAO = module.exports = function (models) {
    this.models = models;
};

skillDAO.prototype.getAll = function(cb){
    this.models.skills.findAll()
        .then(skills => {
            if (!skills) cb(Error('No Skill Found'));
            else cb(null, skills);
        }).catch(err => cb(err))
};

skillDAO.prototype.addSkill = function(skill, cb){
    var skill = {
        "skill": skill
    };
    this.models.skills.create(skill)
        .then(createdSkill => {
            if (!createdSkill) cb(Error("Skill is not created!"));
            else cb(null, createdSkill);
        })
        .catch(err => cb(err));
};

