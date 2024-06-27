'use strict';

/**
 * sms-log service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::sms-log.sms-log');
