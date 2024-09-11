const fs = require('fs');
const path = './data/goals.json';
const userPath = './data/users.json';

function readData() {
   if (!fs.existsSync(path)) return {
      daily: {},
      weekly: {},
      monthly: {},
      yearly: {}
   };
   return JSON.parse(fs.readFileSync(path, 'utf8'));
}
function writeData(data) {
   fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

function readDataUsers() {
   if (!fs.existsSync(userPath)) return {}
   return JSON.parse(fs.readFileSync(userPath, 'utf8'));
}
function writeDataUsers(data) {
   fs.writeFileSync(userPath, JSON.stringify(data, null, 2));
}

module.exports = {
   readData,
   writeData,
   readDataUsers,
   writeDataUsers
};