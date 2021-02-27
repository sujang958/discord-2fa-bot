const Cryptr = require('cryptr');
const cryptr = new Cryptr('48y02hfiohqnn8u74@frwy');



module.exports = {
    enc(text) {
        return cryptr.encrypt(text);
    },
    dec(text) {
        return cryptr.decrypt(text);
    }
}