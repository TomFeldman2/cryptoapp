import util from 'node:util';
import mysql from 'mysql2';
import config from 'config';

const pool = mysql.createPool(config.get('mysql'));
export const query = util.promisify(pool.query).bind(pool);
