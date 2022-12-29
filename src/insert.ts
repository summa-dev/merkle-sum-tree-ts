import checkParameter from './checkParameter';
import { HashFunction, Node } from './types';

// => Modify it : should support Node2 type, children should be Node2[]. Hash should be performed with sum too!
export default function insert(
  leaf: Node,
  depth: number,
  arity: number,
  nodes: Node[][],
  zeroes: Node[],
  hash: HashFunction,
): Node {
  checkParameter(leaf, 'leaf', 'number', 'string', 'bigint');

  if (nodes[0].length >= arity ** depth) {
    throw new Error('The tree is full');
  }

  let node = leaf;
  let index = nodes[0].length;

  console.log("Adding leaf to the tree", leaf)

  for (let level = 0; level < depth; level += 1) {

    const position = index % arity;
    const levelStartIndex = index - position;
    const levelEndIndex = levelStartIndex + arity;

    const children = [];
    nodes[level][index] = node;

    for (let i = levelStartIndex; i < levelEndIndex; i += 1) {
      if (i < nodes[level].length) {
        children.push(nodes[level][i]);
      } else {
        // Case where the level is not full and we need to use empty Nodes
        children.push(zeroes[level]);
      }
    }

    node = hash(children);
    index = Math.floor(index / arity);
  }

  return node;
}
