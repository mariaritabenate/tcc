const userService = require('./User.service')
const userRepository = require('./User.repository')

async function auth(request, h) {
    const email = request.payload.email
    const password = request.payload.password

    const user = await userService.auth(email, password)
    const token = await userService.generateToken(user)

    return { user, token }
}

async function update(request, h) {
    const user = request.payload

    await userService.update(user)

    return true
}

async function create(request, h) {
    const newUser = request.payload

    const user = await userService.create(newUser)
    const token = await userService.generateToken(user)

    return { user, token }
}

async function getCalendar(request, h) {
    const userId = request.query.userId

    return await userRepository.getCalendar(userId)
}

module.exports = {
    auth,
    update,
    create,
    getCalendar
}
