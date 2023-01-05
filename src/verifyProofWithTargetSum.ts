// import checkParameter from './checkParameter';
import { createMiddleNode } from './createNode';
import checkParameter from './checkParameter';
import { HashFunction, MerkleProofWithTargetSum } from './types';

export default function verifyProof(merkleProofWithTargetSum: MerkleProofWithTargetSum, hash: HashFunction): boolean {
  checkParameter(merkleProofWithTargetSum, 'merkleProofWithTargetSum', 'object');
  checkParameter(merkleProofWithTargetSum.rootHash, 'merkleProofWithTargetSum.rootHash', 'bigint');
  checkParameter(merkleProofWithTargetSum.targetSum, 'merkleProofWithTargetSum.targetSum', 'bigint');
  checkParameter(merkleProofWithTargetSum.leafHash, 'merkleProofWithTargetSum.leafHash', 'bigint');
  checkParameter(merkleProofWithTargetSum.leafSum, 'merkleProofWithTargetSum.leafSum', 'bigint');
  checkParameter(merkleProofWithTargetSum.siblingsHashes, 'merkleProofWithTargetSum.siblingsHashes', 'object');
  checkParameter(merkleProofWithTargetSum.siblingsSums, 'merkleProofWithTargetSum.siblingsSums', 'object');
  checkParameter(merkleProofWithTargetSum.pathIndices, 'merkleProofWithTargetSum.pathElements', 'object');

  let node = { hash: merkleProofWithTargetSum.leafHash, sum: merkleProofWithTargetSum.leafSum };

  let sum = merkleProofWithTargetSum.leafSum;

  for (let i = 0; i < merkleProofWithTargetSum.siblingsHashes.length; i += 1) {
    const siblingNode = {
      hash: merkleProofWithTargetSum.siblingsHashes[i],
      sum: merkleProofWithTargetSum.siblingsSums[i],
    };

    if (merkleProofWithTargetSum.pathIndices[i] === 0) {
      node = createMiddleNode(node, siblingNode, hash);
    } else {
      node = createMiddleNode(siblingNode, node, hash);
    }

    sum += siblingNode.sum;
  }

  return (
    merkleProofWithTargetSum.rootHash === node.hash &&
    sum === node.sum &&
    merkleProofWithTargetSum.targetSum >= node.sum
  );
}
