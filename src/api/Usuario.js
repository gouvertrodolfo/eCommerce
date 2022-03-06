import { contenedor } from '../models/daos/Usuarios.js';
import bCrypt from 'bcrypt';
import logger from '../logger.js'
import { enviarCorreo } from './Mensajeria.js'

class Usuario {

    constructor(data) {
        const { _id, username, password, email, firstName, lastName, avatar, admin } = data;

        if (_id == undefined) {
            this._id = undefined;
            this.admin = false;
            this.password = createHash(password)
        }
        else {
            this._id = _id;
            this.admin = admin;
            this.password = password;
        }

        this.email = email;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.avatar = avatar;

    }

    get() {
        const user = {
            email: this.email,
            username: this.username,
            firstName: this.firstName,
            lastName: this.lastName,
            avatar: this.avatar,
            admin: this.admin
        }

        return user;
    }

    isValidPassword(password) {
        return bCrypt.compareSync(password, this.password);
    }

    async guardar() {
        if (this._id == undefined) {
            this._id = await contenedor.create(this)
        }
        else {
            await contenedor.actualizar(this)
        }
    }

}

function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

export async function existeEmail(email) {

    const data = await contenedor.getByEmail(email);

    if (data === undefined) {
        return false;
    }
    return true;
}

export async function existeUsername(username) {

    const data = await contenedor.getByUserName(username);

    if (data === undefined) {
        return false;
    }
    return true;
}


export async function buscar(email) {

    const data = await contenedor.getByEmail(email);

    if (data == undefined) {
        const err = {
            codigo: 400,
            descripcion: `${email} no es un usuario registrado`
        }
        throw err
    }

    const usuario = new Usuario(data);

    return usuario;
}

export async function registrar(data) {
    try {
        const usuario = new Usuario(data)

        await usuario.guardar()

        logger.info(`Registro Ok `);

        await enviarMailRegistro(usuario)

        return usuario;
    }
    catch (err) {
        logger.error(`Error in Saving user: ${err}`);
        throw (err);
    }
}

async function enviarMailRegistro(user) {

    const asunto = 'Nuevo usuario'
    let mailto

    try {
        const lista = await contenedor.listar({ admin: true });


        lista.forEach(element => {
            if (mailto == undefined)
                mailto = element.email
            else
                mailto = mailto + ',' + element.email
        });

        const cuerpo = `Estimados Admins <br/>le informamos un nuevo registro usuario <b>${user.username}</b> nombre <b>${user.firstName}</b><br/><br/> Atte. Obrero del bits`
        await enviarCorreo(mailto, asunto, cuerpo)

    } catch (err) { logger.error(`fallo el envio de mail error:${err}`) }

}