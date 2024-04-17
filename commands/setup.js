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



const { ApplicationCommandOptionType, ButtonStyle, ActionRowBuilder, EmbedBuilder, ButtonBuilder, TextChannel } = require('discord.js');
const fs = require('fs');
const path = require('path');

let setupData = {};

try {
    setupData = require('../setup.json');
} catch (error) {
    console.error('Error loading setup data:', error);
}

module.exports = {
    name: "setupwelcome",
    description: "Set up the welcome message system for your server.",
    options: [{
        name: 'channel',
        description: 'Select the channel where you want to send welcome messages.',
        type: ApplicationCommandOptionType.Channel,
        required: true
    }],
    async run(client, interaction) {
        try {
            if (!interaction.member.permissions.has('ADMINISTRATOR')) {
                return interaction.reply({ content: 'You need to be a server administrator to set up the welcome message system.', ephemeral: true });
            }

            const welcomeChannel = interaction.options.getChannel('channel');
            if (!(welcomeChannel instanceof TextChannel)) {
                return interaction.reply({ content: 'Please select a text channel.', ephemeral: true });
            }

            setupData[interaction.guildId] = {
                serverName: interaction.guild.name,
                serverId: interaction.guildId,
                welcomeChannelId: welcomeChannel.id
            };


            fs.writeFile('./setup.json', JSON.stringify(setupData, null, 2), err => {
                if (err) {
                    console.error('Error writing setup data:', err);
                } else {
                    console.log('Setup data saved successfully.');
                }
            });

            const embed = {
                title: 'Welcome Message System Setup',
                description: `Welcome messages will now be sent to ${welcomeChannel}.`,
                footer: { text: 'Make sure you choose the correct channel!' }
            };

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('send_welcome_test')
                        .setLabel('Send Test Welcome Message')
                        .setStyle(ButtonStyle.Primary)
                );

            await interaction.reply({ content: 'Setup successful.', embeds: [embed], components: [row], ephemeral: true });

            const collector = interaction.channel.createMessageComponentCollector({ filter: i => i.isButton() });

            collector.on('collect', async buttonInteraction => {
                if (buttonInteraction.customId === 'send_welcome_test') {
                    const member = buttonInteraction.member;
                    await this.sendWelcomeMessage(member);
                    buttonInteraction.deferUpdate();
                }
            });
        } catch (error) {
            console.error('Error setting up welcome messages:', error);
            await interaction.reply({ content: 'An error occurred while setting up welcome messages.', ephemeral: true });
        }
    },
    async sendWelcomeMessage(member, footerIconURL) {
        try {
        
            const messageFilePath = path.join(__dirname, '..', 'message.json');
            
          
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

    
 
            const guildId = member.guild.id;
            const guildSetupData = setupData[guildId];
            if (!guildSetupData || !guildSetupData.welcomeChannelId) return; 
    
            const welcomeChannel = await member.guild.channels.fetch(guildSetupData.welcomeChannelId);
            if (!welcomeChannel || !(welcomeChannel instanceof TextChannel)) return; 
    

            await welcomeChannel.send({ content: welcomeMessage,  embeds: [embed] });
            await member.send({ content: welcomeMessageDm , embeds: [embed] });
        } catch (error) {
            console.error('Error sending welcome message:', error);
        }
    }
};


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

