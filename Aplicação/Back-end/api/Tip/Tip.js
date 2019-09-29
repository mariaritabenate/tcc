const { STRING, TEXT, Model } = require('sequelize')
const { sequelize } = require('../../database/sequelize')

class Tip extends Model {
}

Tip.init(
    {
        title: {
            type: STRING(100)
        },
        imageUrl: {
            type: STRING(255)
        },
        content: {
            type: TEXT
        }
    },
    {
        sequelize,
        modelName: 'tip'
    }
)

module.exports = Tip
