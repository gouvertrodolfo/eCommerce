import { contenedor } from '../models/daos/Usuarios.js';
import bCrypt from 'bcrypt';
import logger from '../logger.js'

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


    guardar() {
        if (this._id == undefined) {
            contenedor.create(this)
        }
        else {
            contenedor.actualizar(this)
        }
    }



}

function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

export async function existe(email) {

    const data = await contenedor.getByEmail(email);

    if (data == undefined) {
        return false;
    }
    return true;
}

export async function buscar(email) {

    const data = await contenedor.getByEmail(email);

    if (data == undefined) {
        err = {
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
        usuario.guardar()

        logger.info(`Registro Ok `);
        return usuario;
    }
    catch (err) {
        logger.error(`Error in Saving user: ${err}`);
        throw (err);
    }
}

export async function enviarMailRegistro(user)
{
    const lista = await contenedor.listar({admin:true});

    lista.forEach(element => {
        enviarCorreo(element.email, 'Nuevo usuario', `Estimado <b>${element.firstName}</b><br/>le informamos un nuevo registro usuario <b>${user.username}</b> nombre <b>${user.firstName}</b><br/><br/> Atte. Obrero del bits`)        
    });

}