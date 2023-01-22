export type Node = {
    hash: bigint;
    sum: bigint;
};
export type Entry = {
    username: string;
    balance: bigint;
};
export type HashFunction = (values: bigint[]) => bigint;
export type MerkleProof = {
    rootHash: bigint;
    username: bigint;
    balance: bigint;
    siblingsHashes: bigint[];
    siblingsSums: bigint[];
    pathIndices: number[];
};
