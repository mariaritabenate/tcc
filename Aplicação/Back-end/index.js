'use strict'

const Hapi = require('@hapi/hapi')
const { sequelizeInit } = require('./database/sequelize')
const routes = require('./api/routes')
const handler = require('serve-handler')
const http = require('http')
const config = require('./config')

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: config.host,
        routes: {
            cors: true
        }
    })

    server.ext('onPreResponse', function (request, h) {
        const response = request.response
        if (response && response.isBoom && response.isServer) {
            const error = response.error || response.message
            server.log([ 'error' ], error)
        }
        return h.continue
    })

    server.events.on('log', (event, tags) => {
        if (tags.error) {
            console.error(
                `Server error: ${event.error ? event.error.message : 'unknown'}`
            )
            console.error(event.data)
        }
    })

    routes(server)

    await sequelizeInit()

    await server.start()
    console.log('[Server] API running on %s', server.info.uri)

    const webServer = http.createServer((request, response) => {
        return handler(request, response, {
            public: './public/'
        })
    })

    webServer.listen(80, () => {
        console.log('[Web] Running at http://localhost:80')
    })
}

process.on('unhandledRejection', err => {
    console.log(err)
    process.exit(1)
})

init().then()
