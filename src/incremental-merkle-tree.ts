import checkParameter from './checkParameter';
import { createLeafNodeFromEntry, createMiddleNode } from './createNode';
import { poseidon } from "circomlibjs"
import _createProof from './createProof';
import _indexOf from './indexOf';
import _insert from './insert';
import { HashFunction, MerkleProof, Node, Entry} from './types';
import _parseCsv from './utils/csv';
import _verifyProof from './verifyProof';

/**
 * A Merkle tree is a tree in which every leaf node is labelled with the cryptographic hash of a
 * data block, and every non-leaf node is labelled with the cryptographic hash of the labels of its child nodes.
 * It allows efficient and secure verification of the contents of large data structures.
 * The IncrementalMerkleSumTree class is a TypeScript implementation of Incremental Merkle Sum tree and it
 * provides all the functions to create efficient trees and to generate and verify proofs of membership.
 */

// [x] Use poseidon hash function by default
// [x] take a csv file as input to create the tree inside the constructor 
// [x] add the entries as leaves inside the tree
// [x] add a new type which is entry
// [ ] Make sure to randomize zero entries
export default class IncrementalMerkleSumTree {
  static readonly maxDepth = 32;
  private _root: Node;
  private readonly _nodes: Node[][];
  private readonly _zeroes: Node[];
  private readonly _hash: HashFunction;
  private readonly _depth: number;
  private readonly _arity: number;
  private readonly _entries: Entry[];

    /**
   * Initializes the tree with the csv file containing the entries of the tree.
   * @param path path to the csv file storing the entries.
   */
    constructor(path: string, depth: number) {
      checkParameter(path, 'path', 'string');

      if (depth < 1 || depth > IncrementalMerkleSumTree.maxDepth) {
        throw new Error('The tree depth must be between 1 and 32');
      }

      // Initialize the attributes.
      this._hash = poseidon;
      this._depth = depth;
      this._zeroes = [];
      this._nodes = [];
      this._arity = 2;
      this._entries = _parseCsv(path);

      let zeroEntry : Entry = {username: "/", salt: BigInt(0), balance: BigInt(0)};

      // Init zeroNode
      let zeroNode: Node = createLeafNodeFromEntry(zeroEntry, this._hash);
    

      for (let i = 0; i < this._depth; i += 1) {
        this._zeroes.push(zeroNode);
        this._nodes[i] = [];
        // There must be a zero value for each tree level (except the root).
        // Create next zeroValue by following the hashing rule of the merkle sum tree
        zeroNode = createMiddleNode(zeroNode, zeroNode, this._hash);
      }
  
      // The zero root is the last zero value.
      this._root = zeroNode;
      
      // Freeze the array objects. It prevents unintentional changes.
      Object.freeze(this._zeroes);
      Object.freeze(this._entries);
      Object.freeze(this._nodes);

      // Insert the entries as leaves inside the tree
      for (let i = 0; i < this._entries.length; i++) {
        this.insert(this._entries[i]);
      }
    }

  /**
   * Returns the root hash of the tree.
   * @returns Root hash.
   */
  public get root(): Node {
    return this._root;
  }

  /**
   * Returns the depth of the tree.
   * @returns Tree depth.
   */
  public get depth(): number {
    return this._depth;
  }

  /**
   * Returns the leaves of the tree.
   * @returns List of leaves.
   */
  public get leaves(): Node[] {
    return this._nodes[0].slice();
  }

  /**
   * Returns the zeroes nodes of the tree.
   * @returns List of zeroes.
   */
  public get zeroes(): Node[] {
    return this._zeroes;
  }

  /**
   * Returns the number of children for each node.
   * @returns Number of children per node.
   */
  public get arity(): number {
    return this._arity;
  }

  /**
   * Returns the entries of the tree.
   * @returns List of entries.
   */
    public get entries(): Entry[] {
      return this._entries;
    }

  // /**
  //  * Returns the index of a leaf. If the leaf does not exist it returns -1.
  //  * @param entryValue value of the entry of the queried leaf.
  //  * @param entrySum sum of the entry of the queried leaf.
  //  * @returns Index of the leaf.
  //  */
  // public indexOf(entryValue: bigint, entrySum: bigint): number {
  //   const leaf: Node = createLeafNodeFromEntry(entryValue, entrySum, this._hash);
  //   return _indexOf(leaf, this._nodes);
  // }

  /**
   * Inserts a new leaf in the tree.
   * @param entry entry to be added to the tree.
   */
  public insert(entry : Entry) {
    const leaf: Node = createLeafNodeFromEntry(entry, this._hash);
    this._root = _insert(leaf, this.depth, this.arity, this._nodes, this.zeroes, this._hash);
  }

  /**
   * Creates a proof of membership. The MerkleProof contains the path from the leaf to the root.
   * @param index Index of the proof's leaf.
   * @returns MerkleProof object.
   */
  public createProof(index: number): MerkleProof {
    return _createProof(index, this.depth, this.arity, this._nodes, this.zeroes, this.root);
  }

  /**
   * Verifies a proof and return true or false.
   * It verifies that a leaf is included in the tree and that the sum computed from the leaf to the root is equal to the total sum of the tree.
   * @param proof Proof to be verified.
   * @returns True or false.
   */
  public verifyProof(proof: MerkleProof): boolean {
    return _verifyProof(proof, this._hash);
  }

}
