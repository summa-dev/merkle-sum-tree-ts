import { Node } from './types';
export default class Entry {
    private readonly _usernameToBigInt;
    private readonly _balance;
    private readonly _username;
    static ZERO_ENTRY: Entry;
    constructor(usernameToBigInt: bigint, balance: bigint);
    computeLeaf(): Node;
    get balance(): bigint;
    get usernameToBigInt(): bigint;
    get username(): string;
}
