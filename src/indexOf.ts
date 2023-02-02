import { Node, HashFunction } from './types';
import Utils from './utils';
import Entry from './entry';

export default function indexOf(username: string, balance: bigint, nodes: Node[][], hash: HashFunction): number {
  const usernameToBigInt = Utils.parseUsername(username);

  const entry = new Entry(usernameToBigInt, balance);

  const leaf = entry.getLeafHash();

  return nodes[0].map((x) => x.hash).indexOf(leaf.hash);
}
