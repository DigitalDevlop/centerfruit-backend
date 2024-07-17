'use strict';

/**
 * winner controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const {
    getWeeklyWinning
} = require('../../../dbService/filter');

module.exports = createCoreController('api::winner.winner', ({ strapi }) => ({
    async playerwinner(ctx) {
        const winnersByDate = await getWeeklyWinning();

        // Format the result as needed
        const result = Object.keys(winnersByDate).map(date => ({
            Date: date,
            Winners: winnersByDate[date]
        }));

        ctx.send(result);
    }
}));

