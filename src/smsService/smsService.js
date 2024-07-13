'use strict';
const axios = require('axios');
const { createNewSMSLog } = require('../dbService/smsDbLog');
const { SMSStatus,messageResponse } = require('../config/enum');
require('dotenv').config();
const { loggerSMS,loggerDaraz } = require('../logger/logger');

const sendMessage = async (mobile, otp, messageTemplate, msgCategory) => {
    const message = messageTemplate.replace(/{mobile}/g, mobile).replace(/{otp}/g, otp);
    const url = process.env.SMS_API_URL;
    const params = {
        username: process.env.SMS_API_USERNAME,
        password: process.env.SMS_API_PASSWORD,
        from: process.env.SMS_API_FROM,
        to: mobile,
        msg: message,
        msg_ref_num: 'CENTER',
    };

    try {
        loggerSMS.info(`Sending message to ${mobile}`);
        const response = await axios.get(url, { params });
        console.log('Message sent successfully:', response.data);
        loggerSMS.info(`Message sent successfully to ${mobile}: ${JSON.stringify(response.data)}`);

        const messageState = response.data === messageResponse.messageResponse ? SMSStatus.DELIVERED : SMSStatus.FAILED;
        const smsLog = await createNewSMSLog(mobile, message, messageState, msgCategory);
        console.log(`Message ${messageState.toLowerCase()}:`, smsLog);
        loggerSMS.info(`Message ${messageState.toLowerCase()} to ${mobile}: ${JSON.stringify(smsLog)}`);

    } catch (error) {
        console.error('Error sending message:', error.response ? error.response.data : error.message);
        loggerSMS.error(`Error sending message to ${mobile}: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
    }
};

const sendDarazWinningMessage = async (mobile,voucher,messageTemplate,msgCategory) => {
    const message = messageTemplate.replace(/{voucher}/g, voucher);
    const url = process.env.SMS_API_WINNING_URL;
    const params = {
        username: process.env.SMS_API_WINNING_USERNAME,
        password: process.env.SMS_API_WINNING_PASSWORD,
        from: process.env.SMS_API_WINNING_FROM,
        to: mobile,
        msg: message,
        msg_ref_num: 'CENTER',
    };

    try {
        loggerDaraz.info(`Sending Daraz winning message to ${mobile}`);
        const response = await axios.get(url, { params });
        console.log('Message sent successfully:', response.data);
        loggerDaraz.info(`Message sent successfully to ${mobile}: ${JSON.stringify(response.data)}`);

        const messageState = SMSStatus.DELIVERED;
        const smsLog = await createNewSMSLog(mobile, message, messageState,msgCategory);
        console.log(`Message ${messageState.toLowerCase()}:`, smsLog);
        loggerDaraz.info(`Message ${messageState.toLowerCase()} to ${mobile}: ${JSON.stringify(smsLog)}`);

    } catch (error) {
        console.error('Error sending message:', error.response ? error.response.data : error.message);
        loggerDaraz.error(`Error sending message to ${mobile}: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
    }
};

module.exports = {
    sendMessage,
    sendDarazWinningMessage,
};
