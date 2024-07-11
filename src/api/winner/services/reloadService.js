'use strict';

const {
    getReloadAmount,
    updateRelodAmount,
    updateReloadUserProfile,
    updateWinnerTable
} = require('../../../dbService/winningDbService');

const handleReloadAmountUpdate = async (winningPrize) => {
    try {
        const reloadAmount = await getReloadAmount();
        return await updateRelodAmount(reloadAmount.reloadAmount, winningPrize);
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

module.exports = {
    handleReloadAmountUpdate,
    handleReloadUserProfileUpdate
};
