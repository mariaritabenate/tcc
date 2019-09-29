const { STRING, Model } = require('sequelize')
const { sequelize } = require('../../database/sequelize')

class BusinessSize extends Model {
}

BusinessSize.init(
    {
        name: {
            type: STRING(100)
        },
        paramFrequency: {
            type: STRING(100)
        }
    },
    {
        sequelize,
        modelName: 'businessSize'
    }
)

module.exports = BusinessSize
