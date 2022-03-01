// config.js
import dotenv from 'dotenv';
import path from 'path';
import { ExtractJwt as ExtractJWT } from 'passport-jwt';


console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`)

dotenv.config({
  path: path.resolve(process.cwd()+'/config', process.env.NODE_ENV +'.env')
});

export const jwtOpts ={
  secretOrKey: process.env.SECRET ||'TOP_SECRET',
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
}

export const ServidorEnvioCorreo={
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'madalyn.waelchi45@ethereal.email',
      pass: 'BNYDRwcF3FzuzftTgD'
  }
}

export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || 8000,
  TIPO_PERSISTENCIA: process.env.TIPO_PERSISTENCIA || 'File'
}