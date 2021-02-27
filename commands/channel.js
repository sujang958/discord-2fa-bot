const e = require('express');
var _ = require('lodash');



module.exports = {
    name: '채널',
    aliases: ['channel', '채널설정'],
    /**
     * 
     * @param {import('discord.js').Message} message 
     * @param {*} args 
     * @param {import('discord.js').Client} client 
     */
    async run(message, args, client) {
        let channelID = args[0],
        guildDB = await client.db.findOne({_id: message.guild.id});
        channelID = String(channelID).replace(/[<#!&]/g, '').replace('>', '');

        if (!message.member.hasPermission('ADMINISTRATOR'))
            return message.reply('관리자 권한이 필요합니다');
        if (!channelID || isNaN(channelID))
            return message.reply('채널을 적어주세요');
        
        message.guild.channels.cache.map(async channel => {
            if (channel) {
                if (channel.isText()) {
                    if (channel.id == channelID) {
                        if (guildDB.channels) {
                            channel.send(`\`auth!인증 (이메일)\` 로 인증을 완료해주세요.`);
                            await client.db.findOneAndUpdate({_id: message.guild.id}, {
                                $push: {
                                    channels: channelID
                                }
                            });
                            return message.reply('설정했습니다');
                        } else {
                            channel.send(`\`auth!인증 (이메일)\` 로 인증을 완료해주세요.`);
                            await client.db.findOneAndUpdate({_id: message.guild.id}, {
                                $set: {
                                    channels: [channelID]
                                }
                            });
                            return message.reply('설정했습니다');
                        }
                    }
                }
            }
        })
        
    }
}