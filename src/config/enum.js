const SMSStatus = Object.freeze({
    DELIVERED: 'Delivered',
    FAILED: 'Failed',
    messageResponse:'Operation success: CENTER'
});

const messageResponse = Object.freeze({
    messageResponse:'Operation success: CENTER',
    reloadResponse:'0',
});

const msgCategory = Object.freeze({
    OTP:'otp',
    DARAZWINNING:'daraz-winning',
    RELOAD100:'reload-100-winning',
    RELOAD50:'reload-50-winning',
    RELOAD100SMS:'reload-100-winning-SMS',
    RELOAD50SMS:'reload-50-winning-SMS',
    Attempt:'message-attempt'
});

const reloadChanel = Object.freeze({
    DIALOGRELOAD100:'2450',
    DIALOGRELOAD50:'2420',
    OPRATERRELOAD50:'2420',
    OPRATERRELOAD100:'2450',

});

module.exports = {
    SMSStatus,
    messageResponse,
    msgCategory,
    reloadChanel
};