'use strict';



const userAcceptble = async (playerId) => {
    return await strapi.entityService.findOne('api::player.player', playerId, {
        fields: ['otp', 'weeklyWin','reloadWin'],
    });
};

const getReloadAmount = async () => {
    return await strapi.entityService.findOne('api::prize-configuration.prize-configuration', 1, {
        fields: ['reloadAmount'],
    });
};

const updateRelodAmount = async (reloadAmount) => {
    return await strapi.entityService.update('api::prize-configuration.prize-configuration', 1, {
        data: {
            reloadAmount: reloadAmount-50,
          },
    });
};

const updateReloadUserProfile = async (playerId,weeklyWin,reloadWin) => {
    return await strapi.entityService.update('api::player.player', playerId, {
        data: {
            weeklyWin: weeklyWin+1,
            reloadWin: reloadWin+1
          },
    });
};

const updateWinnerTable = async (playerId,category) => {
    return await strapi.entityService.create('api::winner.winner', {
        data: {
            category: category,
            player: playerId
          },
    });
};

module.exports = {
    userAcceptble,
    getReloadAmount,
    updateRelodAmount,
    updateReloadUserProfile,
    updateWinnerTable
};