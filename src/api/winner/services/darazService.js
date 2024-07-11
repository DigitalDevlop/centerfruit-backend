'use strict';

const {
    getDarazAmout,
    updateDarazWinning,
    updateDarazUserProfile,
    getDarazWinning,
    updateDarazStatus,
    updateWinnerTable
} = require('../../../dbService/winningDbService');
const { sendDarazWinningMessage } = require('../../../smsService/smsService');
const messageTemplates = require('../../../config/template');
const { msgCategory } = require('../../../config/enum');

const handleDarazWinningNumber = async () => {
    try {
        const darazWinning = await getDarazWinning();
        const voucherID = darazWinning[0].id;
        const voucher = darazWinning[0].voucherNumber;

        await updateDarazStatus(voucherID);
        return voucher;
    } catch (error) {
        console.error('Error updating winning:', error);
        throw error;
    }
};

const handleDarazWinningConfigration = async () => {
    try {
        const darazAmout = await getDarazAmout();
        return await updateDarazWinning(darazAmout.darazVoucher);
    } catch (error) {
        console.error('Error updating Daraz:', error);
        throw error;
    }
};

const handleDarazUserProfileUpdate = async (id, mobile) => {
    try {
        const category = `daraz`;
        await updateDarazUserProfile(id);
        await updateWinnerTable(id, category, mobile);
    } catch (error) {
        console.error('Error updating Daraz user profile:', error);
        throw error;
    }
};

const sendDarazWinningNotification = async (mobile, voucher) => {
    try {
        await sendDarazWinningMessage(mobile, voucher, messageTemplates.darazWinning, msgCategory.DARAZWINNING);
    } catch (error) {
        console.error('Error sending Daraz winning message:', error);
        throw error;
    }
};

module.exports = {
    handleDarazWinningNumber,
    handleDarazWinningConfigration,
    handleDarazUserProfileUpdate,
    sendDarazWinningNotification
};
