import Express from 'express';
import Mongoose from 'mongoose';
import DotEnv from 'dotenv';
import userRoutes from './routes/user.route.js';
import blogRoutes from './routes/blog.route.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';

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
app.use(cookieParser());

app.listen(3000, () => {
    console.log('Server is on port 3000!');
})

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error.';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
});