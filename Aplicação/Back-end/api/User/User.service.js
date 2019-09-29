const {pbkdf2Sync} = require('crypto')
const config = require('../../config')
const jwt = require('jsonwebtoken')
const User = require('./User')
const {Op} = require('sequelize')
const Boom = require('boom')

function passwordHash(password) {
    return pbkdf2Sync(password, config.salt, 100000, 64, 'sha512').toString('hex')
}

function generateToken(user) {
    return `Bearer ${jwt.sign(user, config.salt, {expiresIn: '7d'})}`
}

async function auth(email, password) {
    let user = await User.findOne({where: {email: {[Op.eq]: email}}, raw: true})

    if (!user) {
        throw Boom.notFound('Usuário não encontrado')
    }

    if (user.password !== passwordHash(password)) {
        throw Boom.badRequest('Senha incorreta')
    }

    delete user.password

    return user
}

async function update(updatedUser) {
    let user = await User.findOne({where: {id: {[Op.eq]: updatedUser.id}}})

    if (!user) {
        throw Boom.notFound('Usuário não encontrado')
    }

    user.fullName = updatedUser.fullName
    user.email = updatedUser.email
    if (updatedUser.password) {
        user.password = passwordHash(updatedUser.password)
    }

    user.businessName = updatedUser.businessName
    user.businessPursuitId = updatedUser.businessPursuitId
    user.businessTargetAgeId = updatedUser.businessTargetAgeId
    user.businessSizeId = updatedUser.businessSizeId
    user.businessPrimaryColorId = updatedUser.businessPrimaryColorId

    user.save()
}

async function create(newUser) {
    let user = await User.findOne({where: {email: {[Op.eq]: newUser.email}}, raw: true})

    if (user) {
        throw Boom.badRequest('Usuário já cadastrado')
    }

    if (newUser.password !== newUser.confirmPassword) {
        throw Boom.badRequest('Confirmação de senha incorreta')
    }

    user = new User()
    user.fullName = newUser.fullName
    user.email = newUser.email
    user.password = passwordHash(newUser.password)

    user = await user.save()

    user = user.toJSON()

    delete user.password

    return user
}

module.exports = {
    passwordHash,
    generateToken,
    auth,
    update,
    create
}
