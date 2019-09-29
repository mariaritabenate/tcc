const tipService = require('./Tip.service')

async function findAll(request, h) {
    return await tipService.findAll()
}

module.exports = {
    findAll
}
