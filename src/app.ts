import express from 'express';
import path from 'node:path';
import usersRouter from './users/router';

const PORT = 8080;
const app = express();

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded());

app.use('/users', usersRouter);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
