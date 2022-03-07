import { createTransport } from 'nodemailer';
import { ServidorEnvioCorreo } from "../../config/config.js"
import logger from "../logger.js";

const transporter = createTransport(ServidorEnvioCorreo);

transporter.verify(function (error, success) {
    if (error) { logger.error(`Envio de mail fallo la verificacion del servidor ${error}`);
         return;
    } else {
        logger.info("Server is ready to take our messages");
    }
});

export async function enviarCorreo(correoDestino, asunto, cuerpo) {

    const mailOptions = {
        // from: 'Servidor Node.js',
        to: correoDestino,
        subject: asunto,
        html: cuerpo
    }

    try{
        let info = await transporter.sendMail(mailOptions)
        logger.info(info)
    }
    catch(err)
    {
        logger.error(err)
    }
}


