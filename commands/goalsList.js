const {
   readData
} = require('../data');
const {
   createEmbed,
   createButtons,
   getTotalPages
} = require('../paginationHelper');

module.exports = {
   name: 'goalslist',
   description: 'List all goals',
   execute: async (interaction) => {
      const goalType = interaction.options.getString('goal_type'); // Captures the goal type from command
      const data = readData();
      const userId = interaction.user.id;
      const goals = data[goalType] ? data[goalType][userId] || []: [];

      if (goals.length === 0) {
         await interaction.reply('No goals found.');
         return;
      }

      const totalPages = getTotalPages(goals); // Calculate total pages
      const embed = createEmbed(goals, 1, `✷ ${goalType.charAt(0).toUpperCase() + goalType.slice(1)} Goals List ◎ 📑 \n`);
      const buttons = createButtons(1, totalPages, goalType);

      await interaction.reply({
         embeds: [embed],
         components: [buttons]
      });

      const filter = (i) => i.customId.startsWith('page_');
      const collector = interaction.channel.createMessageComponentCollector({
         filter,
         time: 60000
      });

      collector.on('collect', async (i) => {
         const [action, page] = i.customId.split('_');
         const currentPage = parseInt(page);

         const newPage = action === 'prev_page' ? currentPage - 1: currentPage + 1;

         // Ensure the new page is within bounds
         if (newPage < 1 || newPage > totalPages) return;

         const embed = createEmbed(goals, newPage, `✷ ${goalType.charAt(0).toUpperCase() + goalType.slice(1)} Goals List ◎ 📑 \n`);
         const buttons = createButtons(newPage, totalPages);

         await i.update({
            embeds: [embed],
            components: [buttons]
         });
      });

      collector.on('end',
         () => {
            // Disable buttons after the collector ends
            const disabledButtons = createButtons(1, totalPages, true);
            interaction.editReply({
               components: [disabledButtons]
            });
         });
   }
};