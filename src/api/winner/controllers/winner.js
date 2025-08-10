'use strict';

/**
 * winner controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::winner.winner', ({ strapi }) => ({
  async create(ctx) {
    const body = ctx.request.body || {};
    const payload = body.data || {};

    const requestedCreatedAt = payload.createdAt;
    const requestedUpdatedAt = payload.updatedAt;

    // Resolve player: accept id (number), numeric string, or mobile string
    let playerId = null;
    if (payload.player !== undefined && payload.player !== null) {
      if (typeof payload.player === 'number') {
        playerId = payload.player;
      } else if (typeof payload.player === 'string') {
        if (/^\d+$/.test(payload.player)) {
          playerId = Number(payload.player);
        } else {
          const byMobile = await strapi.db
            .query('api::player.player')
            .findOne({ where: { mobile: payload.player } });
          if (byMobile) playerId = byMobile.id;
        }
      }
    }

    if (playerId !== null) {
      const playerExists = await strapi.db
        .query('api::player.player')
        .findOne({ where: { id: playerId } });
      if (!playerExists)
        return ctx.badRequest('Player not found for the provided identifier');
    }

    const dataToCreate = {
      category: payload.category,
      mobile: payload.mobile,
    };
    if (playerId !== null) dataToCreate.player = playerId;

    const entry = await strapi.entityService.create('api::winner.winner', {
      data: dataToCreate,
    });

    // Backdate timestamps directly via SQL if requested
    if (requestedCreatedAt || requestedUpdatedAt) {
      const knex = strapi.db.connection;
      const rawUpdate = {};
      if (requestedCreatedAt)
        rawUpdate.created_at = new Date(requestedCreatedAt);
      if (requestedUpdatedAt)
        rawUpdate.updated_at = new Date(requestedUpdatedAt);
      await knex('winners').where({ id: entry.id }).update(rawUpdate);
    }

    const refetched = await strapi.entityService.findOne(
      'api::winner.winner',
      entry.id,
      { populate: ['player'] }
    );
    const sanitized = await this.sanitizeOutput(refetched, ctx);
    return this.transformResponse(sanitized);
  },
}));