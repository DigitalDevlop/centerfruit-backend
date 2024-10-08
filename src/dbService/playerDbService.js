'use strict';



const findPlayerByMobile = async (mobile) => {
    return await strapi.entityService.findMany('api::player.player', {
        filters: { mobile: mobile },
    });
};

const updatePlayerOTP = async (playerId, otp) => {
    return await strapi.entityService.update('api::player.player', playerId, {
        data: {
            otp: otp,
            activeOTP: 1,
        },
    });
};

const createNewPlayer = async (mobile, otp) => {
    return await strapi.entityService.create('api::player.player', {
        data: {
            mobile: `${mobile}`,
            otp: otp,
            activeOTP: 1,
        },
    });
};

const findPlayerByMobileandOtp = async (mobile,otp) => {
    return await strapi.entityService.findMany('api::player.player', {
        filters: { mobile: mobile,otp:otp,activeOTP:1 },
    });
};

const checkPlayerOtp = async (mobile) => {
    return await strapi.entityService.findMany('api::player.player', {
        filters: { mobile: mobile },
    });
};

const changeActiveOtpStatus = async (playerId,playerAttempt) => {
    return await strapi.entityService.update('api::player.player', playerId, {
        data: {
            activeOTP: 0,
            loginAttempt:playerAttempt+1
        },
    });
};

const findPlayerByAttempt = async (mobile) => {
    return await strapi.entityService.findMany('api::player.player', {
        filters: { mobile: mobile },
    });
};


module.exports = {
    findPlayerByMobile,
    updatePlayerOTP,
    createNewPlayer,
    findPlayerByMobileandOtp,
    changeActiveOtpStatus,
    checkPlayerOtp,
    findPlayerByAttempt,
};