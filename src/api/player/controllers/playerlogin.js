'use strict';

const { createCoreController } = require('@strapi/strapi').factories;
const { findPlayerByMobileandOtp, changeActiveOtpStatus, checkPlayerOtp  } = require('../../../dbService/playerDbService');

module.exports = createCoreController('api::player.player', ({ strapi }) => ({
    async playerlogin(ctx) {
  
        try {
            // Extract mobile and otp from request parameters
            // @ts-ignore
            const { mobile, otp } = ctx.request.params;
        
            // Check OTP for the provided mobile number
            const checkOTP = await checkPlayerOtp(mobile);
            
            if (checkOTP.length === 0 || checkOTP[0].otp !== parseInt(otp)) {
                ctx.send({ status: 'Failed', code: 101, message: 'OTP mismatch or invalid mobile number' }, 401);
                return;
            }
        
            // Find player by mobile and OTP
            const playerCheck = await findPlayerByMobileandOtp(mobile, otp);
        
            if (playerCheck.length > 0) {
                const player = playerCheck[0].id;
                const playerAttempt = playerCheck[0].loginAttempt;
        
                // Change active OTP status
                const playerLogin = await changeActiveOtpStatus(player,playerAttempt);
        
                ctx.send({ status: 'Success', message: 'Player Log In', player: playerLogin }, 200);
            } else {
                ctx.send({ status: 'Failed',code: 102, message: 'Deactivate OTP' }, 401);
            }
        } catch (error) {
            console.error('Error occurred:', error);
            ctx.send({ message: 'Internal server error', error: error.message }, 500);
        }
    }
}));
