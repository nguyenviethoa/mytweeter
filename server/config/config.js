import dotenv from 'dotenv';
// require('dotenv').config();

dotenv.config({ silent: true });

export const {
  JWT_SECRET,
} = process.env;

const defaults = {
  JWT_SECRET: 'password',
};

Object.keys(defaults).forEach((key) => {
  if (!process.env[key] || process.env[key] === defaults[key]) {
    throw new Error(`Please enter a custom ${key} in .env on the root directory`);
  }
});

console.log('secret: ', JWT_SECRET);

export default JWT_SECRET;