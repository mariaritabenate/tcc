function routes(server) {
    require('./User/User.routes')(server)
    require('./Tip/Tip.routes')(server)
}

module.exports = routes
