'use strict';
const axios = require('axios');
const { loggerReload } = require('../../../logger/logger');

const {
    get50ReloadChances,
    update50RelodAmount,
    update100RelodAmount,
    get100ReloadChances,
    updateReloadUserProfile,
    updateWinnerTable
} = require('../../../dbService/winningDbService');
const { createNewSMSLog } = require('../../../dbService/smsDbLog');
const { SMSStatus, messageResponse, reloadChanel, msgCategory } = require('../../../config/enum');
const { sendReloadWinningMessage } = require('../../../smsService/smsService')
require('dotenv').config();

const handleReloadAmountUpdate = async (winningPrize) => {
    try {
        if(winningPrize === 50){
            const ReloadChances = await get50ReloadChances();
            return await update50RelodAmount(ReloadChances.reloadFifty);
        }else if (winningPrize === 100){
            const ReloadChances = await get100ReloadChances();
            return await update100RelodAmount(ReloadChances.reloadHundred);
        }

       
    } catch (error) {
        console.error('Error updating reload amount:', error);
        throw error;
    }
};

const handleReloadUserProfileUpdate = async (id, mobile, weeklyWin, reloadWin, winningPrize) => {
    try {
        const category = `reload-${winningPrize}`;
        await updateReloadUserProfile(id, weeklyWin, reloadWin);
        await updateWinnerTable(id, category, mobile);
    } catch (error) {
        console.error('Error updating reload user profile:', error);
        throw error;
    }
};


const handleReloadSent = async (mobile, winningPrize, messageTemplate) => {
    try {
        const message = messageTemplate.replace(/{winningPrize}/g, winningPrize);
        let channel;
        let msgCategorys;
        let msgSmsCategorys;

        // Function to get the prefix of the mobile number
        function getMobilePrefix(mobile) {
            return mobile.substring(0, 4);
        }



        if (winningPrize === 50) {

            if (["9476", "9477", "9474"].includes(getMobilePrefix(mobile))) {
                channel = reloadChanel.DIALOGRELOAD50;
            } else {
                channel = reloadChanel.OPRATERRELOAD50;
            }
            msgCategorys = msgCategory.RELOAD50;
            msgSmsCategorys = msgCategory.RELOAD50SMS

        } else if (winningPrize === 100) {
            if (["9476", "9477", "9474"].includes(getMobilePrefix(mobile))) {
                channel = reloadChanel.DIALOGRELOAD100;
            } else {
                channel = reloadChanel.OPRATERRELOAD100;
            }
            msgCategorys = msgCategory.RELOAD100;
            msgSmsCategorys = msgCategory.RELOAD100SMS
        }

        console.log(`Requesting authentication token for mobile ${mobile}`);
        loggerReload.info(`Requesting authentication token for mobile ${mobile}`);

        // Step 1: Authentication Token Request
        const authResponse = await axios.post(process.env.AUTH_URL, {
            u_name: process.env.RELOAD_USERNAME,
            passwd: process.env.RELOAD_PASSWORD
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!authResponse.data || !authResponse.data.access_token) {
            throw new Error('Failed to fetch authentication token');
        }

        const accessToken = authResponse.data.access_token;
        console.log(`Authentication token received for mobile ${mobile}`);
        loggerReload.info(`Authentication token received for mobile ${mobile}`);

        console.log(`Sending reward request for mobile ${mobile}, prize ${winningPrize}`);
        loggerReload.info(`Sending reward request for mobile ${mobile}, prize ${winningPrize}`);

        // Step 2: Reward Request

        // Reward request parameters
        const rewardRequestParams = {
            msisdn: mobile,
            channel: channel,
            mt_port: process.env.CONFIGURED_NUMBER_MASK,
            s_time: '2024-07-01 16:00:00',
            e_time: '2024-08-16 23:50:00',
            msg: message,
            callback_url: ''
        };

        console.log("Reward request parameters:", rewardRequestParams);
        loggerReload.info(`Reward request parameters for mobile ${mobile}: ${JSON.stringify(rewardRequestParams)}`);

        // Step 2: Reward Request
        const rewardResponse = await axios.post(process.env.REWARD_URL, rewardRequestParams, {
            headers: {
                'Authorization': `${accessToken}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        if (!rewardResponse.data) {
            throw new Error('Failed to send reward request');
        }

        console.log('Reward request sent successfully:', rewardResponse.data);
        loggerReload.info(`Reward request sent successfully for mobile ${mobile}: ${JSON.stringify(rewardResponse.data)}`);

        const messageState = rewardResponse.data.error === messageResponse.reloadResponse ? SMSStatus.DELIVERED : SMSStatus.FAILED;
        const smsLog = await createNewSMSLog(mobile, message, messageState, msgCategorys);
        console.log(`Message ${messageState.toLowerCase()}:`, smsLog);
        loggerReload.info(`Message ${messageState.toLowerCase()} for mobile ${mobile}: ${JSON.stringify(smsLog)}`);

        await sendReloadWinningMessage(mobile, message, msgSmsCategorys);

    } catch (error) {
        console.error('Error sending reload:', error);
        loggerReload.error(`Error sending reload for mobile ${mobile}: ${error.message}`);
        throw error;
    }
};


module.exports = {
    handleReloadAmountUpdate,
    handleReloadUserProfileUpdate,
    handleReloadSent
};
