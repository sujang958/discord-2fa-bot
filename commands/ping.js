const { Message, Client, MessageEmbed } = require('discord.js');



module.exports = {
    name: "핑",
    aliases: ['ping'],
    /**
     * 
     * @param {Message} message 
     * @param {*} args 
     * @param {Client} client 
     */
    async run(message, args, client) {
        var embed = new MessageEmbed()
        .setAuthor('핑')
        .setColor(sortPingColor(client.ws.ping))
        .addField("Latency", `${Date.now() - message.createdTimestamp}ms`, false, true)
        .addField("API Latency", `${client.ws.ping}ms`)
        .setTimestamp();

        message.reply(embed);
    }
}





const sortPingColor = latency => {
    latency = Number(latency);
    if (latency <= 100) {
        return "GREEN";
    } else if (latency > 100 && latency <= 250) {
        return "BLUE";
    } else if (latency > 250 && latency <= 400) {
        return "ORANGE";
    } else {
        return "RED";
    }
}