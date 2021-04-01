var bcrypt = require('bcrypt-nodejs');
var companyDao = module.exports = function (models) {
	this.models = models;
};

// Function to hash Password
function hashPassword(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

// Create New Company 

companyDao.prototype.create = function (company, cb) {
	var newCompany = {
		"email": company.email,
		"password": hashPassword(company.password),
		"name": company.name,

	}
	this.models.companies.findOne({
		where: {
			email: company.email
		}
	}).then(company => {
		if (company) cb(Error("company already exists"));
		else {
			this.models.companies.create(newCompany)
				.then(createdCompany => {
					if (!createdCompany)
						return cb(Error("company not created !"));
					else
						return cb(null, createdCompany);
				})
				.catch(err => cb(err))
		}
	}).catch(err => cb(err));

};

// Update existing company
companyDao.prototype.update = function (id, companyToUpdate, cb) {
	this.models.companies.findOne({
		where: {
			id
		}
	}).then(company => {
		if (!company) return cb(Error('Company not found'))
		else company.update({
			"email": companyToUpdate.email,
			"name": companyToUpdate.name,
			"about": companyToUpdate.about,
			"sector": companyToUpdate.sector,
			"phone": companyToUpdate.phone,
			"website": companyToUpdate.website,
			"founded": companyToUpdate.founded,
			"linkedin": companyToUpdate.linkedin,
			"size": companyToUpdate.size,
			"logo": companyToUpdate.logo,
			"cover": companyToUpdate.cover,
			"country": companyToUpdate.country,
			"state": companyToUpdate.state,
			"city": companyToUpdate.city,
			"street": companyToUpdate.street,
			"postal_code": companyToUpdate.postal_code,
			"longitude": companyToUpdate.longitude,
			"latitude": companyToUpdate.latitude,
			"verified": companyToUpdate.verified,
			"playerId": companyToUpdate.playerId,
			"oneSignalId": companyToUpdate.oneSignalId,
			where: {
				id: company.id
			}
		})
			.then(updatedCompany => {
				if (!updatedCompany) return cb(Error('Company is not updated !'))
				else return cb(null, updatedCompany);

			})
			.catch(err => {
				cb(err)
			})
	})
		.catch(err => {
			cb(err)
		})
};

// Remove Company
companyDao.prototype.remove = function (id, cb) {
	this.models.companies.destroy({
		where: {
			id
		}
	}).then(company => {
		if (company > 0) return cb(null, company)
		else return cb(Error('Company is not deleted'));
	})
		.catch(err => cb(err));
};

// Get Company
companyDao.prototype.get = function (id, cb) {
	this.models.companies.findByPk(id)
		.then(company => {
			if (!company) cb(Error('Company not found!'));
			else cb(null, company);
		}).catch(err => cb(err));

}

// Get All Companies
companyDao.prototype.list = function (cb) {
	this.models.companies.findAll()
		.then(companies => {
			if (!companies) cb(Error('There is no company found'));
			else cb(null, companies);
		}).catch(err => cb(err));
}

//Company Login
companyDao.prototype.auth = function (companyData, cb) {
	this.models.companies.findOne({
		where: {
			email: companyData.email,
		}
	})
		.then(company => {
			if (!company) cb(Error('No company found'));
			else if (!company.validPassword(companyData.password)) cb(Error('Wrong Password'));
			else cb(null, company);

		}).catch(err => cb(err));
}

//connected company
companyDao.prototype.getConnected = function (id, cb) {
	this.models.companies.findOne({
		where: {
			id: id,
		}
	})
		.then(company => {
			if (!company) cb(Error('No company found'));
			else cb(null, company);
		}).catch(err => cb(err));
}

// upload image

companyDao.prototype.upload = function (id, companyToUpdate, cb) {

	this.models.companies.findOne({
		where: {
			id
		}
	}).then(company => {
		if (!company) return cb(Error('company not found'))
		else company.update({
			"logo": companyToUpdate.logo,
			where: {
				id: company.id
			}
		})
			.then(updatedCompany => {
				if (!updatedCompany) return cb(Error('company is not updated !'))
				else return cb(null, updatedCompany);

			})
			.catch(err => {
				cb(err)
			})
	})
		.catch(err => {
			cb(err)
		});
};
companyDao.prototype.getDetailedCompany = function(id, cb) {
	this.models.companies.findOne({
		where:{
			id: id
		},
		include: [this.models.interviews]
	}).then(company => {
		cb(null, company);
	}).catch(err => {
		cb(err);
	});
};