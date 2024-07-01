'use strict';

/**
 * player controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const axios = require('axios');

module.exports = createCoreController('api::player.player', ({ strapi }) => ({
    async external(ctx) {
        try {
            console.log("External Api Called");

            // Extract parameters from the query string or request body
            // @ts-ignore
            const { mobilenumber, message } = ctx.query;
        
            // Log the extracted parameters for debugging
            console.log(`Mobilenumber: ${mobilenumber}, Message: ${message}`);
            
            // Example of making an API call using axios
            // const response = await axios.post('https://example.com/api', { mobilenumber, message });

            // Return a 200 status with a message
            ctx.send({ message: 'API called' }, 200);

              
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


        } catch (error) {
            // Log the error for debugging purposes
            console.error('Error occurred:', error);

            // Return a 500 status with an error message
            ctx.send({ message: 'Internal server error', error: error.message }, 500);
        }
    }
}));
