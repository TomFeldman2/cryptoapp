import { ObjectId } from 'mongoose';

export type SymbolValue = {
    id: ObjectId;
    symbol: string;
    value: number;
    timestamp: Date;
};
