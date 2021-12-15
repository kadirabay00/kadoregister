const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json")
exports.run= async (client, message, args) => {       

let Tag = (ayarlar.tag)
let Etiket = (ayarlar.etikettag) 

   let TotalMember = message.guild.memberCount
          let Online = message.guild.members.cache.filter(off => off.presence.status !== 'offline').size;
          let Taglı = message.guild.members.cache.filter(u => u.user.username.includes(Tag)).size;
          let Etiketiniz = message.guild.members.cache.filter(u => u.user.discriminator.includes(Etiket)).size;
          let toplamTag = Etiketiniz + Taglı
          let Voice = message.guild.members.cache.filter(s => s.voice.channel).size;
          let Boost = message.guild.premiumSubscriptionCount;

message.channel.send(new Discord.MessageEmbed().setColor("RANDOM")
.setFooter(ayarlar.footer)
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
.setTimestamp().setDescription(`
\`•\` Sunucumuzda toplam **${TotalMember}** kişi bulunmaktadır.
\`•\` Sunucumuzda toplam **${Online}** aktif kişi bulunmaktadır.
\`•\` Toplam **${Taglı}** kişi tagımızda bulunuyor.
\`•\` Ses kanallarında **${Voice}** kullanıcı bulunmaktadır.
\`•\` Sunucumuza toplam **${Boost}** takviye yapılmış. 
`))
//`•\` Toplam **${Etiketiniz}** \`${Etiket}\` kişi tagımızda bulunuyor. -//lazım olursa kalsın THE KADO <3


}
exports.config = {
    name: "say",
    guildOnly: true,
    aliases: ["say"]
}