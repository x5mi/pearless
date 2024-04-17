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




const { ApplicationCommandOptionType } = require('discord.js');
const fs = require('fs');

module.exports = {
    name: "welcomemessage",
    description: "Set up the welcome message details for your server.",
    options: [
        {
            name: 'title',
            description: 'Enter the title for the welcome message.',
            type: ApplicationCommandOptionType.String
        },
        {
            name: 'description',
            description: 'Enter the description for the welcome message.',
            type: ApplicationCommandOptionType.String
        },
        {
            name: 'image',
            description: 'Enter the URL of the image to include in the welcome message.',
            type: ApplicationCommandOptionType.String,
            validate: (value) => /^https?:\/\/\S+$/.test(value) 
        },
        {
            name: 'footer',
            description: 'Enter the footer text for the welcome message.',
            type: ApplicationCommandOptionType.String,
            validate: (value) => typeof value === 'string' && value.length <= 2048 
        },
        {
            name: 'color',
            description: '🤍 : #FFFFFF 💖 : #FF0000 💚 : #00FF00 💙 : #0000FF 💜 : #800080 💛 : #FFFF00',
            type: ApplicationCommandOptionType.String,
            validate: (value) => /^#[0-9A-F]{6}$/i.test(value)
        },
        {
            name: 'footer_url',
            description: 'Enter the URL for the footer.',
            type: ApplicationCommandOptionType.String,
            validate: (value) => /^https?:\/\/\S+$/.test(value) 
        },
        {
            name: 'thumbnail',
            description: 'Enter the URL of the thumbnail.',
            type: ApplicationCommandOptionType.String,
            validate: (value) => /^https?:\/\/\S+$/.test(value) 
        },
        {
            name: 'author_name',
            description: 'Enter the name of the author.',
            type: ApplicationCommandOptionType.String
        },
        {
            name: 'author_url',
            description: 'Enter the URL for the author.',
            type: ApplicationCommandOptionType.String,
            validate: (value) => /^https?:\/\/\S+$/.test(value) 
        },
        {
            name: 'author_icon',
            description: 'Enter the URL of the author icon.',
            type: ApplicationCommandOptionType.String,
            validate: (value) => /^https?:\/\/\S+$/.test(value) 
        }
    ],
    async run(client, interaction) {
        try {
            if (!interaction.member.permissions.has('ADMINISTRATOR')) {
                return await interaction.reply({ content: 'You must be an administrator to use this command.', ephemeral: true });
            }
            const title = interaction.options.getString('title');
            const description = interaction.options.getString('description');
            const image = interaction.options.getString('image');
            const footer = interaction.options.getString('footer');
            const color = interaction.options.getString('color');
            const footerURL = interaction.options.getString('footer_url');
            const thumbnail = interaction.options.getString('thumbnail');
            const authorName = interaction.options.getString('author_name');
            const authorURL = interaction.options.getString('author_url');
            const authorIcon = interaction.options.getString('author_icon');


            const welcomeMessage = {
                title: title,
                description: description,
                image: image,
                footer: footer,
                color: color,
                footerURL: footerURL,
                thumbnail: thumbnail,
                authorName: authorName,
                authorURL: authorURL,
                authorIcon: authorIcon
            };
            
            fs.writeFile('./message.json', JSON.stringify(welcomeMessage, null, 2), err => {
                if (err) {
                    console.error('Error writing message data:', err);
                } else {
                    console.log('Message data saved successfully.');
                }
            });

            await interaction.reply({
                embeds: [{
                    title: 'Welcome Message Udpated!',
                    description: 'Your welcome message details have been saved successfully.',
                    color: 0x00FF00 
                }],
                ephemeral: true
            });
        } catch (error) {
            console.error('Error setting up welcome message:', error);
            await interaction.reply({ content: 'An error occurred while setting up welcome message details.', ephemeral: true });
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

