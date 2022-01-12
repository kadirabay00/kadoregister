const Discord = require("discord.js")
const db = require("quick.db")
const ayarlar = require("../ayarlar.json")

module.exports.run = async (client, message, args) => {
    if(!ayarlar.yetkiliRol.some(arwww => message.member.roles.cache.has(arwww)) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${ayarlar.no} Bu işlemi gerçekleştirmek için gerekli yetkin yok!`).then(message.react(client.emojis.cache.get(ayarlar.no)))
  
    const etiketlenenKişi = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!etiketlenenKişi) return message.channel.send(`${ayarlar.no} bir kişi etiketlemelisin!`).then(message.react(client.emojis.cache.get(ayarlar.no)))

if(message.member.roles.highest.position <= etiketlenenKişi.roles.highest.position) return message.channel.send(`${ayarlar.no} Senden üstte/aynı pozisyonda bir kişiyi kayıt edemezsin!`).then(message.react(client.emojis.cache.get(ayarlar.no)))      
    
const isim = args[1];
const yaş = args[2];
if(!isim) return message.channel.send(`${ayarlar.no} bir isim belirtmelisin!`).then(message.react(client.emojis.cache.get(ayarlar.no)))
if(!yaş) return message.channel.send(`${ayarlar.no} bir yaş belirtmelisin!`).then(message.react(client.emojis.cache.get(ayarlar.no)))
if(isNaN(yaş)) return message.channel.send(`${ayarlar.no} belirttiğin yaş rakamlardan oluşmalı!`).then(message.react(client.emojis.cache.get(ayarlar.no)))
    
etiketlenenKişi.roles.add(ayarlar.kadınRol1)
etiketlenenKişi.roles.add(ayarlar.kadınRol2)
etiketlenenKişi.roles.remove(ayarlar.kayıtsızRol)
etiketlenenKişi.setNickname(`${ayarlar.tag} ${isim} ${ayarlar.sembol} ${yaş}`)

message.react(ayarlar.yes)

const arwEmbed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setDescription(`Kullanıcının ismi \`${ayarlar.tag} ${isim} ${ayarlar.sembol} ${yaş}\` olarak değiştirildi ve <@&${ayarlar.kadınRol1}>, <@&${ayarlar.kadınRol2}> rolleri verildi!`)
.setFooter(ayarlar.footer)
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
.setTimestamp()

message.channel.send(arwEmbed)

db.push(`isimler.${etiketlenenKişi.id}`, {
İsim: isim,
Yaş: yaş,
Yetkili: message.author.id
})

db.add(`kadinTeyit.${message.member.id}`, `1`)
db.add(`toplamTeyit.${message.member.id}`, `1`)

client.channels.cache.get(ayarlar.sohbetKanal).send(`Aramıza yeni biri katıldı! ${etiketlenenKişi} ona hoş geldin diyelim! :heart_exclamation:`)
  
}
exports.config = {
    name: "kız",
    guildOnly: true,
    aliases: ["k", "female", "kadın"]
}
