import { HashFunction, Node, Entry } from './types';
import Utils from './utils';

export function createLeafNodeFromEntry(entry: Entry, hash: HashFunction): Node {
  if (entry.balance < BigInt(0)) {
    throw new Error('entrySum cant be negative');
  }
  const hashPreimage: bigint[] = [Utils.parseUsername(entry.username), entry.balance];

  const leaf: Node = { hash: hash(hashPreimage), sum: entry.balance};

  return leaf;
}

export function createMiddleNode(childL: Node, childR: Node, hash: HashFunction): Node {
  const middleNode = { hash: hash([childL.hash, childL.sum, childR.hash, childR.sum]), sum: childL.sum + childR.sum };

  if (middleNode.sum < BigInt(0)) {
    throw new Error('middleNode.sum cant be negative');
  }

  return middleNode;
}
