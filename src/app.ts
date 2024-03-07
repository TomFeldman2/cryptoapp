import express from 'express';
import session from 'express-session';
import path from 'node:path';
import config from 'config';
import usersRouter from './users/router';
import guestsRouter from './guets/router';
import githubRouter from './github/router';
import auth from './middlewares/github-auth';
import enforceAuth from './middlewares/enforce-auth';

declare global {
    namespace Express {
        interface User {
            id: number;
        }
    }
}

const PORT = config.get<number>('app.port');

const app = express();

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1_000 * 60 * 60 * 24
        }
    })
);

app.use(auth.session());

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use('/', guestsRouter);
app.use('/github', githubRouter);

app.use(enforceAuth);
app.use('/users', usersRouter);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
