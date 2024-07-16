'use strict';



const getPlayersWithReloadWinNotZeroOrNull = async () => {
    return await strapi.entityService.findMany('api::player.player', {
        filters: { 
            $and: [
                { loginAttempt: { $ne: 0 } }, 
                { loginAttempt: { $notNull: true } }
            ]
        }
    });
};

const updateLoginAttempts = async (players) => {
    const playerIds = players.map(player => player.id);
    
    return await Promise.all(playerIds.map(id => 
        strapi.entityService.update('api::player.player', id, {
            data: { loginAttempt: 0 }
        })
    ));
};

module.exports = {
    getPlayersWithReloadWinNotZeroOrNull,
    updateLoginAttempts
    
};