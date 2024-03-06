import Joi from 'joi';
import { UserSymbol } from '../user_symbols/dto';

export const addSymbolValidator = Joi.object<UserSymbol>({
    symbol: Joi.string().length(3).uppercase().required()
});
