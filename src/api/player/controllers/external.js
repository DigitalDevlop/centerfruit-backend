'use strict';

/**
 * player controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const axios = require('axios');


module.exports = createCoreController('api::player.player', () => ({
    async external(ctx, next) {
   console.log("External Api Called")
   console.log("External Ctx :-",ctx.request.body)




   
//    const sendMessage = async () => {
//     const url = 'http://ip-address:port/sendsms';
//     const params = {
//       username: 'your_username',
//       password: 'your_password',
//       from: 'ZMSG',
//       to: '94791234567',
//       msg: 'TestMessage',
//       msg_ref_num: 'A001',
//     };
  
//     try {
//       const response = await axios.get(url, { params });
//       console.log('Message sent successfully:', response.data);
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };
  
//   sendMessage();

        
    }}
))
