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

        const handleReloadAmountUpdate = async (winningPrize) => {
            try {
                const reloadAmount = await getReloadAmount();
                return await updateRelodAmount(reloadAmount.reloadAmount,winningPrize);
            } catch (error) {
                console.error('Error updating reload amount:', error);
                throw error;
            }
        };

        const handleReloadUserProfileUpdate = async (id,mobile, weeklyWin, reloadWin,winningPrize) => {
            try {
                const category = `reload-${winningPrize}`;
                await updateReloadUserProfile(id, weeklyWin, reloadWin);
                await updateWinnerTable(id, category,mobile);
            } catch (error) {
                console.error('Error updating reload user profile:', error);
                throw error;
            }
        };

        try {
            const userId = parseInt(ctx.params.id);
            // @ts-ignore
            const convertedOtp = ctx.request.body.otp;
            const decryptedOTP = parseInt(decryptOTP(convertedOtp, secretKey), 10);
            const winningCategory = ctx.params.category;
            

            console.log('User ID:', userId);

            if (winningCategory === "RELOAD-50") {
                const winningPrize = 50; 
                 // First, check if the user can win the prize
                 const player = await userAcceptble(userId);
 
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
                     await handleReloadAmountUpdate(winningPrize);
                     await handleReloadUserProfileUpdate(userId,player.mobile, player.weeklyWin, player.reloadWin,winningPrize);
                     console.log('Prize awarded and user profile updated.');
                     ctx.send({ message: 'Prize awarded and user profile updated.' }, 200);
                 }
            } else if(winningCategory === "RELOAD-100") {

                 // First, check if the user can win the prize
                 const player = await userAcceptble(userId);

                 const winningPrize = 100; 

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
                     await handleReloadAmountUpdate(winningPrize);
                     await handleReloadUserProfileUpdate(userId,player.mobile, player.weeklyWin, player.reloadWin,winningPrize);
                     console.log('Prize awarded and user profile updated.');
                     ctx.send({ message: 'Prize awarded and user profile updated.' }, 200);
                 }

            }else if(winningCategory === "daraz"){

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
