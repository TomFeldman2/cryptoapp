import config from 'config';
import { getUniqueSymbols } from './user_symbols/crud';

async function scrape(symbol: string) {
    console.log(symbol);
}

async function work() {
    while (true) {
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

work();
