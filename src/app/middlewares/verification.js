const dotenv = require('dotenv');

const nodemailer = require('nodemailer');

dotenv.config();

const verification =
{
    email: async (host, email, verificationToken) =>
    {
        try
        {
            const transporter = nodemailer.createTransport(
            {
                host: process.env.MAIL_HOST,
                port: process.env.MAIL_PORT,
                secure: true,
                auth:
                {
                    user: process.env.MAIL_USERNAME,
                    pass: process.env.MAIL_PASSWORD
                }
            });

            const options =
            {
                from: `"Ecommerce" <${process.env.MAIL_USERNAME}>`,
                to: email,
                subject: 'Email Verification',
                text: `Please click the following link to verify your email: ${host}/verify/${verificationToken}`
            }

            await transporter.sendMail(options);
        }
        catch (error)
        {
            console.log(error);

            response.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

module.exports = verification;
