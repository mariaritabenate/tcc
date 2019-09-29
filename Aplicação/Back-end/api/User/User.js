const {Op, STRING, Model} = require('sequelize')
const {sequelize} = require('../../database/sequelize')
const BusinessPursuit = require('../BusinessPursuit/BusinessPursuit')
const BusinessTargetAge = require('../BusinessTargetAge/BusinessTargetAge')
const BusinessSize = require('../BusinessSize/BusinessSize')
const BusinessPrimaryColor = require('../BusinessPrimaryColor/BusinessPrimaryColor')

class User extends Model {
}

User.init(
    {
        fullName: {
            type: STRING(100)
        },
        email: {
            type: STRING(255),
            allowNull: false,
            unique: true
        },
        password: {
            type: STRING(128),
            allowNull: false
        },

        businessName: {
            type: STRING(100)
        },
    },
    {
        sequelize,
        modelName: 'user'
    }
)
BusinessPursuit.hasMany(User);
BusinessTargetAge.hasMany(User);
BusinessSize.hasMany(User);
BusinessPrimaryColor.hasMany(User);

User.afterSync(async () => {
    const {passwordHash} = require('./User.service')
    const hasMariaUser = await User.count({where: {email: {[Op.eq]: 'mariaritabenate@gmail.com'}}}) > 0
    if (!hasMariaUser) {
        const maria = new User()
        maria.fullName = 'Maria Rita'
        maria.email = 'mariaritabenate@gmail.com'
        maria.password = passwordHash('12345678')
        maria.save()
    }
})

module.exports = User
