import { poseidon } from "circomlibjs"
import { IncrementalMerkleSumTree, MerkleProof } from "../src"
import { Entry } from "../src/types"

describe("Incremental Merkle Tree", () => {

    let tree: IncrementalMerkleSumTree

    beforeEach(() => {
        const pathToCsv = "test/entries/entry-16-valid.csv"
        tree = new IncrementalMerkleSumTree(pathToCsv)
    })

    it("Should not initialize a tree with wrong parameters", () => {
        const fun1 = () => new IncrementalMerkleSumTree(undefined as any)
        const fun2 = () => new IncrementalMerkleSumTree(1 as any)

        expect(fun1).toThrow("Parameter 'path' is not defined")
        expect(fun2).toThrow("Parameter 'path' is none of these types: string")
    })

    it("Should initialize a tree with the right parameters", () => {
        // Check the tree
        expect(tree.depth).toEqual(4)
        expect(tree.root.sum).toEqual(BigInt(84359))
    })

    it("Should not allow to initialize a tree with at least a negative balance", () => {

        // build invalid tree
        const pathToInvalidCsv = "test/entries/entry-16-neg-balance.csv"
        const fun = () => new IncrementalMerkleSumTree(pathToInvalidCsv)

        expect(fun).toThrow("entrySum cant be negative")

    })


    it("Should generate different root hashes when changing the entry order", () => {

        const pathToCsvWithSwitchedOrder = "test/entries/entry-16-valid-switched-order.csv"

        let tree2 = new IncrementalMerkleSumTree(pathToCsvWithSwitchedOrder)

        expect(tree.root.hash).not.toEqual(tree2.root.hash)
    })

    it("Shouldn't allow to generate a tree starting from a csv which number of entries are not a power of 2", () => {

        const pathToCsvWithWrongNumberOfEntries1 = "test/entries/entry-17-invalid.csv"
        const pathToCsvWithWrongNumberOfEntries2 = "test/entries/entry-15-invalid.csv"

        const fun1 = () => new IncrementalMerkleSumTree(pathToCsvWithWrongNumberOfEntries1)
        const fun2 = () => new IncrementalMerkleSumTree(pathToCsvWithWrongNumberOfEntries2)

        expect(fun1).toThrow("The number of entries must be a power of 2")
        expect(fun2).toThrow("The number of entries must be a power of 2")
    })

    it("Should generate a tree which depth is log2 of the number of entries", () => {

        const pathToCsvWith32Entries = "test/entries/entry-32-valid.csv"

        const tree2 = new IncrementalMerkleSumTree(pathToCsvWith32Entries)

        expect(tree2.depth).toEqual(5)
    })

    it("Should generate a tree with the correct total sum starting from 32 leaves"), () => {

    }

    it("Should generate a tree with the correct total sum starting from 64 leaves"), () => {

    }

    it("Should generate a tree with the correct total sum starting from 128 leaves"), () => {

    }

    it("Should generate a tree with the correct total sum starting from 256 leaves"), () => {

    }

    it("Should generate a tree with the correct total sum starting from 512 leaves"), () => {

    }

    it("Should generate a tree with the correct total sum starting from 262144 leaves = 2^18"), () => {

    }


            // it(`Should insert ${numberOfLeaves} leaves`, () => {

            //     let sum = BigInt(0)

            //     for (let i = 0; i < numberOfLeaves; i += 1) {
            //         tree.insert(BigInt(i), BigInt(i + 1))
            //         expect(tree.leaves).toHaveLength(i + 1)
            //         // The leaves should be initiated with the correct value and the correct sum
            //         expect(tree.leaves[i].hash).toEqual(poseidon([BigInt(i), BigInt(i + 1)]))
            //         expect(tree.leaves[i].sum).toEqual(BigInt(i + 1))
            //         sum += BigInt(i + 1)
            //         // The root should store the correct sum
            //         expect(tree.root.sum).toEqual(sum)
            //         // IndexOf should return the correct index
            //         expect(tree.indexOf(BigInt(i), BigInt(i+1))).toEqual(i)
            //     }
            // })

            // it("Should not update a leaf with a negative sum", () => {
            //     const fun = () => tree.update(0, BigInt(0), BigInt(-1))
            //     expect(fun).toThrow("entrySum cant be negative")
            // })

            // it("Should create valid proofs for each inserted entry", () => {

            //     for (let i = 0; i < numberOfLeaves; i += 1) {
            //         tree.insert(BigInt(i), BigInt(i + 1))
            //         const proof : MerkleProof = tree.createProof(i)
            //         expect(proof.siblingsHashes).toHaveLength(depth)
            //         expect(proof.leafHash).toEqual(tree.leaves[i].hash)
            //         expect(proof.leafSum).toEqual(tree.leaves[i].sum)
            //         expect(proof.rootHash).toEqual(tree.root.hash)

            //     }
            // })


    it("Should return the index of an entry that exist", () => {

        const entry : Entry = {
            username : "gAdsIaKy",
            salt : BigInt(1819),
            balance : BigInt(7534)
        }

        const index = tree.indexOf(entry)

        expect(index).toBe(0)
    })

    it("Should return -1 as index if the entry that doesn't exist", () => {
        
        const invalidEntry : Entry = {
            username : "gAdsIaKy",
            salt : BigInt(1389),
            balance : BigInt(7530)
        }
        const index = tree.indexOf(invalidEntry)

        expect(index).toBe(-1)

    })

            // it("Should create a valid proof with target sum", () => {

            //     tree.insert(BigInt(1), BigInt(1))
            //     tree.insert(BigInt(2), BigInt(2))   

            //     const proofWithTargetSum = tree.createProofWithTargetSum(1, BigInt(60))

            //     expect(proofWithTargetSum.targetSum).toEqual(BigInt(60))

            // })

            // it("Should not create any proof if the leaf does not exist", () => {

            //     // Add a single leaf to the tree
            //     tree.insert(BigInt(1), BigInt(1))

            //     // Query proof for a non existing leaf
            //     const fun = () => tree.createProof(3)

            //     expect(fun).toThrow("The leaf does not exist in this tree")
            // })

            // it("Should verify a valid proof for each entry", () => {
            //     for (let i = 0; i < numberOfLeaves; i += 1) {
            //         tree.insert(BigInt(i), BigInt(i + 1))
            //     }

            //     for (let i = 0; i < numberOfLeaves; i += 1) {
            //         const proof = tree.createProof(i)
            //         expect(tree.verifyProof(proof)).toBeTruthy()
            //     }
            // })
            
            // it("Shouldn't verify an invalid proof with a wrong leaf sum", () => {

            //     // Gen tree
            //     for (let i = 0; i < numberOfLeaves; i += 1) {
            //         tree.insert(BigInt(i), BigInt(i + 1))
            //     }

            //     const proof = tree.createProof(0)

            //     // add invalid leaf sum
            //     proof.leafSum = BigInt(0)

            //     expect(tree.verifyProof(proof)).toBeFalsy()

            // })

            // it("Shouldn't verify an invalid proof with a wrong leaf hash", () => {

            //     // Gen tree
            //     for (let i = 0; i < numberOfLeaves; i += 1) {
            //         tree.insert(BigInt(i), BigInt(i + 1))
            //     }

            //     const proof = tree.createProof(0)

            //     // add invalid leaf hash
            //     proof.leafHash = BigInt(7)

            //     expect(tree.verifyProof(proof)).toBeFalsy()

            // })

            // it("Shouldn't verify a proof against a wrong root hash", () => {

            //     // Gen tree
            //     for (let i = 0; i < numberOfLeaves; i += 1) {
            //         tree.insert(BigInt(i), BigInt(i + 1))
            //     }

            //     const proof = tree.createProof(0)

            //     // add invalid leaf hash
            //     proof.rootHash = BigInt(7)

            //     expect(tree.verifyProof(proof)).toBeFalsy()

            // })

            // it("Should verify a proof with target sum when target sum > tree sum", () => {

            //     tree.insert(BigInt(1), BigInt(1))
            //     tree.insert(BigInt(2), BigInt(2))
            //     tree.insert(BigInt(2), BigInt(5))   

            //     // tree sum is 8
            //     // target sum is 60

            //     const proofWithTargetSum = tree.createProofWithTargetSum(1, BigInt(60))

            //     expect(tree.verifyProofWithTargetSum(proofWithTargetSum)).toBeTruthy()

            // })

            // it("Should verify a proof with target sum when target sum = tree sum", () => {

            //     tree.insert(BigInt(1), BigInt(1))
            //     tree.insert(BigInt(2), BigInt(2))
            //     tree.insert(BigInt(2), BigInt(5))   

            //     // tree sum is 8
            //     // target sum is 8

            //     const proofWithTargetSum = tree.createProofWithTargetSum(1, BigInt(8))

            //     expect(tree.verifyProofWithTargetSum(proofWithTargetSum)).toBeTruthy()

            // })


            // it("Shouldn't verify a proof with target sum when target sum < tree sum", () => {

            //     tree.insert(BigInt(1), BigInt(1))
            //     tree.insert(BigInt(2), BigInt(2))
            //     tree.insert(BigInt(2), BigInt(5))   

            //     // tree sum is 8
            //     // target sum is 7
            //     const proofWithTargetSum = tree.createProofWithTargetSum(1, BigInt(7))

            //     expect(tree.verifyProofWithTargetSum(proofWithTargetSum)).toBeFalsy()

            // })
})