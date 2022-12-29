"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var checkParameter_1 = require("./checkParameter");
function verifyProof(proof, hash) {
    (0, checkParameter_1.default)(proof, "proof", "object");
    (0, checkParameter_1.default)(proof.root, "proof.root", "number", "string", "bigint");
    (0, checkParameter_1.default)(proof.leaf, "proof.leaf", "number", "string", "bigint");
    (0, checkParameter_1.default)(proof.siblings, "proof.siblings", "object");
    (0, checkParameter_1.default)(proof.pathIndices, "proof.pathElements", "object");
    var node = proof.leaf;
    for (var i = 0; i < proof.siblings.length; i += 1) {
        var children = proof.siblings[i].slice();
        children.splice(proof.pathIndices[i], 0, node);
        node = hash(children);
    }
    return proof.root === node;
}
exports.default = verifyProof;
