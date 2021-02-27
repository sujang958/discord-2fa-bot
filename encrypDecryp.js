const Cryptr = require('cryptr');
require('dotenv').config({ path: `./config.env` });
const cryptr = new Cryptr(process.env.asdf);



module.exports = {
    enc(text) {
        return cryptr.encrypt(text);
    },
    dec(text) {
        return cryptr.decrypt(text);
    }
}