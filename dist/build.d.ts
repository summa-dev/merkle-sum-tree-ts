import { Entry, Node, HashFunction } from './types';
export default function buildMerkleTreeFromEntries(entries: Entry[], depth: number, nodes: Node[][], hash: HashFunction): Node;
