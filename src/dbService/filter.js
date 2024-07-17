'use strict';

const { subDays, startOfDay, endOfDay, eachDayOfInterval, format } = require('date-fns');

const getWeeklyWinning = async () => {
    const today = new Date();
    const lastWeek = subDays(today, 7);

    // Generate the list of dates within the last 7 days
    const dates = eachDayOfInterval({ start: lastWeek, end: today }).map(date =>
        format(date, 'yyyy-MM-dd')
    );

    // Initialize the winners count for each date
    const winnersByDate = dates.reduce((acc, date) => {
        acc[date] = 0;
        return acc;
    }, {});

    // Fetch winners for the last 7 days including today
    const winners = await strapi.entityService.findMany('api::winner.winner', {
        filters: {
            updatedAt: {
                $gte: startOfDay(lastWeek),
                $lte: endOfDay(today),
            },
        },
    });

    // Update the winners count for each date
    winners.forEach(winner => {
        const date = format(new Date(winner.updatedAt), 'yyyy-MM-dd');
        if (winnersByDate[date] !== undefined) {
            winnersByDate[date] += 1;
        }
    });

    return winnersByDate;
};

module.exports = {
    getWeeklyWinning
};
