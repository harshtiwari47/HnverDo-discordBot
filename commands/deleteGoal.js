const {
   readData,
   writeData
} = require('../data');
const {
   decryptGoal
} = require('../utils');

module.exports = {
   name: 'deletegoal',
   description: 'Delete an existing goal',
   execute: async (interaction) => {
      try {
         const goalType = interaction.options.getString('goal_type');
         const number = interaction.options.getInteger('number') - 1; // Convert to zero-based index
         const data = readData();
         const userId = interaction.user.id;

         // Delete goal logic
         if (data[goalType][userId] && data[goalType][userId][number]) {
            data[goalType][userId].splice(number, 1);
            writeData(data);
            await interaction.reply({
               content: `ᝰ.ᐟ Goal no. **"${number + 1}"** has been deleted. .𖥔 ݁ ˖`, ephemeral: true
            });
         } else {
            await interaction.reply({
               content: "Invalid goal index or type", ephemeral: true
            });
         }

      } catch (e) {
         console.log("An error occurred while deleting a goal:", e);
         const embed = {
            color: 0xff0000,
            title: 'Goal Deletion Failed',
            description: '☆.𓋼𓍊 𓆏 𓍊𓋼𓍊.☆\nThe goal could not be deleted due to an error. Please try again.',
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