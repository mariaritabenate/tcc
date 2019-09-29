const { STRING, Model } = require('sequelize')
const { sequelize } = require('../../database/sequelize')
const Post = require('../Post/Post')

class BusinessPursuit extends Model {
}

BusinessPursuit.init(
    {
        name: {
            type: STRING(100)
        }
    },
    {
        sequelize,
        modelName: 'businessPursuit'
    }
)
Post.hasMany(BusinessPursuit, {as: 'ParamMondayPost', foreignKey: 'paramMondayPostId'});
Post.hasMany(BusinessPursuit, {as: 'ParamTuesdayPost', foreignKey: 'paramTuesdayPostId'});
Post.hasMany(BusinessPursuit, {as: 'ParamWednesdayPost', foreignKey: 'paramWednesdayPostId'});
Post.hasMany(BusinessPursuit, {as: 'ParamThursdayPost', foreignKey: 'paramThursdayPostId'});
Post.hasMany(BusinessPursuit, {as: 'ParamFridayPost', foreignKey: 'paramFridayPostId'});

module.exports = BusinessPursuit
