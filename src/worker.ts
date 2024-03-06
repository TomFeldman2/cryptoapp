import axios from 'axios';
import cheerio from 'cheerio';
import config from 'config';
import { getUniqueSymbols } from './user_symbols/crud';
import { saveSymbolValue } from './symbol-value/crud';

async function scrape(symbol: string) {
    console.log(`scraping ${symbol}`);
    const response = await axios(`https://www.google.com/finance/quote/${symbol}-USD`);
    const html = response.data;
    const $ = cheerio.load(html);
    const value = +$('.YMlKec.fxKbKc').text().replace(',', '');
    console.log(`${symbol} = ${value}$`);

    await saveSymbolValue({
        symbol,
        value,
        timestamp: new Date()
    });
}

async function work() {
    while (true) {
        try {
            const symbols = await getUniqueSymbols();
            await Promise.allSettled(symbols.map(scrape));
            console.log('************************');
        } finally {
            await sleep(config.get<number>('worker.intervalDelay'));
        }
    }
}

function sleep(time: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, time));
}

work();
