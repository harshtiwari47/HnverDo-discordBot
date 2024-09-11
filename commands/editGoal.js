const {
   readData,
   writeData
} = require('../data');
const {
   encryptGoal,
   decryptGoal
} = require('../utils');

module.exports = {
   name: 'editgoal',
   description: 'Edit an existing goal',
   execute: async (interaction) => {
      try {
         const goalType = interaction.options.getString('goal_type');
         const number = interaction.options.getInteger('number') - 1; // Convert to zero-based index
         const newGoal = interaction.options.getString('new_goal');
         const data = readData();
         const userId = interaction.user.id;

         // Update goal logic
         if (data[goalType][userId] && data[goalType][userId][number]) {
            data[goalType][userId][number].goal = encryptGoal(newGoal);
            writeData(data);

            const embed = {
               color: 0x0099ff,
               title: '˚୨୧⋆｡ Goal Updated! ✓',
               description: `︵‿︵‿୨♡୧‿︵‿︵\nGoal "${newGoal}" has been updated to "${newGoal}".`,
               footer: {
                  text: 'Track your progress with HnverDo!'
               }
            };

            await interaction.reply({
               embeds: [embed],
               ephemeral: true
            });

         } else {
            await interaction.reply({
               content: "Invalid goal index or type.", ephemeral: true
            });
         }
      } catch (e) {
         console.log("An error occurred while updating a goal:", e);
         const embed = {
            color: 0xff0000,
            title: 'Goal Update Failed',
            description: '☆.𓋼𓍊 𓆏 𓍊𓋼𓍊.☆\nThe goal could not be edited due to an error. Please try again.',
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