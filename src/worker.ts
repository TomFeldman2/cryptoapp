import axios from 'axios';
import cheerio from 'cheerio';
import config from 'config';
import { getUniqueSymbols } from './user_symbols/crud';
import { saveSymbolValue } from './symbol-value/crud';
import { io } from 'socket.io-client';

const socket = io(`ws://${config.get('worker.io.host')}:${config.get('worker.io.port')}`);

async function scrape(symbol: string): Promise<void> {
    console.log(`scraping ${symbol}`);
    const response = await axios(`https://www.google.com/finance/quote/${symbol}-USD`);
    const html = response.data as string;
    const $ = cheerio.load(html);
    const value = +$('.YMlKec.fxKbKc').text().replace(',', '');
    console.log(`${symbol} = ${value}$`);

    await saveSymbolValue({
        symbol,
        value,
        timestamp: new Date()
    });

    socket.emit('update from worker', { symbol, value });
}

async function work(): Promise<never> {
    for (;;) {
        try {
            const symbols = await getUniqueSymbols();
            await Promise.allSettled(symbols.map(scrape));
        } finally {
            await sleep(config.get<number>('worker.intervalDelay'));
        }
    }
}

function sleep(time: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, time));
}

work().catch(console.log);
