// config.js
import dotenv from 'dotenv';
import path from 'path';

console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`)

dotenv.config({
  path: path.resolve(process.cwd()+'/config', process.env.NODE_ENV +'.env')
});

export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || 8000,
  TIPO_PERSISTENCIA: process.env.TIPO_PERSISTENCIA || 'File'
}