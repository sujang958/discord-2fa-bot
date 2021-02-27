const { Message, MessageEmbed } = require('discord.js');



module.exports = {
    name: "역할",
    aliases: ['setrole', 'role'],
    /**
     * @param {Message} message 
     */
    async run(message, args, client) {
        const guildDB = await client.db.findOne({_id: message.guild.id});
        let roleID = args[0].replace(/[<@&]/g, '').replace('>', '');
        
        if (!message.member.hasPermission('ADMINISTRATOR'))
            return message.reply('관리자 권한이 필요합니다');

        if (!args[0])
            return message.reply('역할을 적어주세요!');
        if (isNaN(roleID))
            return message.reply('역할을 적어주세요!');

        const hasRole = message.guild.roles.cache.toJSON().findIndex(e => {
            return e.id == roleID
        });
        if (hasRole != -1) {
            if (guildDB) {
                let chkEmbed = new MessageEmbed()
                .setTitle(`정말로 역할을 바꾸시겠습니까?`)
                .setDescription(`선택하신 역할로 변경됩니다`)
                .setColor('ORANGE')
                .setTimestamp()
                .setFooter(`${message.author.tag}\u200b`, message.author.displayAvatarURL());
                let chkMsg = await message.reply(chkEmbed);
                chkMsg.react(`✅`).then(() => chkMsg.react('❌'));
    
    
                const filter = (reaction, user) => {
                    return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
                };
                chkMsg.awaitReactions(filter, { max: 1 })
                .then(async collected => {
                    const reaction = collected.first();
            
                    if (reaction.emoji.name === '✅') {
                        await client.db.findOneAndUpdate({_id: message.guild.id}, {
                            $set: {
                                role: roleID,
                            }
                        });
    
                        return message.channel.send('역할을 바꿨습니다');
                    } else {
                        chkMsg.delete().then((m) => {
                            m.reply('취소하였습니다');
                        })
                    }
                }).catch(collected => {
                    m.reply('취소하였습니다');
                    console.log(collected);
                });
            } else {
                let chkEmbed = new MessageEmbed()
                .setTitle(`정말로 역할을 바꾸시겠습니까?`)
                .setDescription(`선택하신 역할로 변경됩니다`)
                .setColor('ORANGE')
                .setTimestamp()
                .setFooter(`${message.author.tag}\u200b`, message.author.displayAvatarURL());
                let chkMsg = await message.reply(chkEmbed);
                chkMsg.react(`✅`).then(() => chkMsg.react('❌'));
    
    
                const filter = (reaction, user) => {
                    return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
                };
                return chkMsg.awaitReactions(filter, { max: 1 })
                .then(async collected => {
                    const reaction = collected.first();
            
                    if (reaction.emoji.name === '✅') {
                        await client.db.insertOne({
                            _id: message.guild.id,
                            role: roleID,
                            channels: []
                        });
    
                        return message.channel.send('역할을 바꿨습니다');
                    } else {
                        chkMsg.delete().then((m) => {
                            m.reply('취소하였습니다');
                        })
                    }
                }).catch(collected => {
                    m.reply('취소하였습니다');
                    console.log(collected);
                });
            }
        } else {
            return message.reply('존재하지 않는 역할입니다');
        }
    }
}