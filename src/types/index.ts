export type Node = {
  value: bigint;
  sum: bigint;
};

export type HashFunction = (values: bigint[]) => bigint;

export type MerkleProof = {
  root: any;
  leaf: any;
  siblings: any[];
  pathIndices: number[];
};
