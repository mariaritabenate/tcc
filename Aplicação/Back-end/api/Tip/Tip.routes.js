const controller = require('./Tip.controller')

function routes(server) {
    server.route({
        method: 'GET',
        path: '/tips',
        handler: controller.findAll
    })
}

module.exports = routes
