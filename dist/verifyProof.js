"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createMiddleNode_1 = require("./createMiddleNode");
function verifyProof(proof, hash) {
    var sum = proof.entry.balance;
    var node = proof.entry.computeLeaf();
    for (var i = 0; i < proof.siblingsHashes.length; i += 1) {
        var siblingNode = { hash: proof.siblingsHashes[i], sum: proof.siblingsSums[i] };
        if (proof.pathIndices[i] === 0) {
            node = (0, createMiddleNode_1.createMiddleNode)(node, siblingNode, hash);
        }
        else {
            node = (0, createMiddleNode_1.createMiddleNode)(siblingNode, node, hash);
        }
        sum += siblingNode.sum;
    }
    return proof.rootHash === node.hash && sum === node.sum;
}
exports.default = verifyProof;
