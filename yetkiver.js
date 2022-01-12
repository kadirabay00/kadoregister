const Discord = require("discord.js")
const ayarlar = require("../ayarlar.json")

module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${ayarlar.no} Bu işlemi gerçekleştirmek için gerekli yetkin yok!`).then(message.react(client.emojis.cache.get(ayarlar.no)))

    const etiketlenenKişi = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!etiketlenenKişi) return message.channel.send(`${ayarlar.no} Lütfen bir kullanıcı etiketliyip tekrar deneyiniz!`).then(message.react(client.emojis.cache.get(ayarlar.no)))

const arwEmbed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setFooter(ayarlar.footer)
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
.setTimestamp()

etiketlenenKişi.roles.add(ayarlar.EnDüsükYetkiliRol)
etiketlenenKişi.roles.add(ayarlar.BotKomutRol)
etiketlenenKişi.roles.add(ayarlar.RegisterYetkiliRol)

message.react(ayarlar.yes)

message.channel.send(arwEmbed.setDescription(`Kullanıcıya başarıyla <@&${ayarlar.EnDüsükYetkiliRol}>, <@&${ayarlar.BotKomutRol}>, <@&${ayarlar.RegisterYetkiliRol}> rolleri verildi!`))

}
exports.config = {
    name: "yetkiver",
    guildOnly: true,
    aliases: ["yetkiver"]
}