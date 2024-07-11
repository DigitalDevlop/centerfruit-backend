'use strict';
const axios = require('axios');
const { createNewSMSLog } = require('../dbService/smsDbLog');
const { SMSStatus,messageResponse } = require('../config/enum');
require('dotenv').config(); // Load environment variables

const sendMessage = async (mobile, otp, messageTemplate,msgCategory) => {
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
        const response = await axios.get(url, { params });
        console.log('Message sent successfully:', response.data);

        const messageState = response.data === messageResponse.messageResponse ? SMSStatus.DELIVERED : SMSStatus.FAILED;
        const smsLog = await createNewSMSLog(mobile, message, messageState,msgCategory);
        console.log(`Message ${messageState.toLowerCase()}:`, smsLog);

    } catch (error) {
        console.error('Error sending message:', error.response ? error.response.data : error.message);
    }
};

const sendDarazWinningMessage = async (mobile,voucher,messageTemplate,msgCategory) => {
    const message = messageTemplate.replace(/{voucher}/g, voucher);
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
        const response = await axios.get(url, { params });
        console.log('Message sent successfully:', response.data);

        const messageState = response.data === messageResponse.messageResponse ? SMSStatus.DELIVERED : SMSStatus.FAILED;
        const smsLog = await createNewSMSLog(mobile, message, messageState,msgCategory);
        console.log(`Message ${messageState.toLowerCase()}:`, smsLog);

    } catch (error) {
        console.error('Error sending message:', error.response ? error.response.data : error.message);
    }
};

module.exports = {
    sendMessage,
    sendDarazWinningMessage,
};
