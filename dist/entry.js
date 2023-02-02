"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var circomlibjs_1 = require("circomlibjs");
var utils_1 = require("./utils");
var Entry = /** @class */ (function () {
    function Entry(usernameToBigInt, balance) {
        if (balance < BigInt(0)) {
            throw new Error('entry balance cant be negative');
        }
        this._usernameToBigInt = usernameToBigInt;
        this._balance = balance;
        this._username = utils_1.default.stringifyUsername(usernameToBigInt);
        // Freeze the object to prevent any changes
        Object.freeze(this);
    }
    Entry.prototype.computeLeaf = function () {
        var hashPreimage = [this._usernameToBigInt, this._balance];
        var leaf = { hash: (0, circomlibjs_1.poseidon)(hashPreimage), sum: this._balance };
        return leaf;
    };
    Object.defineProperty(Entry.prototype, "balance", {
        get: function () {
            return this._balance;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Entry.prototype, "usernameToBigInt", {
        get: function () {
            return this._usernameToBigInt;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Entry.prototype, "username", {
        get: function () {
            return this._username;
        },
        enumerable: false,
        configurable: true
    });
    // Export a constant
    Entry.ZERO_ENTRY = new Entry(BigInt(0), BigInt(0));
    return Entry;
}());
exports.default = Entry;
