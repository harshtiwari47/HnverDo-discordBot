// const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
require('dotenv').config();

const dataFile = path.join(__dirname, 'data/goals.json');

function encryptGoal(data) {
   const key = process.env.ENCRYPTION_KEY;
   const cipher = crypto.createCipheriv('aes-256-ctr', Buffer.from(key), Buffer.alloc(16, 0)); // Initialization vector of 16 bytes
   let encrypted = cipher.update(data, 'utf8', 'hex');
   encrypted += cipher.final('hex');
   return encrypted;
}

function decryptGoal(encryptedData) {
   const key = process.env.ENCRYPTION_KEY;
   const decipher = crypto.createDecipheriv('aes-256-ctr', Buffer.from(key), Buffer.alloc(16, 0));
   let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
   decrypted += decipher.final('utf8');
   return decrypted;
}

function isNewDay(utcTime) {
   const previousDate = new Date(utcTime);
   const currentDate = new Date();

   return previousDate.getUTCDate() !== currentDate.getUTCDate() ||
   previousDate.getUTCMonth() !== currentDate.getUTCMonth() ||
   previousDate.getUTCFullYear() !== currentDate.getUTCFullYear();
}

function isNewCalendarWeek(utcTime) {
   // Function to get the Monday of the week for a given date
   function getMonday(date) {
      const tempDate = new Date(date);
      const day = tempDate.getUTCDay(); // Get the day of the week (Sunday is 0)
      const diff = (day === 0 ? -6: 1) - day; // Adjust to Monday (Monday is 1)
      tempDate.setUTCDate(tempDate.getUTCDate() + diff); // Set to Monday
      return tempDate;
   }

   const previousDate = new Date(utcTime);
   const currentDate = new Date();

   // Get the Monday of the week for both dates
   const prevMonday = getMonday(previousDate);
   const currMonday = getMonday(currentDate);

   // Compare the Mondays to check if they are in the same week
   return prevMonday.getUTCFullYear() !== currMonday.getUTCFullYear() ||
   prevMonday.getUTCMonth() !== currMonday.getUTCMonth() ||
   prevMonday.getUTCDate() !== currMonday.getUTCDate();
}

function isNewMonth(utcTime) {
   const previousDate = new Date(utcTime);
   const currentDate = new Date();

   // Compare the month and year of the previous and current dates
   return previousDate.getUTCMonth() !== currentDate.getUTCMonth() ||
   previousDate.getUTCFullYear() !== currentDate.getUTCFullYear();
}

function isNewYear(utcTime) {
   const previousDate = new Date(utcTime);
   const currentDate = new Date();

   // Compare the years of the previous date and current date
   return previousDate.getUTCFullYear() !== currentDate.getUTCFullYear();
}

function formatMillisToDate(millis) {
   const date = new Date(millis);
   const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so add 1
   const day = String(date.getDate()).padStart(2, '0');
   const year = date.getFullYear();
   return `${month}/${day}/${year}`;
}

async function generateGoalStatusImage(userId) {
   const data = readData();
   const userGoals = {
      daily: data.daily.filter(g => g.userId === userId),
      weekly: data.weekly.filter(g => g.userId === userId),
      monthly: data.monthly.filter(g => g.userId === userId),
      yearly: data.yearly.filter(g => g.userId === userId)
   };

   /*  const canvas = createCanvas(800, 600);
   const ctx = canvas.getContext('2d');

   ctx.fillStyle = '#fff';
   ctx.fillRect(0, 0, canvas.width, canvas.height);

   ctx.fillStyle = '#000';
   ctx.font = '20px Arial';
   ctx.fillText('Goal Status', 10, 30);

   let y = 60;
   for (const [type, goals] of Object.entries(userGoals)) {
      ctx.fillText(`${type.charAt(0).toUpperCase() + type.slice(1)} Goals:`, 10, y);
      y += 30;
      goals.forEach(goal => {
         ctx.fillText(`- ${goal.goal} ${goal.completed ? '[Completed]': '[Not Completed]'}`, 10, y);
         y += 30;
      });
      y += 20;
   }

   const buffer = canvas.toBuffer('image/png');
   const imagePath = path.join(__dirname, 'goal_status.png');
   fs.writeFileSync(imagePath, buffer);
*/
   const imagePath = "";
   return imagePath;
}

module.exports = {
   encryptGoal,
   decryptGoal,
   isNewYear,
   isNewMonth,
   isNewCalendarWeek,
   isNewDay,
   formatMillisToDate,
   generateGoalStatusImage
};