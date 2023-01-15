import checkParameter from './checkParameter';
import { createLeafNodeFromEntry, createMiddleNode } from './createNode';
import { poseidon } from "circomlibjs"
import _createProof from './createProof';
import _indexOf from './indexOf';
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

export default class IncrementalMerkleSumTree {
  static readonly maxDepth = 32;
  private _root: Node;
  private readonly _nodes: Node[][];
  private readonly _hash: HashFunction;
  private readonly _depth: number;
  private readonly _arity: number;
  private readonly _entries: Entry[];

    /**
   * Initializes the tree with the csv file containing the entries of the tree.
   * @param path path to the csv file storing the entries.
   */
    constructor(path: string) {
      checkParameter(path, 'path', 'string');

      // Initialize the attributes.
      this._hash = poseidon;
      this._nodes = [];
      this._arity = 2;
      this._entries = _parseCsv(path);

      // get the depth of the tree from the log of the number of entries
      // if this is not an integer, then return an error 
      this._depth = Math.log2(this._entries.length)
      if (this._depth % 1 !== 0) {
        throw new Error('The number of entries must be a power of 2');
      }

      if (this._depth < 1 || this._depth > IncrementalMerkleSumTree.maxDepth) {
        throw new Error('The tree depth must be between 1 and 32');
      }
      
      // Freeze the entries. It prevents unintentional changes.
      Object.freeze(this._entries);

      // Build the tree
      this._root = this._build(this._entries);

      // Freeze the tree. It prevents unintentional changes.
      Object.freeze(this._root);
      Object.freeze(this._nodes);
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

  /**
   * Returns the index of a leaf. If the leaf does not exist it returns -1.
   * @param entry value of the entry of the queried leaf.
   * @returns Index of the leaf.
   */
  public indexOf(entry: Entry): number {
    const leaf: Node = createLeafNodeFromEntry(entry, this._hash);
    return _indexOf(leaf, this._nodes);
  }

  // [] add build tree function in a separate file 
  /**
   * Build the merkle tree from a list of entries.
   * @param entries array of the entries to be added to the tree.
   */
  _build(entries: Entry[]) {

    // range over each level of the tree
    for (let i = 0; i < this._depth; i++) {

      this._nodes[i] = [];

      // if level is 0, the nodes are the leaves, we need to create them from the entries
      if (i === 0) {
        for (let j = 0; j < entries.length; j++) {
          this._nodes[i].push(createLeafNodeFromEntry(entries[j], this._hash))
        }
      }

      // else, the nodes are the middle nodes, we need to create them from the previous level
      else {
        for (let j = 0; j < this._nodes[i-1].length; j+=2) {
          this._nodes[i].push(createMiddleNode(this._nodes[i-1][j], this._nodes[i-1][j+1], this._hash))
        }
      }
    }

    // return the root of the tree
    return createMiddleNode(this._nodes[this._depth-1][0], this._nodes[this._depth-1][1], this._hash);

  }



  // /**
  //  * Creates a proof of membership. The MerkleProof contains the path from the leaf to the root.
  //  * @param index Index of the proof's leaf.
  //  * @returns MerkleProof object.
  //  */
  // public createProof(index: number): MerkleProof {
  //   return _createProof(index, this.depth, this.arity, this._nodes, this.zeroes, this.root);
  // }

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
