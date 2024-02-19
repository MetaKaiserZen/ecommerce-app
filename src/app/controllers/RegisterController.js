const crypto = require('crypto');

const api = require('../middlewares/api');
const verification = require('../middlewares/verification');

const Usuario = require('../models/Usuario');

const RegisterController =
{
    verify: () =>
    {
        return (
            async (request, response) =>
            {
                try
                {
                    const { token } = request.params;

                    const usuario = await Usuario.findOne({ verificationToken: token });

                    if (!usuario) { return response.status(404).json({ message: 'Token no válido.' }); }

                    if (usuario.verified) { return response.status(200).json({ message: 'El email ya ha sido verificado.' }); }

                    usuario.verified = true;

                    await usuario.save();

                    response.status(200).json({ message: 'Email verificado exitosamente.' });
                }
                catch (error)
                {
                    console.log(error);

                    response.status(500).json({ message: 'Internal Server Error' });
                }
            }
        );
    },
    register: () =>
    {
        return (
            async (request, response) =>
            {
                try
                {
                    if (request.headers['api-key'] === undefined || request.headers['api-secret'] === undefined) { return response.status(401).json({ message: 'Unauthorized' }); }

                    api.credentials(request, response);

                    const { host, nombre, email, password } = request.body;

                    if (!nombre || !email || !password) { return response.status(400).json({ message: 'Todos los campos son obligatorios.' }); }

                    const mail = await Usuario.findOne({ email });

                    if (mail) { return response.status(400).json({ message: 'Email ya registrado.' }); }

                    const verificationToken = crypto.randomBytes(32).toString('hex');

                    await new Usuario(
                    {
                        nombre,
                        email,
                        password,
                        verificationToken
                    }).save();

                    verification.email(host, email, verificationToken);

                    response.status(201).json({ message: 'Usuario registrado exitosamente.' });
                }
                catch (error)
                {
                    console.log(error);

                    response.status(500).json({ message: 'Internal Server Error' });
                }
            }
        );
    }
}

module.exports = RegisterController;
