const {
   SlashCommandBuilder
} = require('@discordjs/builders');
const {
   readData,
   writeData
} = require('./data');
const {
   generateGoalStatusImage
} = require('./utils');

async function registerCommands(client) {
   const commands = [
      new SlashCommandBuilder()
      .setName('goal')
      .setDescription('Create a new goal')
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
         ))
      .addStringOption(option =>
         option.setName('goal')
         .setDescription('Describe your Goal♡')
         .setRequired(true)),

      new SlashCommandBuilder()
      .setName('editgoal')
      .setDescription('Edit an existing goal')
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
         ))
      .addIntegerOption(option => option.setName('number').setDescription('Goal index').setRequired(true))
      .addStringOption(option => option.setName('new_goal').setDescription('New goal description').setRequired(true)),

      new SlashCommandBuilder()
      .setName('deletegoal')
      .setDescription('Delete an existing goal')
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
         ))
      .addIntegerOption(option => option.setName('number').setDescription('Goal index').setRequired(true)),

      new SlashCommandBuilder()
      .setName('goalachieved')
      .setDescription('Mark a goal as achieved')
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
         ))
      .addIntegerOption(option => option.setName('number').setDescription('Goal index').setRequired(true)),

      new SlashCommandBuilder()
      .setName('goalstatus')
      .setDescription('Generate and send your goal status image'),

      new SlashCommandBuilder()
      .setName('goalslist')
      .setDescription('List all goals')
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

      new SlashCommandBuilder()
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

      new SlashCommandBuilder()
      .setName('helphnverdo')
      .setDescription('Help with HnverDo bot commands'),

   ].map(command => command.toJSON());

   await client.application.commands.set(commands);

   client.commands.set('goal', require('./commands/dailyGoal'));
   client.commands.set('editgoal', require('./commands/editGoal'));
   client.commands.set('deletegoal', require('./commands/deleteGoal'));
   client.commands.set('goalachieved', require('./commands/goalAchieved'));
   client.commands.set('goalstatus', require('./commands/goalStatus'));
   client.commands.set('goalslist', require('./commands/goalsList'));
   client.commands.set('incompletedgoals', require('./commands/incompletedGoals'));
   client.commands.set('helphnverdo', require('./commands/helpHnverDo'));
}

module.exports = {
   registerCommands
};