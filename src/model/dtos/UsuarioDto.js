import bCrypt from 'bcrypt';

export default class UsuarioDto {
    _id;
    roles;
    password;
    email;
    username;
    firstname;
    lastName;
    avatar;

    constructor({ _id, email, username, password, firstname, lastname, avatar, roles }) {
        if (_id === undefined) {
            this._id = undefined;
            this.roles = [];
            this.password = createHash(password)
        }
        else {
            this._id = _id;
            this.roles = roles;
            this.password = password;
        }

        this.email = email;
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.avatar = avatar;

    }

    static fromJson(json) {
        const datos = JSON.parse(json)
        return new UsuarioDto(datos)
    }

    toJson() {
        
        return {
            email:this.email,
            username:this.username,
            firstname:this.firstname,
            lastname:this.lastname,
            avatar: this.avatar,
            roles: this.roles
        }
    }

    isValidPassword(password) {
        return bCrypt.compareSync(password, this.password);
    }
    
}

function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

