'use strict';

const { subDays, startOfDay, endOfDay } = require('date-fns');

const getWeeklyWinning = async () => {
    const today = new Date();
    const lastWeek = subDays(today, 7);

    // Fetch winners for the last 7 days including today
    const winners = await strapi.entityService.findMany('api::winner.winner', {
        filters: {
            updatedAt: {
                $gte: startOfDay(lastWeek),
                $lte: endOfDay(today),
            },
        },
    });

    // Group winners by date and count them
    const winnersByDate = winners.reduce((acc, winner) => {
        const date = new Date(winner.updatedAt).toISOString().split('T')[0]; // Get the date part
        if (!acc[date]) {
            acc[date] = 0;
        }
        acc[date] += 1;
        return acc;
    }, {});

    return winnersByDate;
};

module.exports = {
    getWeeklyWinning
};