"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var checkParameter_1 = require("./checkParameter");
function createProof(index, depth, arity, nodes, zeroes, root) {
    (0, checkParameter_1.default)(index, "index", "number");
    if (index < 0 || index >= nodes[0].length) {
        throw new Error("The leaf does not exist in this tree");
    }
    var siblings = [];
    var pathIndices = [];
    var leafIndex = index;
    for (var level = 0; level < depth; level += 1) {
        var position = index % arity;
        var levelStartIndex = index - position;
        var levelEndIndex = levelStartIndex + arity;
        pathIndices[level] = position;
        siblings[level] = [];
        for (var i = levelStartIndex; i < levelEndIndex; i += 1) {
            if (i !== index) {
                if (i < nodes[level].length) {
                    siblings[level].push(nodes[level][i]);
                }
                else {
                    siblings[level].push(zeroes[level]);
                }
            }
        }
        index = Math.floor(index / arity);
    }
    return { root: root, leaf: nodes[0][leafIndex], pathIndices: pathIndices, siblings: siblings };
}
exports.default = createProof;
