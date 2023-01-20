// import checkParameter from './checkParameter';
import { createMiddleNode } from './createNode';
import checkParameter from './checkParameter';
import { HashFunction, MerkleProof, Node} from './types';

export default function verifyProof(proof: MerkleProof, hash: HashFunction): boolean {
  checkParameter(proof, 'proof', 'object');
  checkParameter(proof.rootHash, 'proof.rootHash', 'bigint');
  checkParameter(proof.leafUsername, 'proof.leafUsername', 'bigint');
  checkParameter(proof.leafSum, 'proof.leafSum', 'bigint');
  checkParameter(proof.siblingsHashes, 'proof.siblingsHashes', 'object');
  checkParameter(proof.siblingsSums, 'proof.siblingsSums', 'object');
  checkParameter(proof.pathIndices, 'proof.pathElements', 'object');

  let sum = proof.leafSum;

  let node : Node = {hash: hash([proof.leafUsername, proof.leafSum]), sum};

  for (let i = 0; i < proof.siblingsHashes.length; i += 1) {
    const siblingNode = {hash: proof.siblingsHashes[i], sum: proof.siblingsSums[i]};

    if (proof.pathIndices[i] === 0) {
      node = createMiddleNode(node, siblingNode, hash);
    } else {
      node = createMiddleNode(siblingNode, node, hash);
    }

    sum += siblingNode.sum;
  }

  return proof.rootHash === node.hash && sum === node.sum;
}
