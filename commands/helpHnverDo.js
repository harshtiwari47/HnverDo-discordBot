module.exports = {
   name: 'helphnverdo',
   description: 'Help with HnverDo bot commands',
   execute: async (interaction) => {
      const helpEmbed = {
         color: 0xffffff,
         // Pick a color for the embed
         title: 'HnverDo Bot Commands',
         description: '▼ Here is a list of available commands you can use with the HnverDo bot to manage your goals ✧˖°🌷📎⋆ ˚｡⋆୨୧˚: \n\n — **<number>** : Order number of Goal \n — **<goal_type>** : Daily/Weekly/Monthly/Yearly',
         fields: [{
            name: '✧ `/goal` <goal>',
            value: ' ⋆⭒˚｡⋆ Create a new goal.',
            inline: false
         },
            {
               name: '✧ `/editgoal` <goal_type> <number> <new_goal>',
               value: ' ⋆⭒˚｡⋆ Edit an existing goal.',
               inline: false
            },
            {
               name: '✧ `/deletegoal` <goal_type> <number>',
               value: ' ⋆⭒˚｡⋆ Delete an existing goal.',
               inline: false
            },
            {
               name: '✧ `/goalachieved` <goal_type> <number>',
               value: ' ⋆⭒˚｡⋆ Mark a goal as achieved.',
               inline: false
            },
            {
               name: '✧ `/goalstatus`',
               value: ' ⋆⭒˚｡⋆ Generate and send your goal status image.',
               inline: false
            },
            {
               name: '✧ `/goalslist` <goal_type>',
               value: ' ⋆⭒˚｡⋆ List all goals of a particular type.',
               inline: false
            },
            {
               name: '✧ `/incompletedgoals` <goal_type>',
               value: ' ⋆⭒˚｡⋆ List all incomplete goals of a particular type.',
               inline: false
            },
            {
               name: '✧ `/helphnverdo`',
               value: ' ⋆⭒˚｡⋆ Show this help message.',
               inline: false
            },
            // Additional future fields
            {
               name: '𓇼🐚☾☼🦪 Website',
               value: ' ๋࣭ ⭑⚝ [HnverDo Website](https://www.yourwebsite.com)',
               inline: false
            },
            {
               name: '☆ Support',
               value: '[Contact Support](https://www.yourwebsite.com/support)',
               inline: false
            },
            {
               name: '˙⁠❥⁠˙ More Features Coming Soon!',
               value: ' ✩°｡ ⋆⸜ 🎧✮ Stay tuned for updates and new features.',
               inline: false
            }],
         footer: {
            text: 'Manage your goals with HnverDo bot!',
            icon_url: 'https://cdn.discordapp.com/app-icons/1282962623872241664/e326cd5cafba6714ed770c66b3c978ad.png?size=128'
         }
      };

      await interaction.reply({
         embeds: [helpEmbed]
      });
   }
};