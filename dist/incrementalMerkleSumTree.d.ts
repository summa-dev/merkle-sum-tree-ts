import { MerkleProof, Node, Entry } from './types';
/**
 * A Merkle Sum Tree is a binary Merkle Tree with the following properties:
 * - Each entry of a Merkle Sum Tree is a pair of a value and a sum.
 * - Each Leaf Node contains a hash and a sum. The hash is equal to H(value, sum). The sum is equal to the sum itself.
 * - Each Middle Node contains a hash and a sum. The hash is equal to H(LeftChild.hash, LeftChild.sum, RightChild.hash, RightChild.sum). The sum is equal to the sum of the sums of its children.
 * - The Root Node represents the committed state of the Tree and contains the sum of all the entries' sums.
 * The IncrementalMerkleSumTree class is a TypeScript implementation of Incremental Merkle Sum tree and it
 * provides all the functions to create efficient trees and to generate and verify proofs of membership.
 */
export default class IncrementalMerkleSumTree {
    static readonly maxDepth = 32;
    private static readonly _hash;
    private _root;
    private readonly _nodes;
    private readonly _depth;
    private readonly _entries;
    /**
     * Initializes the tree with the csv file containing the entries of the tree.
     * @param path path to the csv file storing the entries.
     */
    constructor(path: string);
    /**
     * Returns the root hash of the tree.
     * @returns Root hash.
     */
    get root(): Node;
    /**
     * Returns the depth of the tree.
     * @returns Tree depth.
     */
    get depth(): number;
    /**
     * Returns the leaves of the tree.
     * @returns List of leaves.
     */
    get leaves(): Node[];
    /**
     * Returns the entries of the tree.
     * @returns List of entries.
     */
    get entries(): Entry[];
    /**
     * Returns the index of a leaf. If the leaf does not exist it returns -1.
     * @param username username of the queried entry.
     * @param balance balance of the queried entry.
     * @returns Index of the leaf.
     */
    indexOf(username: string, balance: bigint): number;
    /**
     * Creates a proof of membership. The MerkleProof contains the path from the leaf to the root.
     * @param index Index of the proof's leaf.
     * @returns MerkleProof object.
     */
    createProof(index: number): MerkleProof;
    /**
     * Verifies a proof and return true or false.
     * It verifies that a leaf is included in the tree and that the sum computed from the leaf to the root is equal to the total sum of the tree.
     * @param proof Proof to be verified.
     * @returns True or false.
     */
    verifyProof(proof: MerkleProof): boolean;
}
