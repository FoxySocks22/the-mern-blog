import Express from 'express';
import Mongoose from 'mongoose';
import DotEnv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

DotEnv.config();

Mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log('DB connected!!');
    })
    .catch((err) => {
        console.log(err);  
    })

const app = Express();

app.use(Express.json());

app.listen(3000, () => {
    console.log('Server is on port 3000!');
})

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);