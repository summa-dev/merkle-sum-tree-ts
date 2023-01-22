"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import checkParameter from './checkParameter';
var createNode_1 = require("./createNode");
var checkParameter_1 = require("./checkParameter");
function verifyProof(proof, hash) {
    (0, checkParameter_1.default)(proof, 'proof', 'object');
    (0, checkParameter_1.default)(proof.rootHash, 'proof.rootHash', 'bigint');
    (0, checkParameter_1.default)(proof.username, 'proof.leafUsername', 'bigint');
    (0, checkParameter_1.default)(proof.balance, 'proof.leafSum', 'bigint');
    (0, checkParameter_1.default)(proof.siblingsHashes, 'proof.siblingsHashes', 'object');
    (0, checkParameter_1.default)(proof.siblingsSums, 'proof.siblingsSums', 'object');
    (0, checkParameter_1.default)(proof.pathIndices, 'proof.pathElements', 'object');
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
