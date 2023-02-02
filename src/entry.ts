import { poseidon } from 'circomlibjs';
import { Node } from './types';
import Utils from './utils';

export default class Entry {
 private readonly _usernameToBigInt: bigint;
 private readonly _balance: bigint;

  // Export a constant
  public static ZERO_ENTRY = new Entry(BigInt(0), BigInt(0));

  constructor(usernameToBigInt: bigint, balance: bigint) {
    if (balance < BigInt(0)) {
      throw new Error('entry balance cant be negative');
    }

    this._usernameToBigInt = usernameToBigInt;
    this._balance = balance;
    // Freeze the object to prevent any changes
    Object.freeze(this);
  }

  public getLeafHash(): Node {
    const hashPreimage: bigint[] = [this._usernameToBigInt, this._balance];

    const leaf: Node = { hash: poseidon(hashPreimage), sum: this._balance };

    return leaf;
  }

  // add getters here
  public getBalance(): bigint {
    return this._balance;
  }

  public getUsername(): bigint {
    return this._usernameToBigInt;
  }

  public getStringifiedUsername(): string {
    return Utils.stringifyUsername(this._usernameToBigInt);
  }
}
