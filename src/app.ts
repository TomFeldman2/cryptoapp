import express from 'express';
import path from 'node:path';
import config from 'config';
import usersRouter from './users/router';

const PORT = config.get<number>('app.port');

const app = express();

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use('/users', usersRouter);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
