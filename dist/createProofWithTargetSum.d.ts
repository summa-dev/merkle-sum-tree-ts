import { MerkleProofWithTargetSum, Node } from './types';
export default function createProofWithTargetSum(index: number, targetSum: bigint, depth: number, arity: number, nodes: Node[][], zeroes: Node[], root: Node): MerkleProofWithTargetSum;
