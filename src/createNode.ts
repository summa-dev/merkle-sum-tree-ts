import checkParameter from './checkParameter';
import { HashFunction, Node, Entry } from './types';
import {parseUsernameToBigInt} from './utils/username';

export function createLeafNodeFromEntry(entry: Entry, hash: HashFunction): Node {

  if (entry.balance < BigInt(0)) {
    throw new Error('entrySum cant be negative');
  }

  checkParameter(entry.username, 'username', 'string');
  checkParameter(entry.balance, 'balance', 'bigint');

  const hashPreimage: bigint[] = [parseUsernameToBigInt(entry.username), entry.balance];

  const leaf: Node = {hash: hash(hashPreimage), sum: entry.balance};

  checkParameter(leaf, 'leaf', 'object');
  checkParameter(leaf.hash, 'hash', 'bigint');
  checkParameter(leaf.sum, 'sum', 'bigint');

  return leaf;
}

export function createMiddleNode(childL: Node, childR: Node, hash: HashFunction): Node {
  const middleNode = { hash: hash([childL.hash, childL.sum, childR.hash, childR.sum]), sum: childL.sum + childR.sum };

  checkParameter(middleNode, 'middleNode', 'object');
  checkParameter(middleNode.hash, 'hash', 'bigint');
  checkParameter(middleNode.sum, 'sum', 'bigint');

  if (middleNode.sum < BigInt(0)) {
    throw new Error('middleNode.sum cant be negative');
  }

  return middleNode;
}
