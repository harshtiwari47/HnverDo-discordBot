const {
   ActionRowBuilder,
   ButtonBuilder,
   EmbedBuilder,
   ButtonStyle
} = require('discord.js');

const {
   decryptGoal,
   formatMillisToDate
} = require('./utils');

const ITEMS_PER_PAGE = 6;

function getPaginatedItems(items, page) {
   const start = (page - 1) * ITEMS_PER_PAGE;
   const end = start + ITEMS_PER_PAGE;
   return items.slice(start, end);
}

function createEmbed(items, page, title) {
   const fieldsValue = getPaginatedItems(items, page).map((item, index) => ({
      name: ` 🪷 ${index + 1 + (page - 1) * ITEMS_PER_PAGE}.  ${decryptGoal(item.goal)}`,
      value: `˗ˏˋ ★ ˎˊ˗\n\n  (${item.completed ? '✧ Completed': 'メ Not Completed'}) \n  **✿ Date:** ${formatMillisToDate(item.utcTime)}`,
      inline: false
   }));

   return new EmbedBuilder()
   .setColor(0x3af5a9)
   .setTitle(title)
   .setDescription("⊹ ࣪ ˖ Here's the list of the goals you have created ೀ⋆｡🌷")
   .addFields(fieldsValue)
   .setFooter({
      text: 'Manage your items with ♡HnverDo!',
      iconURL: 'https://cdn.discordapp.com/app-icons/1282962623872241664/e326cd5cafba6714ed770c66b3c978ad.png?size=128'
   });
}

function createButtons(page, totalPages, goalType) {

   return new ActionRowBuilder().addComponents(
      new ButtonBuilder()
      .setCustomId(`prev_${page}_${goalType}`)
      .setLabel('Previous')
      .setStyle(ButtonStyle.Primary)
      .setDisabled(page === 1),

      new ButtonBuilder()
      .setCustomId(`next_${page}_${goalType}`)
      .setLabel('Next')
      .setStyle(ButtonStyle.Primary)
      .setDisabled(page === totalPages)
   );
}

function getTotalPages(items) {
   return Math.ceil(items.length / ITEMS_PER_PAGE);
}

module.exports = {
   createEmbed,
   createButtons,
   getTotalPages
};