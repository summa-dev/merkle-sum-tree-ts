"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var checkParameter_1 = require("./checkParameter");
var createNode_1 = require("./createNode");
var circomlibjs_1 = require("circomlibjs");
var createProof_1 = require("./createProof");
var build_1 = require("./build");
var indexOf_1 = require("./indexOf");
var utils_1 = require("./utils");
var verifyProof_1 = require("./verifyProof");
/**
 * A Merkle Sum Tree is a binary Merkle Tree with the following properties:
 * - Each entry of a Merkle Sum Tree is a pair of a value and a sum.
 * - Each Leaf Node contains a hash and a sum. The hash is equal to H(value, sum). The sum is equal to the sum itself.
 * - Each Middle Node contains a hash and a sum. The hash is equal to H(LeftChild.hash, LeftChild.sum, RightChild.hash, RightChild.sum). The sum is equal to the sum of the sums of its children.
 * - The Root Node represents the committed state of the Tree and contains the sum of all the entries' sums.
 * The IncrementalMerkleSumTree class is a TypeScript implementation of Incremental Merkle Sum tree and it
 * provides all the functions to create efficient trees and to generate and verify proofs of membership.
 */
var IncrementalMerkleSumTree = /** @class */ (function () {
    /**
     * Initializes the tree with the csv file containing the entries of the tree.
     * @param path path to the csv file storing the entries.
     */
    function IncrementalMerkleSumTree(path) {
        (0, checkParameter_1.default)(path, 'path', 'string');
        // Initialize the attributes.
        this._hash = circomlibjs_1.poseidon;
        this._nodes = [];
        this._arity = 2;
        this._entries = utils_1.default.parseCsv(path);
        // get the depth of the tree from the log base 2 of the number of entries rounded to the next integer
        this._depth = Math.ceil(Math.log2(this._entries.length));
        if (this._depth < 1 || this._depth > IncrementalMerkleSumTree.maxDepth) {
            throw new Error('The tree depth must be between 1 and 32');
        }
        // Build the tree
        this._root = this._build(this._entries);
        // Freeze the entries. It prevents unintentional changes.
        Object.freeze(this._entries);
        // Freeze the tree. It prevents unintentional changes.
        Object.freeze(this._root);
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
    Object.defineProperty(IncrementalMerkleSumTree.prototype, "entries", {
        /**
         * Returns the entries of the tree.
         * @returns List of entries.
         */
        get: function () {
            return this._entries;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns the index of a leaf. If the leaf does not exist it returns -1.
     * @param entry value of the entry of the queried leaf.
     * @returns Index of the leaf.
     */
    IncrementalMerkleSumTree.prototype.indexOf = function (entry) {
        var leaf = (0, createNode_1.createLeafNodeFromEntry)(entry, this._hash);
        return (0, indexOf_1.default)(leaf, this._nodes);
    };
    /**
     * Build the merkle tree from a list of entries.
     * @param entries array of the entries to be added to the tree.
     */
    IncrementalMerkleSumTree.prototype._build = function (entries) {
        return (0, build_1.default)(entries, this._depth, this._nodes, this._hash);
    };
    /**
     * Creates a proof of membership. The MerkleProof contains the path from the leaf to the root.
     * @param index Index of the proof's leaf.
     * @returns MerkleProof object.
     */
    IncrementalMerkleSumTree.prototype.createProof = function (index) {
        return (0, createProof_1.default)(index, this.entries, this.depth, this.arity, this._nodes, this.root);
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
    IncrementalMerkleSumTree.maxDepth = 32;
    return IncrementalMerkleSumTree;
}());
exports.default = IncrementalMerkleSumTree;
