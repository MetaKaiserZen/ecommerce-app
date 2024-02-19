const dotenv = require('dotenv');

const { connect } = require('mongoose');

const app = require('../app');

dotenv.config();

const database =
{
    mongoose: async (port) =>
    {
        try
        {
            await connect(process.env.MONGODB);

            console.log('Connected to MongoDB');

            app.listen(port, () =>
            {
                console.log(`Server running on port ${port}`)
            });
        }
        catch (error)
        {
            console.log(error)

            console.log('Error connecting to MongoDB');
        }
    }
}

module.exports = database;
