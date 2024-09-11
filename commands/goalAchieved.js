const {
   readData,
   writeData,
   readDataUsers,
   writeDataUsers
} = require('../data');

const {
   decryptGoal
} = require('../utils');

module.exports = {
   name: 'goalachieved',
   description: 'Mark a goal as achieved',
   execute: async (interaction) => {
      try {
         const goalType = interaction.options.getString('goal_type');
         const number = interaction.options.getInteger('number') - 1; // Convert to zero-based index
         const data = readData();
         const userdata = readDataUsers();

         const userId = interaction.user.id;

         // Mark goal as achieved
         if (data[goalType][userId] && data[goalType][userId][number]) {
            data[goalType][userId][number].completed = true;
            userdata[userId][`${goalType}Goals`] += 1;
            writeDataUsers(userdata);
            writeData(data);

            const embed = {
               color: 0xe81f62,
               title: `✧˚ ༘ ⋆｡♡˚ Goal Achieved!`,
               description: `୧ ‧₊˚ ✅ ⋅ ☆ \nGoal **"${decryptGoal(data[goalType][userId][number].goal)}"** has been marked as achieved. \n 𓍢ִ໋🌷͙֒₊˚*ੈ♡⸝⸝🪐༘`,
               footer: {
                  text: 'Track your progress with HnverDo!'
               }
            };

            await interaction.reply({
               embeds: [embed],
               ephemeral: false
            });
         } else {
            await interaction.reply({
               content: 'Invalid goal index or type.', ephemeral: true
            });
         }
      } catch (e) {
         console.log("An error occurred while marking a goal completion:", e);
         const embed = {
            color: 0xff0000,
            title: 'Goal Marking Failed',
            description: '☆.𓋼𓍊 𓆏 𓍊𓋼𓍊.☆\nThe goal could not be mark achieved due to an error. Please try again.',
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