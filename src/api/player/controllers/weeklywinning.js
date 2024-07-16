'use strict';

const { createCoreController } = require('@strapi/strapi').factories;
const { getPlayersWithWeeklyWinningZeroOrNull, updateWeeklyWin } = require('../../../dbService/cronService');
const { WeeklyWinning } = require('../../../logger/logger');



module.exports = createCoreController('api::player.player', ({ strapi }) => ({
    async weeklywinning(ctx) {

        try {

            WeeklyWinning.info('Starting Weekly Winning renewal process');

            // Fetch all players with reloadWin not equal to 0 or null
            const playersToUpdate = await getPlayersWithWeeklyWinningZeroOrNull();

            WeeklyWinning.info(`Fetched ${playersToUpdate.length} players to update`);


            // Update reloadWin to 0 for all fetched players
            await updateWeeklyWin(playersToUpdate);
            WeeklyWinning.info('Updated Weekly Winning for all fetched players');


            ctx.send({ status: 'Success', message: 'Weekly Winning Renew' }, 200);
            WeeklyWinning.info('Weekly Winning renewal process completed successfully');

        } catch (error) {
            console.error('Error occurred:', error);
            WeeklyWinning.error('Error occurred during Weekly Winning renewal process:', error);
            ctx.send({ message: 'Internal server error', error: error.message }, 500);
        }
    }
}));