import { createTransport } from 'nodemailer';
import { ServidorEnvioCorreo } from "../../config/config.js"
import logger from "../logger.js";

const transporter = createTransport(ServidorEnvioCorreo);


export async function enviarCorreo(correoDestino, asunto, cuerpo) {

    const mailOptions = {
        from: 'Servidor Node.js',
        to: correoDestino,
        subject: asunto,
        html: cuerpo
    }

    try{
    const info = transporter.sendMail(mailOptions)
        logger.info(info)
    }
    catch(err)
    {
        logger.err(err)
    }
}