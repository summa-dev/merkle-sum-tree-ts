import { Node, HashFunction } from './types';
import Entry from './Entry';
export default function buildMerkleTreeFromEntries(entries: Entry[], depth: number, nodes: Node[][], hash: HashFunction): Node;
