import { UserSymbol } from './dto';
import { query } from '../db/mysql';
import { OkPacketParams } from 'mysql2';

export async function saveUserSymbol(userSymbol: UserSymbol): Promise<number> {
    const { user_id, symbol } = userSymbol;

    const result = (await query({
        sql: `
            INSERT INTO users_symbols
                (user_id, symbol)
            VALUES (?, ?)
        `,
        values: [user_id, symbol]
    })) as OkPacketParams;

    return result.insertId as number;
}

export async function getUserSymbols(userId: number): Promise<UserSymbol[]> {
    return (await query({
        sql: `
            SELECT *
            FROM users_symbols
            WHERE user_id = ?
        `,
        values: [userId]
    })) as UserSymbol[];
}

export async function getUniqueSymbols(): Promise<string[]> {
    const result = (await query({
        sql: `
            SELECT DISTINCT(symbol)
            FROM users_symbols
        `
    })) as { symbol: string }[];

    return result.map((row) => row.symbol);
}
