import { query } from '../db/mysql';
import { User } from './dto';
import { OkPacketParams } from 'mysql2';

export async function getUserWithGitHubId(githubId: number): Promise<User | undefined> {
    const result = (await query({
        sql: `SELECT *
              FROM users
              WHERE github_id = ?`,
        values: [githubId]
    })) as User[];

    if (!result) {
        return undefined;
    }

    return result[0];
}

export async function loginUser(user: Omit<User, 'id'>): Promise<number> {
    const { github_id } = user;

    const result = (await query({
        sql: `INSERT INTO users (github_id)
              VALUES (?)`,
        values: [github_id]
    })) as OkPacketParams;

    return result.insertId as number;
}
