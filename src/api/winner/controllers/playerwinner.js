'use strict';

const { createCoreController } = require('@strapi/strapi').factories;
const {
    userAcceptble
} = require('../../../dbService/winningDbService');
const { decryptOTP } = require('../services/otpService');
const {
    handleDarazWinningNumber,
    handleDarazWinningConfigration,
    handleDarazUserProfileUpdate,
    sendDarazWinningNotification
} = require('../services/darazService');
const {
    handleReloadAmountUpdate,
    handleReloadUserProfileUpdate,
    handleReloadSent
} = require('../services/reloadService');
const messageTemplates = require('../../../config/template');

module.exports = createCoreController('api::winner.winner', ({ strapi }) => ({
    async playerwinner(ctx) {
        try {
            const userId = parseInt(ctx.params.id);
            // @ts-ignore
            const convertedOtp = ctx.request.body.otp;
            const decryptedOTP = parseInt(decryptOTP(convertedOtp), 10);
            const winningCategory = ctx.params.category;

            console.log('User ID:', userId);

            if (winningCategory === "RELOAD-50" || winningCategory === "RELOAD-100") {
                const winningPrize = parseInt(winningCategory.split('-')[1]);
                const player = await userAcceptble(userId);

                if (player.otp !== decryptedOTP) {
                    console.log('OTP does not match.');
                    return ctx.send({ message: 'OTP does not match.' }, 400);
                }

                if (player.reloadWin >= 5 || player.weeklyWin >= 2 || player.darazWin >= 1) {
                    console.log('User has reached the win limit.');
                    return ctx.send({ message: 'User has reached the win limit.' }, 400);
                }

                await handleReloadSent(player.mobile,winningPrize,messageTemplates.reloadWinning)
                await handleReloadAmountUpdate(winningPrize);
                await handleReloadUserProfileUpdate(userId, player.mobile, player.weeklyWin, player.reloadWin, winningPrize);
                console.log('Prize awarded and user profile updated.');
                return ctx.send({ message: 'Prize awarded and user profile updated.' }, 200);
            } else if (winningCategory === "DARAZ") {
                const player = await userAcceptble(userId);

                if (player.otp !== decryptedOTP) {
                    console.log('OTP does not match.');
                    return ctx.send({ message: 'OTP does not match.' }, 400);
                }

                if (player.darazWin >= 1) {
                    console.log('User has reached the win limit.');
                    return ctx.send({ message: 'User has reached the win limit.' }, 400);
                }

                const voucher = await handleDarazWinningNumber();
                await sendDarazWinningNotification(player.mobile, voucher);
                await handleDarazWinningConfigration();
                await handleDarazUserProfileUpdate(userId, player.mobile);

                console.log('Prize awarded and user profile updated.');
                return ctx.send({ message: 'Prize awarded and user profile updated.' }, 200);
            }
        } catch (error) {
            console.error('Error occurred:', error);
            ctx.send({ message: 'Internal server error', error: error.message }, 500);
        }
    }
}));




// 'use strict';

// const { createCoreController } = require('@strapi/strapi').factories;
// const {
//     userAcceptble,
//     getReloadAmount,
//     updateRelodAmount,
//     updateWinnerTable,
//     updateReloadUserProfile,
//     getDarazAmout,
//     updateDarazWinning,
//     updateDarazUserProfile,
//     getDarazWinning,
//     updateDarazStatus
// } = require('../../../dbService/winningDbService');
// const CryptoJS = require('crypto-js');
// const { sendDarazWinningMessage } = require('../../../smsService/smsService');
// const messageTemplates = require('../../../config/template');
// const { msgCategory } = require('../../../config/enum');

// module.exports = createCoreController('api::winner.winner', ({ strapi }) => ({
//     async playerwinner(ctx) {
//         const secretKey = "centerf";

//         const decryptOTP = (encryptedOTP, secretKey) => {
//             const bytes = CryptoJS.AES.decrypt(encryptedOTP, secretKey);
//             return bytes.toString(CryptoJS.enc.Utf8);
//         };

//         const hadleDarazWinningNumber = async () => {
//             try {
//                 const darazWinning = await getDarazWinning();

//                 const voucherID = darazWinning[0].id
//                 const voucher = darazWinning[0].voucherNumber
    
//                 await updateDarazStatus(voucherID);

//                 return voucher;

//             } catch (error) {
//                 console.error('Error updating winning:', error);
//                 throw error;
//             }
//         };



//         const handleDarazWinningConfigration = async () => {
//             try {
//                 const darazAmout = await getDarazAmout();
//                 return await updateDarazWinning(darazAmout.darazVoucher);
//             } catch (error) {
//                 console.error('Error updating Daraz:', error);
//                 throw error;
//             }
//         };

//         const handleDarazUserProfileUpdate = async (id,mobile) => {
//             try {
//                 const category = `daraz`;
//                 await updateDarazUserProfile(id);
//                 await updateWinnerTable(id, category,mobile);
//             } catch (error) {
//                 console.error('Error updating Daraz user profile:', error);
//                 throw error;
//             }
//         };

//         const handleReloadAmountUpdate = async (winningPrize) => {
//             try {
//                 const reloadAmount = await getReloadAmount();
//                 return await updateRelodAmount(reloadAmount.reloadAmount,winningPrize);
//             } catch (error) {
//                 console.error('Error updating reload amount:', error);
//                 throw error;
//             }
//         };

//         const handleReloadUserProfileUpdate = async (id,mobile, weeklyWin, reloadWin,winningPrize) => {
//             try {
//                 const category = `reload-${winningPrize}`;
//                 await updateReloadUserProfile(id, weeklyWin, reloadWin);
//                 await updateWinnerTable(id, category,mobile);
//             } catch (error) {
//                 console.error('Error updating reload user profile:', error);
//                 throw error;
//             }
//         };

//         try {
//             const userId = parseInt(ctx.params.id);
//             // @ts-ignore
//             const convertedOtp = ctx.request.body.otp;
//             const decryptedOTP = parseInt(decryptOTP(convertedOtp, secretKey), 10);
//             const winningCategory = ctx.params.category;
            

//             console.log('User ID:', userId);

//             if (winningCategory === "RELOAD-50") {
//                 const winningPrize = 50; 
//                  // First, check if the user can win the prize
//                  const player = await userAcceptble(userId);
 
//                  let canWin = false;
//                  if (player.otp === decryptedOTP) {
//                      if (player.reloadWin < 5 && player.weeklyWin < 2 && player.darazWin<1) {
//                          canWin = true;
//                      } else {
//                          console.log('User has reached the win limit.');
//                          ctx.send({ message: 'User has reached the win limit.' }, 400);
//                      }
//                  } else {
//                      console.log('OTP does not match.');
//                      ctx.send({ message: 'OTP does not match.' }, 400);
//                  }
 
//                  // Second, give 50 rupees to the user and send a message
//                  if (canWin) {
//                      //Send Reload & SMS
 
 
//                      // Update winning configuration
//                      await handleReloadAmountUpdate(winningPrize);
//                      await handleReloadUserProfileUpdate(userId,player.mobile, player.weeklyWin, player.reloadWin,winningPrize);
//                      console.log('Prize awarded and user profile updated.');
//                      ctx.send({ message: 'Prize awarded and user profile updated.' }, 200);
//                  }
//             } else if(winningCategory === "RELOAD-100") {

//                  // First, check if the user can win the prize
//                  const player = await userAcceptble(userId);

//                  const winningPrize = 100; 

//                  console.log('Player:', player);
 
//                  let canWin = false;
//                  if (player.otp === decryptedOTP) {
//                      if (player.reloadWin < 5 && player.weeklyWin < 2 && player.darazWin<1) {
//                          canWin = true;
//                      } else {
//                          console.log('User has reached the win limit.');
//                          ctx.send({ message: 'User has reached the win limit.' }, 400);
//                      }
//                  } else {
//                      console.log('OTP does not match.');
//                      ctx.send({ message: 'OTP does not match.' }, 400);
//                  }
 
//                  // Second, give 100 rupees to the user and send a message
//                  if (canWin) {
//                      //Send Reload & SMS
 
 
//                      // Update winning configuration
//                      await handleReloadAmountUpdate(winningPrize);
//                      await handleReloadUserProfileUpdate(userId,player.mobile, player.weeklyWin, player.reloadWin,winningPrize);
//                      console.log('Prize awarded and user profile updated.');
//                      ctx.send({ message: 'Prize awarded and user profile updated.' }, 200);
//                  }

//             }else if(winningCategory === "DARAZ"){

//                  // First, check if the user can win the prize
//                  const player = await userAcceptble(userId);


//                  console.log('Player:', player);
 
//                  let canWin = false;
//                  if (player.otp === decryptedOTP) {
//                      if (player.reloadWin < 1 && player.darazWin<1) {
//                          canWin = true;
//                      } else {
//                          console.log('User has reached the win limit.');
//                          ctx.send({ message: 'User has reached the win limit.' }, 400);
//                      }
//                  } else {
//                      console.log('OTP does not match.');
//                      ctx.send({ message: 'OTP does not match.' }, 400);
//                  }
 
//                  // Second, give Daraz voucher to the user and send a message
//                  if (canWin) {
//                      //Send Daraz Win
//                      const voucher = await hadleDarazWinningNumber();
//                      await sendDarazWinningMessage(player.mobile,voucher, messageTemplates.darazWinning,msgCategory.DARAZWINNING);

//                      // Update winning configuration
//                      await handleDarazWinningConfigration()
//                      await handleDarazUserProfileUpdate(userId,player.mobile);
                  
//                      console.log('Prize awarded and user profile updated.');
//                      ctx.send({ message: 'Prize awarded and user profile updated.' }, 200);
//                  }

//             }
//         } catch (error) {
//             console.error('Error occurred:', error);
//             ctx.send({ message: 'Internal server error', error: error.message }, 500);
//         }
//     }
// }));
