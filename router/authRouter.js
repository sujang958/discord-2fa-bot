const router = require('express').Router();
const request = require('sync-request');
const dotenv = require('dotenv');
const MongoDB = require('mongodb');
const cryptFunctions = require('../encrypDecryp');
var _ = require('lodash');


dotenv.config({
	path: `./../config.env`
});
const DBClient = new MongoDB.MongoClient(`mongodb+srv://auth:${cryptFunctions.dec(process.env.DBPW)}@cluster0.q74zk.mongodb.net/auth-bot?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
let db = {};
DBClient.connect().then(async () => {
    db = DBClient.db('auth-bot').collection('auth')
});


const authRouter = router.get('/auth', async (req, res) => {
    const { userID, guildID, code } = req.query;


    if (!code || !guildID || !userID) {
        res.send('<h2>잘못된 요청입니다!</h2>')
        return;
    }

    const guildDB = await db.findOne({_id: guildID});

    if (!guildDB)
        return res.send('<h1>역할이 설정되어있지 않습니다!, `auth!역할 (역할)` 을 사용하여 역할을 설정하세요!</h1>');
    if (!guildDB.role)
        return res.send('<h1>역할이 설정되어있지 않습니다!, `auth!역할 (역할)` 을 사용하여 역할을 설정하세요!</h1>');
    if (!guildDB[code])
        return res.send('<h1>잘못된 코드입니다</h1>');
    if (guildDB[code].auth)
        return res.send('<h1>만료된 코드입니다</h1>');
    if (guildDB[code].userID != userID)
        return res.send('<h1>잘못된 요청입니다</h1>');
    
    try {
        console.log(guildDB);
        let codeDB = guildDB[code];
        _.set(codeDB, 'auth', true);

        await db.findOneAndUpdate({_id: guildID}, {
            $set: {
                [code]: codeDB,
            }
        });
        let discord_res = request('PUT', `https://discord.com/api/v8/guilds/${guildID}/members/${guildDB[code].userID}/roles/${guildDB.role}`, {
            headers: {
                'Authorization': `Bot ${cryptFunctions.dec(process.env.TOKEN)}`
            }
        }).getBody();
        console.log(discord_res);

        res.send('<script>alert("성공적으로 인증했습니다");location.href="/"</script>');
    } catch (e) {
        console.log(e);
        return res.send(`<script>alert("에러\n${e.toString()}");location.href='/';</script>`);
    }
})

module.exports = authRouter;