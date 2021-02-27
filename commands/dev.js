const { Message, MessageEmbed } = require('discord.js');


module.exports = {
    name: "개발자",
    aliases: ['hellothisisverification'],
    /**
     * 
     * @param {Message} message 
     * @param {Array} args 
     */
    async run(message, args, client) {
        var embed = new MessageEmbed()
        .setTitle('개발자')
        .setAuthor("누군가#4590")
        .setColor("#ffffff")
        .addField("공식 웹사이트", "https://discord-2fa-auth.herokuapp.com/", false, true)
        .addField("주의사항", "`enter7377@naver.com` 이 공식 메일입니다!\n다른사람한테 절대로 링크를 보여주지 마세요!", false, true)
        .addField("특이사항", "메일 API 안쓰고 nodemailer 써서 만들었습니다", false, true)
        .setFooter("개발자: 누군가#4590")
        .setTimestamp();

        message.reply(embed);
        return;
    }
}