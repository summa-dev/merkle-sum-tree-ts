import { HashFunction, Node } from './types';

export function createMiddleNode(childL: Node, childR: Node, hash: HashFunction): Node {
  const middleNode = { hash: hash([childL.hash, childL.sum, childR.hash, childR.sum]), sum: childL.sum + childR.sum };

  if (middleNode.sum < BigInt(0)) {
    throw new Error('middleNode.sum cant be negative');
  }

  return middleNode;
}
