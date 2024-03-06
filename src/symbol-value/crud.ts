import mongoose from '../db/mongo';
import { SymbolValue } from './dto';

const schema = new mongoose.Schema<SymbolValue>({
    symbol: String,
    value: Number,
    timestamp: Date
});

const symbolValueModel = mongoose.model<SymbolValue>('SymbolValue', schema);

export async function addSymbolValue(symbolValue: SymbolValue): Promise<string> {
    const newSymbolValue = new symbolValueModel(symbolValue);
    await newSymbolValue.save();
    return newSymbolValue._id.toString();
}
