import { MerkleProof, Node, Entry } from './types';
export default function createProof(index: number, entries: Entry[], depth: number, nodes: Node[][], root: Node): MerkleProof;
