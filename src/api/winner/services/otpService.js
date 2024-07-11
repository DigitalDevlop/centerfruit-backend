'use strict';

const CryptoJS = require('crypto-js');

const secretKey = "centerf";

const decryptOTP = (encryptedOTP) => {
    const bytes = CryptoJS.AES.decrypt(encryptedOTP, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};

module.exports = {
    decryptOTP
};
