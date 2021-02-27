const Discord = require('discord.js');
const fs = require('fs');
const dotenv = require('dotenv');
const MongoDB = require('mongodb');
const cryptFunctions = require('./encrypDecryp');
const chalk = require('chalk');
const log = require('./log');


dotenv.config({
	path: `./config.env`
});
let client = new Discord.Client();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();


const DBClient = new MongoDB.MongoClient(`mongodb+srv://auth:${cryptFunctions.dec(process.env.DBPW)}@cluster0.q74zk.mongodb.net/auth-bot?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
client.db = undefined;
client.devs = process.env.devs.split(',')
DBClient.connect().then(async () => {
    client.db = DBClient.db('auth-bot').collection('auth');
    log.system('Connect DB');
});


const commandFiles = fs.readdirSync(`${__dirname}/commands/`).filter(file => file.endsWith('.js'));
const tableData = [];
for (const file of commandFiles) {
	try {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);

        for (const alias of command.aliases) {
            client.aliases.set(alias, command.name);
        }
        tableData.push({
            status: "✅",
            name: command.name,
            error: null,
        });

        continue;
    } catch (e) {
        try {
            tableData.push({
                status: "❌",
                name: command.name,
                error: e.toString(),
            });
            continue;
        } catch (error) {
            tableData.push({
                status: "❌",
                name: undefined,
                error: e.toString(),
            });
            continue;
        }
    }
}
console.table(tableData);


module.exports = async () => {
    client.once('ready', () => {
        log.bot('login on ' + client.user.tag);
    });
    
    client.on('ready', async () => {
        setInterval(() => {
            client.guilds.cache.map(async guild => {
                if (!guild)	return;
                
                let guildDB = await client.db.findOne({_id: guild.id});
                if (!guildDB) {
                    client.db.insertOne({
                        _id: guild.id,
                        channels: [],
                        isAuth: [],
                    });
                    return log.system('Insert guild DB');
                }
            });
        }, 3000);
    });

    client.once("reconnecting", () => {
        client.user.setActivity('다시 연결하는 중');
        log.bot("reconnecting");
    });
    
    client.once("disconnect", () => {
        client.user.setActivity('뷁')
        log.bot("disconnecting");
    });
    
    client.on('message', async message => {
        let prefix = process.env.PREFIX;
        if (message.author.bot) return;
        if (!message.guild) return;
        if (message.mentions.users.has(client.user.id)) client.commands.get('도움').run(message, []);
        if (!message.content.startsWith(prefix)) return;
    
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();
    
        if (client.commands.get(cmd)) {
            log.bot(`${message.author.tag} - ${message.content} : ${new Date()}`)
            return client.commands.get(cmd).run(message, args, client);
        } else if (client.aliases.get(cmd)) {
            log.bot(`${message.author.tag} - ${message.content} : ${new Date()}`)
            return client.commands.get(client.aliases.get(cmd)).run(message, args, client);
        }
    })
    
    client.login(cryptFunctions.dec(process.env.TOKEN));
}