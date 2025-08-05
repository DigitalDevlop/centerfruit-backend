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
    DIALOGRELOAD100:'805',
    DIALOGRELOAD50:'810',
    AIRTELRELOAD100:'806',
    AIRTELRELOAD50:'813',
    MOBITELPREPADIRELOAD100:'807',
    MOBITELPREPADIRELOAD50:'811',
    MOBITELPOSTPAIDRELOAD100:'808',
    MOBITELPOSTPAIDRELOAD50:'812',
    HUTCHRELOAD100:'809',
    HUTCHRELOAD50:'814',
});

module.exports = {
    SMSStatus,
    messageResponse,
    msgCategory,
    reloadChanel
};
