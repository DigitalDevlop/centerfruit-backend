'use strict';

const { createCoreController } = require('@strapi/strapi').factories;
const { sendMessage, sendAttemptMessage } = require('../../../smsService/smsService');
const { findPlayerByMobile, updatePlayerOTP, createNewPlayer, findPlayerByAttempt } = require('../../../dbService/playerDbService');
const messageTemplates = require('../../../config/template');
const { msgCategory } = require('../../../config/enum');

module.exports = createCoreController('api::player.player', ({ strapi }) => ({
    async external(ctx) {
        const generateOTP = () => Math.floor(1000 + Math.random() * 9000);

        try {

            // @ts-ignore
            const { mobile } = ctx.request.body;
            console.log(`Mobilenumber: ${mobile}`);





            // @ts-ignore
            console.log("Testing", ctx.request.body)

            const existingPlayer = await findPlayerByMobile(mobile);

            if (existingPlayer.length > 0) {
                const AttemptCheck = await findPlayerByAttempt(mobile);
                const PlayerAttempt = AttemptCheck[0].loginAttempt;

                if (PlayerAttempt < 10) {
                    const player = existingPlayer[0].id;
                    const mobile = parseInt(existingPlayer[0].mobile, 10);
                    const otp = generateOTP();

                    const updatedPlayer = await updatePlayerOTP(player, otp);
                    await sendMessage(mobile, otp, messageTemplates.existingPlayer, msgCategory.OTP);

                    ctx.send({ message: 'Updated player', player: updatedPlayer }, 200);
                } else {

                    await sendAttemptMessage(mobile, messageTemplates.attemptMSG, msgCategory.Attempt);
                    ctx.send({ message: 'Attempt Exceeded' }, 200);


                }

            } else {
                // @ts-ignore
                const otp = generateOTP();

                const newPlayer = await createNewPlayer(mobile, otp);
                await sendMessage(mobile, otp, messageTemplates.newPlayer, msgCategory.OTP);

                ctx.send({ message: 'New player added', player: newPlayer }, 201);
            }





        } catch (error) {
            console.error('Error occurred:', error);
            ctx.send({ message: 'Internal server error', error: error.message }, 500);
        }
    }
}));
