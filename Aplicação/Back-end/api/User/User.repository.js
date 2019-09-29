const { sequelize } = require('../../database/sequelize')

async function getCalendar(userId) {
    return sequelize.query('SELECT p1.name             AS monday,\n' +
        '       p2.name             AS tuesday,\n' +
        '       p3.name             AS wednesday,\n' +
        '       p4.name             AS thursday,\n' +
        '       p5.name             AS friday,\n' +
        '       bta."paramTime"     AS time,\n' +
        '       bs."paramFrequency" AS frequency,\n' +
        '       bpc."paramColor"    AS color\n' +
        'FROM users u\n' +
        '         INNER JOIN "businessPursuits" bp\n' +
        '                    ON bp.id = u."businessPursuitId"\n' +
        '         INNER JOIN posts p1\n' +
        '                    ON p1.id = bp."paramMondayPostId"\n' +
        '         INNER JOIN posts p2\n' +
        '                    ON p2.id = bp."paramTuesdayPostId"\n' +
        '         INNER JOIN posts p3\n' +
        '                    ON p3.id = bp."paramWednesdayPostId"\n' +
        '         INNER JOIN posts p4\n' +
        '                    ON p4.id = bp."paramThursdayPostId"\n' +
        '         INNER JOIN posts p5\n' +
        '                    ON p5.id = bp."paramFridayPostId"\n' +
        '         INNER JOIN "businessTargetAges" bta\n' +
        '                    ON bta.id = u."businessTargetAgeId"\n' +
        '         INNER JOIN "businessSizes" bs\n' +
        '                    ON bs.id = u."businessSizeId"\n' +
        '         INNER JOIN "businessPrimaryColors" bpc\n' +
        '                    ON bpc.id = u."businessPrimaryColorId"\n' +
        'WHERE u.id = :userId;',
        { replacements: { userId: userId }, type: sequelize.QueryTypes.SELECT }
    )
}

module.exports = {
    getCalendar
}
