import { MerkleProof, Node } from './types';
import Entry from './entry';
export default function createProof(index: number, entries: Entry[], depth: number, nodes: Node[][], root: Node): MerkleProof;
