export type Node = {
  hash: bigint;
  sum: bigint;
};

export type HashFunction = (values: bigint[]) => bigint;

export type MerkleProof = {
  rootHash: bigint;
  leafHash: bigint;
  leafSum: bigint;
  siblingsHashes: bigint[];
  siblingsSums: bigint[];
  pathIndices: number[];
};

export type MerkleProofWithTargetSum = {
  rootHash: bigint;
  targetSum: bigint;
  leafHash: bigint;
  leafSum: bigint;
  siblingsHashes: bigint[];
  siblingsSums: bigint[];
  pathIndices: number[];
};
