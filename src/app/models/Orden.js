const { Schema, model } = require('mongoose');

const OrdenSchema = new Schema(
{
    usuario:
    {
        type: Schema.Type.Object,
        ref: 'Usuario',
        required: true
    },
    productos:
    [
        {
            nombre:
            {
                type: String,
                required: true
            },
            cantidad:
            {
                type: Number,
                required: true
            },
            precio:
            {
                type: Number,
                required: true
            },
            imagen:
            {
                type: String,
                required: true
            }
        }
    ],
    direccionEnvio:
    {
        nombre:
        {
            type: String,
            required: true
        },
        telefono:
        {
            type: String,
            required: true
        },
        numeracion:
        {
            type: String,
            required: true
        },
        calle:
        {
            type: String,
            required: true
        },
        referencia:
        {
            type: String,
            required: true
        },
        codigoPostal:
        {
            type: String,
            required: true
        }
    },
    precioTotal:
    {
        type: Number,
        required: true
    },
    metodoPago:
    {
        type: String,
        required: true
    },
    createdAt:
    {
        type: Date,
        default: Date.now()
    }
});

const Orden = model('Orden', OrdenSchema);

module.exports = Orden;
