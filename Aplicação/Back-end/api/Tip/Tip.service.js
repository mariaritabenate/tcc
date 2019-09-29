const Tip = require('./Tip')

async function findAll() {
    return Tip.findAll()
}

module.exports = {
    findAll
}
