const crypto  = require('crypto');

const generateSecretKey = () => {
    const KEY_TOKEN = crypto.randomBytes(32).toString('hex');
    return KEY_TOKEN
};

module.exports = generateSecretKey;  
 


