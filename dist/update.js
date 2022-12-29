"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var checkParameter_1 = require("./checkParameter");
function update(index, value, depth, arity, nodes, zeroes, hash) {
    (0, checkParameter_1.default)(index, "index", "number");
    if (index < 0 || index >= nodes[0].length) {
        throw new Error("The leaf does not exist in this tree");
    }
    var node = value;
    for (var level = 0; level < depth; level += 1) {
        var position = index % arity;
        var levelStartIndex = index - position;
        var levelEndIndex = levelStartIndex + arity;
        var children = [];
        nodes[level][index] = node;
        for (var i = levelStartIndex; i < levelEndIndex; i += 1) {
            if (i < nodes[level].length) {
                children.push(nodes[level][i]);
            }
            else {
                children.push(zeroes[level]);
            }
        }
        node = hash(children);
        index = Math.floor(index / arity);
    }
    return node;
}
exports.default = update;
