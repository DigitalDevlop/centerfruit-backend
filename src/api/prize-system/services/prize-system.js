'use strict';

/**
 * prize-system service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::prize-system.prize-system');
