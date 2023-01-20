import { Entry } from './types';
export default class Utils {
    /**
     * Takes the path to a csv file as input and return its representation as array of Entries
     * @param path string of the path to the csv file
     * @return array of the entries
     */
    static parseCsv(path: string): Entry[];
    /**
     * Transform a username into its utf8 bytes representation, convert it to BigInt and return it
     * @param username the string of the username to be converted
     * @return BigInt representation of the username
     */
    static parseUsernameToBigInt(username: string): bigint;
    /**
     * Transform a BigInt into its utf8 bytes representation, convert it to a username and return it.
     * @param bigIntUsername the bigInt to be converted
     * @return string representation of the username
     */
    static parseBigIntToUsername(bigIntUsername: bigint): string;
}