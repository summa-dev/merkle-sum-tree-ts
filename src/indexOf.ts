import { Node, HashFunction } from './types';
import { createLeafNodeFromEntry } from './createNode';
import { createEntry } from './createEntry';

export default function indexOf(username: string, balance: bigint, nodes: Node[][], hash: HashFunction): number {

  const entry = createEntry(username, balance);

  const leaf = createLeafNodeFromEntry(entry, hash);

  return nodes[0].map((x) => x.hash).indexOf(leaf.hash);
}
