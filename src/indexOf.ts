import checkParameter from './checkParameter';
import { Node, Entry, HashFunction } from './types';
import { createLeafNodeFromEntry } from './createNode';

export default function indexOf(username : string, balance : bigint, nodes: Node[][], hash : HashFunction): number {

  const entry : Entry = {
    username,
    balance
  }
  
  const leaf = createLeafNodeFromEntry(entry, hash)
  checkParameter(leaf, 'leaf', 'object');
  checkParameter(leaf.hash, 'hash', 'bigint');
  checkParameter(leaf.sum, 'sum', 'bigint');

  return nodes[0].map((x) => x.hash).indexOf(leaf.hash);
}
