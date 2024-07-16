'use strict';

const { createCoreController } = require('@strapi/strapi').factories;
const { getPlayersWithReloadWinNotZeroOrNull,updateLoginAttempts } = require('../../../dbService/cronService');
const { LoggerPlayerAttempt } = require('../../../logger/logger');



module.exports = createCoreController('api::player.player', ({ strapi }) => ({
    async dailyattempt(ctx) {
  
        try {

            LoggerPlayerAttempt.info('Starting daily attempt renewal process');
           

            const playersToUpdate = await getPlayersWithReloadWinNotZeroOrNull();

            LoggerPlayerAttempt.info(`Fetched ${playersToUpdate.length} players to update`);



            await updateLoginAttempts(playersToUpdate);
            LoggerPlayerAttempt.info('Updated login attempts for all fetched players');


                ctx.send({ status: 'Success', message: 'Dailly Attemt Renew' }, 200);
                LoggerPlayerAttempt.info('Daily attempt renewal process completed successfully');
          
        } catch (error) {
            console.error('Error occurred:', error);
            LoggerPlayerAttempt.error('Error occurred during daily attempt renewal process:', error);
            ctx.send({ message: 'Internal server error', error: error.message }, 500);
        }
    }
}));