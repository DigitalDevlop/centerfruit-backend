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
    DARAZWINNING:'daraz-winning',
    RELOAD100:'reload-100-winning',
    RELOAD50:'reload-50-winning',
});

const reloadChanel = Object.freeze({
    RELOAD100:'245',
    RELOAD50:'242'
});

module.exports = {
    SMSStatus,
    messageResponse,
    msgCategory,
    reloadChanel
};