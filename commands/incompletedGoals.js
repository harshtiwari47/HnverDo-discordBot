const {
   SlashCommandBuilder
} = require('@discordjs/builders');
const {
   decryptGoal
} = require('../utils');
const {
   readData,
   writeData
} = require('../data');

module.exports = {
   data: new SlashCommandBuilder()
   .setName('incompletedgoals')
   .setDescription('List all incomplete goals of a specified type.')
   .addStringOption(option =>
      option.setName('goal_type')
      .setDescription('Type of goals to list')
      .setRequired(true)
      .addChoices(
         {
            name: 'Daily', value: 'daily'
         },
         {
            name: 'Weekly', value: 'weekly'
         },
         {
            name: 'Monthly', value: 'monthly'
         },
         {
            name: 'Yearly', value: 'yearly'
         }
      )),
   async execute(interaction) {

      try {
         const goalType = interaction.options.getString('goal_type');
         const data = readData();
         const userId = interaction.user.id;
         const incompleteGoals = data[goalType][userId].filter(g => !g.completed);

         const embed = {
            color: 0xf53a3a,
            title: `メ⁠ Incomplete ${goalType.charAt(0).toUpperCase() + goalType.slice(1)} Goals ◎ 📑`,
            description: incompleteGoals.length > 0
            ? incompleteGoals.map(goal => `●ミ ${decryptGoal(goal.goal)}`).join('\n\n'): '🎉 No incomplete goals found.',
            footer: {
               text: 'Manage your goals with ♡HnverDo!',
               icon_url: 'https://cdn.discordapp.com/app-icons/1282962623872241664/e326cd5cafba6714ed770c66b3c978ad.png?size=128'
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