const controller = require('./User.controller')

function routes(server) {
    server.route({
        method: 'POST',
        path: '/auth',
        handler: controller.auth
    })
    server.route({
        method: 'PUT',
        path: '/user',
        handler: controller.update
    })
    server.route({
        method: 'POST',
        path: '/user',
        handler: controller.create
    })
    server.route({
        method: 'GET',
        path: '/user/calendar',
        handler: controller.getCalendar
    })
}

module.exports = routes
