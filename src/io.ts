import { Server } from 'socket.io';
import config from 'config';

const io = new Server({
    cors: {
        origin: '*'
    }
});

io.on('connection', (socket) => {
    console.log('received new connection');
    socket.on('update from worker', (message) => {
        console.log(`received messaged from worker ${message}`);
        io.emit('update your list', message);
    });
});

io.listen(config.get<number>('io.port'));
