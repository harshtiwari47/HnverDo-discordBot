const {
   Client,
   GatewayIntentBits,
   Events,
   Collection
} = require('discord.js');
require('dotenv').config();
const {
   registerCommands
} = require('./registerCommands');
const {
   createEmbed,
   createButtons,
   getTotalPages
} = require('./paginationHelper');
const {
   readData
} = require('./data'); // Assuming your data handler

const client = new Client( {
   intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.commands = new Collection();

client.once(Events.ClientReady, async () => {
   console.log(`Logged in as ${client.user.tag}!`);
   client.user.setActivity('Managing Your Goals!', {
      type: 'PLAYING'
   });
   await registerCommands(client);
});

client.on(Events.InteractionCreate, async interaction => {
   if (!interaction.isCommand() && !interaction.isButton()) return;

   if (interaction.isCommand()) {
      const {
         commandName
      } = interaction;
      const command = client.commands.get(commandName);

      if (command) {
         try {
            await command.execute(interaction); // Executes command, e.g., goalsList
         } catch (error) {
            console.error(error);
            await interaction.reply({
               content: 'There was an error while executing this command!',
               ephemeral: true
            });
         }
      }
   } else if (interaction.isButton()) {
      try {
         const [action,
            pageStr,
            goalType] = interaction.customId.split('_'); // Also extract goalType from customId
         const currentPage = parseInt(pageStr, 10);

         if (isNaN(currentPage)) {
            return interaction.reply({
               content: 'Invalid page number.',
               ephemeral: true
            });
         }

         // Retrieve user-specific data based on dynamic goalType
         const data = readData();
         const userId = interaction.user.id;
         const goals = data[goalType] ? data[goalType][userId] || []: [];

         const totalPages = getTotalPages(goals);
         const newPage = action === 'prev' ? currentPage - 1: currentPage + 1;

         // Ensure the new page number is within bounds
         if (newPage < 1 || newPage > totalPages) {
            return interaction.reply({
               content: 'Page out of range.',
               ephemeral: true
            });
         }

         const embed = createEmbed(goals, newPage, `✷ ${goalType.charAt(0).toUpperCase() + goalType.slice(1)} Goals List ◎ 📑 \n`);
         const buttons = createButtons(newPage, totalPages, goalType);

         await interaction.update({
            embeds: [embed],
            components: [buttons]
         });
      } catch (e) {
         const embed = {
            color: 0xff0000,
            title: 'Command Failed',
            description: '☆.𓋼𓍊 𓆏 𓍊𓋼𓍊.☆\nThe command could not be processed due to an error. Please try again.',
            footer: {
               text: 'Track your progress with HnverDo!'
            }
         };

         await interaction.reply({
            embeds: [embed],
            ephemeral: true
         });
      }
   }
   });

   client.login(process.env.BOT_KEY);