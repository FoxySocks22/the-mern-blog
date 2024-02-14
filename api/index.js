import Express from 'express';
import Mongoose from 'mongoose';
import DotEnv from 'dotenv';

DotEnv.config();

Mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log('DB connected!!');
    })
    .catch((err) => {
        console.log(err);  
    })

const App = Express();

App.listen(300, () => {
    console.log('Server is on port 3000!');
})