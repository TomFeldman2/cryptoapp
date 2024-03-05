import { UserSymbol } from './dto';
import { pool } from '../db/mysql';
import { OkPacketParams } from 'mysql2';

export async function saveUserSymbol(userSymbol: UserSymbol): Promise<number> {
    const { userId, symbol } = userSymbol;

    // @ts-expect-error since mysql2 has no types
    const result: OkPacketParams[] = (await pool.query(
        `
            INSERT INTO users_symbols
                (user_id, symbol)
            values (?, ?)
        `,
        [userId, symbol]
    )) as OkPacketParams;

    return result[0].insertId as number;
}
