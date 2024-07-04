const SMSStatus = Object.freeze({
    DELIVERED: 'Delivered',
    FAILED: 'Failed',
    messageResponse:'Operation success: CENTER'
});

const messageResponse = Object.freeze({
    messageResponse:'Operation success: CENTER'
});

const msgCategory = Object.freeze({
    OTP:'otp',
    WINNING:'winning'
});

module.exports = {
    SMSStatus,
    messageResponse,
    msgCategory
};