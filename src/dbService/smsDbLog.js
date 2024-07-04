'use strict';



const createNewSMSLog = async (mobile, message,msgState,msgCategory) => {
    return await strapi.entityService.create('api::sms-log.sms-log', {
        data: {
            mobile: `${mobile}`,
            message: message,
            msgState: msgState,
            msgCategory:msgCategory,
        },
    });
};

module.exports = {
    createNewSMSLog,
};