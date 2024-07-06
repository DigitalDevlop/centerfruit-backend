'use strict';

const { createCoreController } = require('@strapi/strapi').factories;
const {
    userAcceptble,
    getReloadAmount,
    updateRelodAmount,
    updateWinnerTable,
    updateReloadUserProfile
} = require('../../../dbService/winningDbService');
const CryptoJS = require('crypto-js');

module.exports = createCoreController('api::winner.winner', ({ strapi }) => ({
    async playerwinner(ctx) {
        const secretKey = "centerf";

        const decryptOTP = (encryptedOTP, secretKey) => {
            const bytes = CryptoJS.AES.decrypt(encryptedOTP, secretKey);
            return bytes.toString(CryptoJS.enc.Utf8);
        };

        const handleReloadAmountUpdate = async () => {
            try {
                const reloadAmount = await getReloadAmount();
                return await updateRelodAmount(reloadAmount.reloadAmount);
            } catch (error) {
                console.error('Error updating reload amount:', error);
                throw error;
            }
        };

        const handleReloadUserProfileUpdate = async (id, weeklyWin, reloadWin) => {
            try {
                const category = 'reload';
                await updateReloadUserProfile(id, weeklyWin, reloadWin);
                await updateWinnerTable(id, category);
            } catch (error) {
                console.error('Error updating reload user profile:', error);
                throw error;
            }
        };

        try {
            const userId = parseInt(ctx.params.id);
            const convertedOtp = ctx.params.otp;
            const decryptedOTP = parseInt(decryptOTP(convertedOtp, secretKey), 10);
            const winningCategory = ctx.params.category;

            console.log('User ID:', userId);

            if (winningCategory === "RELOAD") {
                // First, check if the user can win the prize
                const player = await userAcceptble(userId);

                console.log('Player:', player);

                let canWin = false;
                if (player.otp === decryptedOTP) {
                    if (player.reloadWin < 5 && player.weeklyWin < 2) {
                        canWin = true;
                    } else {
                        console.log('User has reached the win limit.');
                        ctx.send({ message: 'User has reached the win limit.' }, 400);
                    }
                } else {
                    console.log('OTP does not match.');
                    ctx.send({ message: 'OTP does not match.' }, 400);
                }

                // Second, give 50 rupees to the user and send a message
                if (canWin) {
                    //Send Reload & SMS


                    // Update winning configuration
                    await handleReloadAmountUpdate();
                    await handleReloadUserProfileUpdate(userId, player.weeklyWin, player.reloadWin);
                    console.log('Prize awarded and user profile updated.');
                    ctx.send({ message: 'Prize awarded and user profile updated.' }, 200);
                }
            }
        } catch (error) {
            console.error('Error occurred:', error);
            ctx.send({ message: 'Internal server error', error: error.message }, 500);
        }
    }
}));
