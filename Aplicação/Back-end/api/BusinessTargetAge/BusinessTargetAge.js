const { STRING, Model } = require('sequelize')
const { sequelize } = require('../../database/sequelize')

class BusinessTargetAge extends Model {
}

BusinessTargetAge.init(
    {
        name: {
            type: STRING(100)
        },
        paramTime: {
            type: STRING(100)
        }
    },
    {
        sequelize,
        modelName: 'businessTargetAge'
    }
)

module.exports = BusinessTargetAge
