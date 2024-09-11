const {
   readData,
   writeData,
   readDataUsers,
   writeDataUsers
} = require('../data');

const {
   encryptGoal,
   decryptGoal
} = require('../utils');

module.exports = {
   name: 'goal',
   description: 'Create a new daily goal',
   execute: async (interaction) => {
      try {
         const goal = encryptGoal(interaction.options.getString('goal'));
         const goal_type = interaction.options.getString('goal_type');
         const data = readData();
         const userdata = readDataUsers();
         const userId = interaction.user.id;
         const description = encryptGoal("");
         const utcTime = new Date().getTime(); // UTC time in milliseconds

         if (data[goal_type][userId]) {
            data[goal_type][userId].push({
               goal,
               completed: false,
               utcTime,
               description
            });
         } else {
            data[goal_type][userId] = [];
            data[goal_type][userId].push({
               goal,
               completed: false,
               utcTime
            });
         }

         if (userdata[userId]) {
            userdata[userId][`${goal_type}Goals`] += 1;
         } else {
            userdata[userId] = {
               dailyGoals: 0,
               dailyGoalsCompleted: 0,
               weeklyGoals: 0,
               weeklyGoalsCompleted: 0,
               monthlyGoals: 0,
               monthlyGoalsCompleted: 0,
               yearlyGoals: 0,
               yearlyGoalsCompleted: 0,
               lastDate: 0,
               streak: 0,
               isVIP: false,
               isPremium: false
            }
            userdata[userId][`${goal_type}Goals`] += 1;
         }

         writeData(data);
         writeDataUsers(userdata);

         const embed = {
            color: 0x0933d5,
            title: `✧˚ ༘ ⋆｡♡˚ Goal Created!`,
            description: `୧ ‧₊˚ 🍮 ⋅ ☆ \n${goal_type} goal "${decryptGoal(goal)}" has been created! \n 𓍢ִ໋🌷͙֒₊˚*ੈ♡⸝⸝🪐༘`,
            footer: {
               text: 'Track your progress with HnverDo!'
            }
         };

         try {
            await interaction.reply({
               embeds: [embed],
               ephemeral: true
            });
         } catch {
            const embed = {
               color: 0xff0000,
               title: 'Goal Creation Failed',
               description: '☆.𓋼𓍊 𓆏 𓍊𓋼𓍊.☆\nThe goal could not be created due to an error. Please try again.',
               footer: {
                  text: 'Track your progress with HnverDo!'
               }
            };

            await interaction.reply({
               embeds: [embed],
               ephemeral: true
            });
         }
      } catch (e) {
         console.log("An error occurred while creating a goal:", e);
         const embed = {
            color: 0xff0000,
            title: 'Goal Creation Failed',
            description: '☆.𓋼𓍊 𓆏 𓍊𓋼𓍊.☆\nThe goal could not be created due to an error. Please try again.',
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