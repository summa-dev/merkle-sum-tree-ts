import { Node, HashFunction } from './types';
import { createMiddleNode } from './createMiddleNode';
import Entry from './Entry';

export default function buildMerkleTreeFromEntries(
  entries: Entry[],
  depth: number,
  nodes: Node[][],
  hash: HashFunction,
): Node {
  // if entries is not a power of 2, fill it with zero entries
  while (entries.length < 2 ** depth) {
    entries.push(Entry.ZERO_ENTRY);
  }

  // range over each level of the tree
  for (let i = 0; i < depth; i++) {
    nodes[i] = [];

    // if level is 0, the nodes are the leaves, we need to create them from the entries
    if (i === 0) {
      for (const entry of entries) {
        nodes[i].push(entry.getLeafHash() as Node);
      }
    }

    // else, the nodes are the middle nodes, we need to create them from the previous level
    else {
      for (let j = 0; j < nodes[i - 1].length; j += 2) {
        nodes[i].push(createMiddleNode(nodes[i - 1][j], nodes[i - 1][j + 1], hash));
      }
    }
  }

  // return the root of the tree
  return createMiddleNode(nodes[depth - 1][0], nodes[depth - 1][1], hash);
}
