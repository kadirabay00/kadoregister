const Discord = require("discord.js")
const client = new Discord.Client()
const ayarlar = require("./ayarlar.json")
const moment = require("moment")
const fs = require("fs")
const db = require("quick.db")
const chalk = require("chalk")
require('./util/Loader.js')(client)

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
fs.readdir('./commands/', (err, files) => { 
  if (err) console.error(err);               
  console.log(`${files.length} komut yüklenecek.`)
  files.forEach(f => {                    
    let props = require(`./commands/${f}`)
    console.log(`${props.config.name} komutu yüklendi.`)
    client.commands.set(props.config.name, props)
    props.config.aliases.forEach(alias => {       
      client.aliases.set(alias, props.config.name)
    });
  });
})

client.on('message', async message => {
  
  if(message.content === '.tag') {
    message.channel.send(`\`${ayarlar.tag}\``)
  }
  })

client.on("ready", () => {
    console.log(chalk.redBright(`Register Bot Aktif!`))
})

client.login(process.env.TOKEN)

// BOTUN İNTENTLERİNİ AÇMAYI UNUTMAYIN 



//----------------------------------------------------- HOŞGELDİN MESAJI  ------------------------------------------------\\

client.on("guildMemberAdd", member => {
    require("moment-duration-format")
      var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
      var üs = üyesayısı.match(/([0-9])/g)
      üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
      if(üs) {
        üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
          return {
            '0': `0`,
            '1': `1`,
            '2': `2`,
            '3': `3`,
            '4': `4`,
            '5': `5`,
            '6': `6`,
            '7': `7`,
            '8': `8`,
            '9': `9`}[d];})}
    const kanal = member.guild.channels.cache.find(r => r.id === (ayarlar.hosgeldinKanal)); 
    let user = client.users.cache.get(member.id);
    require("moment-duration-format");
      const kurulus = new Date().getTime() - user.createdAt.getTime();  
     const gecen = moment.duration(kurulus).format(` YY **[Yıl]** DD **[Gün]** HH **[Saat]** mm **[Dakika,]**`) 
    var kontrol;
  if (kurulus < 1296000000) kontrol = `Ve senin hesabın sunucumuza kayıt olmak için daha çok genç! :x: `
  if (kurulus > 1296000000) kontrol = `Güvenilir `
    moment.locale("tr");
  
member.roles.add(ayarlar.kayıtsızRol)
member.roles.add(ayarlar.kayıtsızRol)
member.roles.add(ayarlar.kayıtsızRol)
  
    kanal.send(`
<:MERHABALAR EMOJİ ID:> Merhabalar <@`+ member + `>, aramıza hoş geldin. Seninle beraber sunucumuz **`+üyesayısı+`** üye sayısına ulaştı.

Hesabın \`${moment(member.user.createdTimestamp).format("LLL")}\` tarihinde oluşturulmuş.  (${moment(member.user.createdAt).add(5, 'days').fromNow().replace("birkaç saniye önce", " ")}.)

Sunucumuza kayıt olduğunda <#KURALLAR KANALI ID> kanalına göz atmayı unutmayınız. Kayıt olduktan sonra kuralları okuduğunuzu 
kabul edeceğiz ve içeride yapılacak cezalandırma işlemlerini bunu göz önünde bulundurarak yapacağız. :tada:
||<@&KAYIT YETKİLİSİ ROL ID>||`)});

//----------------------------------------------------- HOŞGELDİN MESAJI  ------------------------------------------------\\



//----------------------------------------------------- SES KANALI GİRİŞ ------------------------------------------------\\

client.on("ready", () => {
  client.channels.cache.get(ayarlar.botSesKanal).join();
  });

//----------------------------------------------------- SES KANALI GİRİŞ ------------------------------------------------\\



//----------------------------------------------------- TAG ROL ------------------------------------------------\\

client.on("userUpdate", async function(oldUser, newUser) { 
    const guildID = (ayarlar.SunucuID)
    const roleID = (ayarlar.tagRol)
    const tag = (ayarlar.tag)
    const chat = (ayarlar.sohbetKanal)
    const taglog = (ayarlar.tagLog)
  
    const guild = client.guilds.cache.get(guildID)
    const role = guild.roles.cache.find(roleInfo => roleInfo.id === roleID)
    const member = guild.members.cache.get(newUser.id)
    const embed = new Discord.MessageEmbed().setAuthor(member.displayName, member.user.avatarURL({ dynamic: true })).setColor('#ff0010').setTimestamp().setFooter('Developed by Kado!');
    if (newUser.username !== oldUser.username) {
        if (oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
            member.roles.remove(roleID)
            client.channels.cache.get(taglog).send(embed.setDescription(`${newUser} Kullanıcısı tagımızı çıkardığı için taglı rolü **alındı**!`))
        } else if (!oldUser.username.includes(tag) && newUser.username.includes(tag)) {
            member.roles.add(roleID)
            client.channels.cache.get(chat).send(`${newUser} Tagımızı alarak aramıza katıldı! :hearts:`)
            client.channels.cache.get(taglog).send(embed.setDescription(`${newUser} Kullanıcısı tagımızı aldığı için taglı rolü **verildi**!`))
        }
    }
   if (newUser.discriminator !== oldUser.discriminator) {
        if (oldUser.discriminator == (ayarlar.etikettag) && newUser.discriminator !== (ayarlar.etikettag)) {
            member.roles.remove(roleID)
            client.channels.cache.get(taglog).send(embed.setDescription(`${newUser} Kullanıcısı etiket tagımızı çıkardığı için taglı rolü **alındı**!`))
        } else if (oldUser.discriminator !== (ayarlar.etikettag) && newUser.discriminator == (ayarlar.etikettag)) {
            member.roles.add(roleID)-
            client.channels.cache.get(taglog).send(embed.setDescription(`${newUser} Kullanıcısı etiket tagımızı aldığı için taglı rolü **verildi**!`))
            client.channels.cache.get(chat).send(`${newUser} Etiket tagımızı alarak aramıza katıldı! :hearts:`)
        }
    }
  
  })

//----------------------------------------------------- TAG ROL ------------------------------------------------\\
