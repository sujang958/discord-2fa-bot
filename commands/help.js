const { Message, MessageEmbed } = require('discord.js');


module.exports = {
    name: "도움",
    aliases: ['help', '도움말', '명령어'],
    /**
     * @param {Message} message 
     */
    async run(message, args, client) {
        if (args[0] == undefined) {
            var embed = new MessageEmbed()
            .setAuthor("명령어 목록")
            .setColor("#ffffff")
            .addField("auth!역할 (역할)", "자세한 정보는 `auth!도움 역할` 로 확인하세요", false, true)
            .addField("auth!인증 (이메일)", "자세한 정보는 `auth!도움 인증` 으로 확인하세요", false, true)
            .addField("auth!채널 (채널)", "인증할 채널을 다정합니다\n자세한 정보는 `auth!도움 채널` 으로 확인하세요", false, true)
						.addField("auth!핑", "봇의 핑을 확인합니다", false, true)
            .setFooter("개발자: 누군가#4590")
            .setTimestamp();

            message.reply(embed);
            return;
        } else {
            if (args[0] == '역할') {
                var embed = new MessageEmbed()
                .setAuthor("명령어 정보")
                .setColor("#ffffff")
                .addField("문법", "`auth!역할 (역할)`", false, true)
                .addField("설명", "사용자가 인증을 했을때 받을 역할을 지정합니다", false, true)
                .setFooter("개발자: 누군가#4590")
                .setTimestamp();

                message.reply(embed);
                return;
            } else if (args[0] == '인증') {
                var embed = new MessageEmbed()
                .setAuthor("명령어 정보")
                .setColor("#ffffff")
                .addField("문법", "`auth!인증 (이메일)`", false, true)
                .addField("설명", "(이메일) 로 인증 링크를 보내고 인증 링크를 접속하면 인증이 완료됩니다", false, true)
                .setFooter("개발자: 누군가#4590")
                .setTimestamp();

                message.reply(embed);
                return;
            } else if (args[0] == '채널') {
                var embed = new MessageEmbed()
                .setAuthor("명령어 정보")
                .setColor("#ffffff")
                .addField("문법", "`auth!채널 (채널)`", false, true)
                .addField("설명", "인증할 채널을 설정합니다, 여러개의 채널을 설정할 수도 있습니다", false, true)
                .setFooter("개발자: 누군가#4590")
                .setTimestamp();

                message.reply(embed);
                return;
            }
        }
    }
}