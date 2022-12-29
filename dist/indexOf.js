"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var checkParameter_1 = require("./checkParameter");
function indexOf(leaf, nodes) {
    (0, checkParameter_1.default)(leaf, "leaf", "number", "string", "bigint");
    return nodes[0].indexOf(leaf);
}
exports.default = indexOf;
