import { Entry } from './types';
import Utils from './utils';

export function createEntry(username: string | bigint, balance: bigint): Entry {
  if (typeof username === 'bigint') {
    username = Utils.stringifyUsername(username);
  }

  return { username, balance };
}

// export a constant
export const ZERO_ENTRY = createEntry('0', BigInt(0));
