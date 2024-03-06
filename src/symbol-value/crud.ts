import mongoose from '../db/mongo';
import { SymbolValue } from './dto';

const schema = new mongoose.Schema<SymbolValue>({
    symbol: String,
    value: Number,
    timestamp: Date
});

const symbolValueModel = mongoose.model<SymbolValue>('SymbolValue', schema);

export async function saveSymbolValue(symbolValue: Omit<SymbolValue, 'id'>): Promise<string> {
    const newSymbolValue = new symbolValueModel(symbolValue);
    await newSymbolValue.save();
    return newSymbolValue._id.toString();
}

export async function getLatestSymbolValue(symbol: string): Promise<SymbolValue> {
    const symbolValues: SymbolValue[] = await symbolValueModel.find({ symbol }).sort({ timestamp: 'desc' }).limit(1);

    return symbolValues[0] || { symbol, value: 0 };
}
