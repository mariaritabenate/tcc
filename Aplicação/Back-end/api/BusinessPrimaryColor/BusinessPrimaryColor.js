const { STRING, Model } = require('sequelize')
const { sequelize } = require('../../database/sequelize')

class BusinessPrimaryColor extends Model {
}

BusinessPrimaryColor.init(
    {
        name: {
            type: STRING(100)
        },
        paramColor: {
            type: STRING(100)
        }
    },
    {
        sequelize,
        modelName: 'businessPrimaryColor'
    }
)

module.exports = BusinessPrimaryColor
