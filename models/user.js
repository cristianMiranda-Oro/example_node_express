import mongoose from 'mongoose';

const uniqueValidator = require('mongoose-unique-validator');

//roles
const roles = {
    values: ['ADMIN', 'USER'],
    message: '{VALUE} no es un rol válido'
}

const Schema = mongoose.Schema;

const userSchema = new Schema({
    nombre: {type: String, required: [true, 'El nombre es necesario']},
    email: {type: String, unique: true, required: [true, 'email es necesario']},
    pass: {type: String, require: [true, 'Pass es necesario']},
    date: {type: String, default: Date.now},
    role: {type: String, default: 'USER', enum: roles},
    activo: {type: Boolean, default: true}
})

//validator
userSchema.plugin(uniqueValidator, {message: 'Error, espera {PATH} único.'});

//Eliminar pass de respuesta JSON
userSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.pass;
    return obj;
}

//convertir a modelo
const User = mongoose.model('User', userSchema);

export default User;