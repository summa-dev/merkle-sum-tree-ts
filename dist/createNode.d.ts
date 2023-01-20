import { HashFunction, Node, Entry } from './types';
export declare function createLeafNodeFromEntry(entry: Entry, hash: HashFunction): Node;
export declare function createMiddleNode(childL: Node, childR: Node, hash: HashFunction): Node;
