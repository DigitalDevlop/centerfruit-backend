'use strict';



const userAcceptble = async (playerId) => {
    return await strapi.entityService.findOne('api::player.player', playerId, {
        fields: ['mobile','otp', 'weeklyWin','reloadWin','darazWin'],
    });
};

const get50ReloadChances = async () => {
    return await strapi.entityService.findOne('api::prize-configuration.prize-configuration', 1, {
        fields: ['reloadFifty'],
    });
};

const update50RelodAmount = async (ReloadChances) => {
    return await strapi.entityService.update('api::prize-configuration.prize-configuration', 1, {
        data: {
            reloadFifty: ReloadChances-1,
          },
    });
};

const get100ReloadChances = async () => {
    return await strapi.entityService.findOne('api::prize-configuration.prize-configuration', 1, {
        fields: ['reloadHundred'],
    });
};

const update100RelodAmount = async (ReloadChances) => {
    return await strapi.entityService.update('api::prize-configuration.prize-configuration', 1, {
        data: {
            reloadHundred: ReloadChances-1,
          },
    });
};

const getDarazAmout = async () => {
    return await strapi.entityService.findOne('api::prize-configuration.prize-configuration', 1, {
        fields: ['darazVoucher'],
    });
};


const updateDarazWinning = async (darazAmout) => {
    return await strapi.entityService.update('api::prize-configuration.prize-configuration', 1, {
        data: {
            darazVoucher: darazAmout-1,
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

const updateDarazUserProfile = async (playerId) => {
    return await strapi.entityService.update('api::player.player', playerId, {
        data: {
           darazWin:1
          },
    });
};

const updateWinnerTable = async (playerId,category,mobile) => {
    return await strapi.entityService.create('api::winner.winner', {
        data: {
            category: category,
            player: playerId,
            mobile:mobile,
          },
    });
};

const getDarazWinning = async () => {
    return await strapi.entityService.findMany('api::daraz-voucher.daraz-voucher', {
        filters: { status:1 },
    });
};

const updateDarazStatus = async (voucher) => {
    return await strapi.entityService.update('api::daraz-voucher.daraz-voucher', voucher, {
        data: {
           status:0
          },
    });
};

module.exports = {
    userAcceptble,
    get50ReloadChances,
    update50RelodAmount,
    get100ReloadChances,
    update100RelodAmount,
    updateReloadUserProfile,
    updateWinnerTable,
    getDarazAmout,
    updateDarazUserProfile,
    updateDarazWinning,
    getDarazWinning,
    updateDarazStatus
};