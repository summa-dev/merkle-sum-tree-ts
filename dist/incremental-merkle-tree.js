"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var checkParameter_1 = require("./checkParameter");
var createNode_1 = require("./createNode");
var createProof_1 = require("./createProof");
var createProofWithTargetSum_1 = require("./createProofWithTargetSum");
var indexOf_1 = require("./indexOf");
var insert_1 = require("./insert");
var update_1 = require("./update");
var verifyProof_1 = require("./verifyProof");
var verifyProofWithTargetSum_1 = require("./verifyProofWithTargetSum");
/**
 * A Merkle tree is a tree in which every leaf node is labelled with the cryptographic hash of a
 * data block, and every non-leaf node is labelled with the cryptographic hash of the labels of its child nodes.
 * It allows efficient and secure verification of the contents of large data structures.
 * The IncrementalMerkleSumTree class is a TypeScript implementation of Incremental Merkle Sum tree and it
 * provides all the functions to create efficient trees and to generate and verify proofs of membership.
 */
var IncrementalMerkleSumTree = /** @class */ (function () {
    /**
     * Initializes the tree with the hash function, the depth.
     * @param hash Hash function.
     * @param depth Tree depth.
     */
    function IncrementalMerkleSumTree(hash, depth) {
        (0, checkParameter_1.default)(hash, 'hash', 'function');
        (0, checkParameter_1.default)(depth, 'depth', 'number');
        // Init zeroNode
        var zeroNode = (0, createNode_1.createLeafNodeFromEntry)(BigInt(0), BigInt(0), hash);
        var arity = 2;
        (0, checkParameter_1.default)(arity, 'arity', 'number');
        if (depth < 1 || depth > IncrementalMerkleSumTree.maxDepth) {
            throw new Error('The tree depth must be between 1 and 32');
        }
        // Initialize the attributes.
        this._hash = hash;
        this._depth = depth;
        this._zeroes = [];
        this._nodes = [];
        this._arity = arity;
        for (var i = 0; i < depth; i += 1) {
            this._zeroes.push(zeroNode);
            this._nodes[i] = [];
            // There must be a zero value for each tree level (except the root).
            // Create next zeroValue by following the hashing rule of the merkle sum tree
            zeroNode = (0, createNode_1.createMiddleNode)(zeroNode, zeroNode, hash);
        }
        // The zero root is the last zero value.
        this._root = zeroNode;
        // Freeze the array objects. It prevents unintentional changes.
        Object.freeze(this._zeroes);
        Object.freeze(this._nodes);
    }
    Object.defineProperty(IncrementalMerkleSumTree.prototype, "root", {
        /**
         * Returns the root hash of the tree.
         * @returns Root hash.
         */
        get: function () {
            return this._root;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IncrementalMerkleSumTree.prototype, "depth", {
        /**
         * Returns the depth of the tree.
         * @returns Tree depth.
         */
        get: function () {
            return this._depth;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IncrementalMerkleSumTree.prototype, "leaves", {
        /**
         * Returns the leaves of the tree.
         * @returns List of leaves.
         */
        get: function () {
            return this._nodes[0].slice();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IncrementalMerkleSumTree.prototype, "zeroes", {
        /**
         * Returns the zeroes nodes of the tree.
         * @returns List of zeroes.
         */
        get: function () {
            return this._zeroes;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IncrementalMerkleSumTree.prototype, "arity", {
        /**
         * Returns the number of children for each node.
         * @returns Number of children per node.
         */
        get: function () {
            return this._arity;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns the index of a leaf. If the leaf does not exist it returns -1.
     * @param entryValue value of the entry of the queried leaf.
     * @param entrySum sum of the entry of the queried leaf.
     * @returns Index of the leaf.
     */
    IncrementalMerkleSumTree.prototype.indexOf = function (entryValue, entrySum) {
        var leaf = (0, createNode_1.createLeafNodeFromEntry)(entryValue, entrySum, this._hash);
        return (0, indexOf_1.default)(leaf, this._nodes);
    };
    /**
     * Inserts a new leaf in the tree.
     * @param entryValue value of the entry to be added to the tree.
     * @param entrySum sum of the entry to be added to the tree.
     */
    IncrementalMerkleSumTree.prototype.insert = function (entryValue, entrySum) {
        var leaf = (0, createNode_1.createLeafNodeFromEntry)(entryValue, entrySum, this._hash);
        this._root = (0, insert_1.default)(leaf, this.depth, this.arity, this._nodes, this.zeroes, this._hash);
    };
    /**
     * Deletes a leaf from the tree. It does not remove the leaf from
     * the data structure. It set the leaf to be deleted to a zero value.
     * @param index Index of the leaf to be deleted.
     */
    IncrementalMerkleSumTree.prototype.delete = function (index) {
        this._root = (0, update_1.default)(index, this.zeroes[0], this.depth, this.arity, this._nodes, this.zeroes, this._hash);
    };
    /**
     * Updates a leaf in the tree.
     * @param index Index of the leaf to be updated.
     * @param newEntryValue New value of the entry to be updated.
     * @param newEntrySum New sum of the entry to be updated.
     */
    IncrementalMerkleSumTree.prototype.update = function (index, newEntryValue, newEntrySum) {
        var newLeaf = (0, createNode_1.createLeafNodeFromEntry)(newEntryValue, newEntrySum, this._hash);
        this._root = (0, update_1.default)(index, newLeaf, this.depth, this.arity, this._nodes, this.zeroes, this._hash);
    };
    /**
     * Creates a proof of membership. The MerkleProof contains the path from the leaf to the root.
     * @param index Index of the proof's leaf.
     * @returns MerkleProof object.
     */
    IncrementalMerkleSumTree.prototype.createProof = function (index) {
        return (0, createProof_1.default)(index, this.depth, this.arity, this._nodes, this.zeroes, this.root);
    };
    /**
     * Creates a proof of membership with target Sum. The MerkleProofWithTargetSum contains the path from the leaf to the root and the target sum of the tree.
     * @param index Index of the proof's leaf.
     * @param targetSum value which the tree sum should be less or equal than.
     * @returns Proof object.
     */
    IncrementalMerkleSumTree.prototype.createProofWithTargetSum = function (index, targetSum) {
        return (0, createProofWithTargetSum_1.default)(index, targetSum, this.depth, this.arity, this._nodes, this.zeroes, this.root);
    };
    /**
     * Verifies a proof and return true or false.
     * It verifies that a leaf is included in the tree and that the sum computed from the leaf to the root is equal to the total sum of the tree.
     * @param proof Proof to be verified.
     * @returns True or false.
     */
    IncrementalMerkleSumTree.prototype.verifyProof = function (proof) {
        return (0, verifyProof_1.default)(proof, this._hash);
    };
    /**
     * Verifies a proofWithTargetSum and return true or false.
     * In addition to the verifyProof, it verifies that the sum of the tree is less or equal to the target sum.
     * @param proof Proof to be verified.
     * @returns True or false.
     */
    IncrementalMerkleSumTree.prototype.verifyProofWithTargetSum = function (merkleProofWithTargetSum) {
        return (0, verifyProofWithTargetSum_1.default)(merkleProofWithTargetSum, this._hash);
    };
    IncrementalMerkleSumTree.maxDepth = 32;
    return IncrementalMerkleSumTree;
}());
exports.default = IncrementalMerkleSumTree;
