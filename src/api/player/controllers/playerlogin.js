'use strict';

const { createCoreController } = require('@strapi/strapi').factories;
const { findPlayerByMobileandOtp, changeActiveOtpStatus,  } = require('../../../dbService/playerDbService');

module.exports = createCoreController('api::player.player', ({ strapi }) => ({
    async playerlogin(ctx) {
  
        try {
            // @ts-ignore
            const { mobile,otp } = ctx.request.params;

            const playerCheck = await findPlayerByMobileandOtp(mobile,otp);

            if(playerCheck.length > 0){
                const player = playerCheck[0].id;

                const playerLogin = await changeActiveOtpStatus(player);

                ctx.send({status:'Success', message: 'Player Log In', player: playerLogin }, 200);
            }else{
                ctx.send({status:'Failed', message: 'Athentication Failed or Used Otp'}, 401);
            }
               

           
        } catch (error) {
            console.error('Error occurred:', error);
            ctx.send({ message: 'Internal server error', error: error.message }, 500);
        }
    }
}));
