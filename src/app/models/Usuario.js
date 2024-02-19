const { Schema, model } = require('mongoose');

const UsuarioSchema = new Schema(
{
    nombre:
    {
        type: String,
        required: true
    },
    email:
    {
        type: String,
        required: true,
        unique: true
    },
    password:
    {
        type: String,
        required: true
    },
    direcciones:
    [
        {
            nombre: String,
            telefono: String,
            numeracion: String,
            calle: String,
            referencia: String,
            ciudad: String,
            pais: String,
            codigoPostal: String
        }
    ],
    ordenes:
    [
        {
            type: Schema.Types.ObjectId,
            ref: 'Orden'
        }
    ],
    verified:
    {
        type: Boolean,
        default: false
    },
    verificationToken: String,
    createdAt:
    {
        type: Date,
        default: Date.now()
    }
});

const Usuario = model('Usuario', UsuarioSchema);

module.exports = Usuario;
