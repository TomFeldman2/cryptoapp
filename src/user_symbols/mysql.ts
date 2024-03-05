import { UserSymbol } from './dto';
import { query } from '../db/mysql';
import { OkPacketParams } from 'mysql2';

export async function saveUserSymbol(userSymbol: UserSymbol): Promise<number> {
    const { userId, symbol } = userSymbol;
    const result = (await query({
        sql: `
            INSERT INTO users_symbols
                (user_id, symbol)
            values (?, ?)
        `,
        values: [userId, symbol]
    })) as OkPacketParams;

    return result.insertId as number;
}
