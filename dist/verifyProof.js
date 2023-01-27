"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createNode_1 = require("./createNode");
function verifyProof(proof, hash) {
    var sum = proof.balance;
    var node = { hash: hash([proof.username, proof.balance]), sum: sum };
    for (var i = 0; i < proof.siblingsHashes.length; i += 1) {
        var siblingNode = { hash: proof.siblingsHashes[i], sum: proof.siblingsSums[i] };
        if (proof.pathIndices[i] === 0) {
            node = (0, createNode_1.createMiddleNode)(node, siblingNode, hash);
        }
        else {
            node = (0, createNode_1.createMiddleNode)(siblingNode, node, hash);
        }
        sum += siblingNode.sum;
    }
    return proof.rootHash === node.hash && sum === node.sum;
}
exports.default = verifyProof;
