const Discord = require("discord.js")
const ayarlar = require("../ayarlar.json")
const db = require("quick.db")

module.exports.run = async (client, message, args) => {
    if(!ayarlar.yetkiliRol.some(arwww => message.member.roles.cache.has(arwww)) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${client.emojis.cache.get(ayarlar.no)} Bu işlemi gerçekleştirmek için gerekli yetkin yok!`).then(message.react(client.emojis.cache.get(ayarlar.no)))

    const etiketlenenKişi = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author

const arwEmbed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setDescription(`${ayarlar.yes} ${etiketlenenKişi} **kullanıcısının toplam kayıt bilgisi:**
${db.fetch(`kadinTeyit.${etiketlenenKişi.id}`) || 0} kadın kayıt ,
${db.fetch(`erkekTeyit.${etiketlenenKişi.id}`) || 0} erkek kayıt ,
${db.fetch(`toplamTeyit.${etiketlenenKişi.id}`) || 0} toplam kayıt sayısı.
`)
.setFooter(ayarlar.footer)
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
.setTimestamp()

message.react(ayarlar.yes)

message.channel.send(arwEmbed)

}
exports.config = {
    name: "teyit",
    guildOnly: true,
    aliases: ["teyitbilgi", "teyit-bilgi", "teyitler","kayıtlar","kayıtlarım"]
  }