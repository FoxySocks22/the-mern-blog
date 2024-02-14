import Express from 'express';
import Mongoose from 'mongoose';
import DotEnv from 'dotenv';
import userRoutes from './routes/user.routes.js';

DotEnv.config();

Mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log('DB connected!!');
    })
    .catch((err) => {
        console.log(err);  
    })

const app = Express();

app.listen(3000, () => {
    console.log('Server is on port 3000!');
})

app.use('/api/user', userRoutes);