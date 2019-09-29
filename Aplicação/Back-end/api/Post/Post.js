const { STRING, Model } = require('sequelize')
const { sequelize } = require('../../database/sequelize')

class Post extends Model {
}

Post.init(
    {
        name: {
            type: STRING(100)
        }
    },
    {
        sequelize,
        modelName: 'post'
    }
)

module.exports = Post
