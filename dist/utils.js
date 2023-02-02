"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var entry_1 = require("./entry");
var Utils = /** @class */ (function () {
    function Utils() {
    }
    /**
     * Takes the path to a csv file as input and return its representation as array of Entries
     * @param path string of the path to the csv file
     * @return array of the entries
     */
    Utils.parseCsvToEntries = function (path) {
        var _this = this;
        var fs = require('fs');
        // Read the CSV file
        var file = fs.readFileSync(path, 'utf8');
        // Split the file into lines
        var lines = file.split('\n');
        // Split each line into values
        var values = lines.map(function (line) { return line.split(','); });
        // remove the first line (header)
        values.shift();
        // create an Entry for each line
        // remove \r from the balance
        var entries = values.map(function (entry) {
            if (isNaN(entry[1])) {
                throw new Error('Balance must be a number');
            }
            return new entry_1.default(_this.parseUsername(entry[0]), BigInt(entry[1]));
        });
        return entries;
    };
    /**
     * Transform a username into its utf8 bytes representation, convert it to BigInt and return it
     * @param username the string of the username to be converted
     * @return BigInt representation of the username
     */
    Utils.parseUsername = function (username) {
        var encoder = new TextEncoder();
        var utf8bytes = encoder.encode(username);
        var bigIntNumber = BigInt('0x' + utf8bytes.reduce(function (str, byte) { return str + byte.toString(16).padStart(2, '0'); }, ''));
        return bigIntNumber;
    };
    /**
     * Transform a BigInt into its utf8 bytes representation, convert it to a username and return it.
     * @param bigIntUsername the bigInt to be converted
     * @return string representation of the username
     */
    Utils.stringifyUsername = function (bigIntUsername) {
        var hexString = bigIntUsername.toString(16);
        var hexArray = hexString.match(/.{2}/g) || [];
        var byteArray = hexArray.map(function (byte) { return parseInt(byte, 16); });
        var decoder = new TextDecoder();
        return decoder.decode(Uint8Array.from(byteArray));
    };
    return Utils;
}());
exports.default = Utils;
