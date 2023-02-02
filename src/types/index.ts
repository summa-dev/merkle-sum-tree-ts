import Entry from '../entry';

export type Node = {
  hash: bigint;
  sum: bigint;
};

export type HashFunction = (values: bigint[]) => bigint;

export type MerkleProof = {
  rootHash: bigint;
  entry: Entry;
  siblingsHashes: bigint[];
  siblingsSums: bigint[];
  pathIndices: number[];
};
