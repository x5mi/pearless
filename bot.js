/*

  ________.__                        _____.___.___________
 /  _____/|  | _____    ____  ____   \__  |   |\__    ___/
/   \  ___|  | \__  \ _/ ___\/ __ \   /   |   |  |    |   
\    \_\  \  |__/ __ \\  \__\  ___/   \____   |  |    |   
 \______  /____(____  /\___  >___  >  / ______|  |____|   
        \/          \/     \/    \/   \/                  

╔════════════════════════════════════════════════════════════════════════╗
║                                                                        ║
║  ## Created by GlaceYT!                                                ║
║  ## Feel free to utilize any portion of the code                       ║
║  ## DISCORD :  https://discord.com/invite/xQF9f9yUEM                   ║
║  ## YouTube : https://www.youtube.com/@GlaceYt                         ║
║                                                                        ║
╚════════════════════════════════════════════════════════════════════════╝


*/



const { Client, GatewayIntentBits, EmbedBuilder, TextChannel, Discord } = require("discord.js");
const config = require("./config.js");
const fs = require("fs");
const path = require('path');
const { printWatermark } = require('./util/pw');
const client = new Client({
  intents: Object.keys(GatewayIntentBits).map((a) => {
    return GatewayIntentBits[a];
  }),
});

client.config = config;

fs.readdir("./events", (_err, files) => {
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0]; 
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});


client.commands = [];
fs.readdir(config.commandsDir, (err, files) => {
  if (err) throw err;
  files.forEach(async (f) => {
    try {
      if (f.endsWith(".js")) {
        let props = require(`${config.commandsDir}/${f}`);
        client.commands.push({
          name: props.name,
          description: props.description,
          options: props.options,
        });
      }
    } catch (err) {
      console.log(err);
    }
  });
});


client.on('guildMemberAdd', async member => {
  try {

    const setupFilePath = path.join(__dirname, 'setup.json');
    const setupData = JSON.parse(fs.readFileSync(setupFilePath, 'utf8'));

    const guildId = member.guild.id;
    const guildSetupData = setupData[guildId];
    if (!guildSetupData || !guildSetupData.welcomeChannelId) {
      console.error('Welcome channel data not found or invalid.');
      return;
    }

    const welcomeChannelId = guildSetupData.welcomeChannelId;
    console.log('Welcome channel ID:', welcomeChannelId);


    const welcomeChannel = await client.channels.fetch(welcomeChannelId);
    if (!welcomeChannel) {
      console.error('Welcome channel not found.');
      return;
    }

    console.log('Welcome channel type:', welcomeChannel.type);


    const messageFilePath = path.join(__dirname, 'message.json');
    const messageData = JSON.parse(fs.readFileSync(messageFilePath, 'utf8'));

    if (!messageData) {
      console.error('Message details not found in message.json');
      return;
    }


    const { title, description, image, footer, color, footerURL, thumbnail, authorName, authorURL, authorIcon } = messageData;

            const welcomeMessage = `Hello ${member}!`;
            const welcomeMessageDm = `💝 This message has been sent from** ${member.guild.name}!**`;
            const embed = new EmbedBuilder()
            .setTitle(title)
            .setDescription(description)
            .setImage(image)
            .setColor(color)
            .setTimestamp()
            .setFooter({ text: footer, iconURL: footerURL }) 
            .setThumbnail(thumbnail) 
            .setAuthor({ name: authorName, iconURL: authorIcon, url: authorURL }); 


    await welcomeChannel.send({ content: welcomeMessage , embeds: [embed] });
    await member.send({ content: welcomeMessageDm , embeds: [embed] });
  } catch (error) {
    console.error('Error sending welcome message:', error);
  }
});



if (config.TOKEN || process.env.TOKEN) {
  client.login(config.TOKEN || process.env.TOKEN).catch((e) => {
    console.log('TOKEN ERROR❌  - Turn On Intents or Reset New Token');
  });
} else {
  setTimeout(() => {
    console.log('TOKEN ERROR❌  - Turn On Intents or Reset New Token');
  }, 2000);
}

const express = require("express");
const app = express();
const port = 3000;
app.get('/', (req, res) => {
  const imagePath = path.join(__dirname, 'index.html');
  res.sendFile(imagePath);
});
app.listen(port, () => {
  console.log(`🔗 Listening to RTX: http://localhost:${port}`);
});
printWatermark();



/*

  ________.__                        _____.___.___________
 /  _____/|  | _____    ____  ____   \__  |   |\__    ___/
/   \  ___|  | \__  \ _/ ___\/ __ \   /   |   |  |    |   
\    \_\  \  |__/ __ \\  \__\  ___/   \____   |  |    |   
 \______  /____(____  /\___  >___  >  / ______|  |____|   
        \/          \/     \/    \/   \/                  

╔════════════════════════════════════════════════════════════════════════╗
║                                                                        ║
║  ## Created by GlaceYT!                                                ║
║  ## Feel free to utilize any portion of the code                       ║
║  ## DISCORD :  https://discord.com/invite/xQF9f9yUEM                   ║
║  ## YouTube : https://www.youtube.com/@GlaceYt                         ║
║                                                                        ║
╚════════════════════════════════════════════════════════════════════════╝


*/

