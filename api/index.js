import Express from 'express';

const App = Express();

App.listen(300, () => {
    console.log('Server is on port 3000!');
})