const {
   SlashCommandBuilder
} = require('@discordjs/builders');
const {
   readData,
} = require('../data');

module.exports = {
   data: new SlashCommandBuilder()
   .setName('goalstatus')
   .setDescription('Generate and send your goal status.'),
   async execute(interaction) {
      try {
         const userId = interaction.user.id;
         const data = readData();

         const userGoals = {
            daily: data.daily[userId].filter(g => g.userId === userId),
            weekly: data.weekly[userId].filter(g => g.userId === userId),
            monthly: data.monthly[userId].filter(g => g.userId === userId),
            yearly: data.yearly[userId].filter(g => g.userId === userId)
         };

         const status = Object.keys(userGoals).map(type => {
            return `${type.charAt(0).toUpperCase() + type.slice(1)} Goals:\n` +
            userGoals[type].map(goal => `- ${goal.goal} ${goal.completed ? '[Completed]': '[Not Completed]'}`).join('\n');
         }).join('\n\n');

         const embed = {
            color: 0x0099ff,
            title: 'Your Goal Status',
            description: status || 'No goals found.',
            footer: {
               text: 'Track your progress with HnverDo!'
            }
         };

         await interaction.reply({
            embeds: [embed]
         });
      } catch (e) {
         console.log("An error occurred while viewing incomplete goal:", e);
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
};