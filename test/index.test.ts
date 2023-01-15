import { IncrementalMerkleSumTree, MerkleProof } from "../src"
import { Entry } from "../src/types"
import parseCsv from "../src/utils/csv"

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

    // // let numberOfEntries = [32, 64, 128, 256, 512, 262144]
    // let numberOfEntries = [32, 64, 128, 512, 262144]
    // let expectedSum = [166540, 323523, 644795, 2512011, 1312081244]

    // for (let i = 0; i < numberOfEntries.length; i += 1) {

    //     it(`Should generate a tree with the correct total sum starting from ${numberOfEntries[i]} leaves`, () => {

    //         const pathTocsv = `test/entries/entry-${numberOfEntries[i]}-valid.csv`

    //         const tree2 = new IncrementalMerkleSumTree(pathTocsv)

    //         expect(tree2.root.sum).toEqual(BigInt(expectedSum[i]))
    //     })
    // }

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

    it("Should create valid proofs for each inserted entry and verify it", () => {

        // extract the entries from the csv file 
        const pathToCsv = "test/entries/entry-16-valid.csv"
        const entries = parseCsv(pathToCsv)

        // loop over each entry and generate a proof for it
        for (let i = 0; i < entries.length; i += 1) {
            const proof : MerkleProof = tree.createProof(i)
            expect(proof.siblingsHashes).toHaveLength(tree.depth)
            expect(proof.leafHash).toEqual(tree.leaves[i].hash)
            expect(proof.leafSum).toEqual(tree.leaves[i].sum)
            expect(proof.rootHash).toEqual(tree.root.hash)
            expect(tree.verifyProof(proof)).toBeTruthy()
        }

        
    })

    it("Should not create a proof if the entry does not exist", () => {

        const invalidEntry : Entry = {
            username : "gAdsIaKy",
            salt : BigInt(1389),
            balance : BigInt(7530)
        }

        const indexOf = tree.indexOf(invalidEntry)

        // Query proof for a non existing leaf
        const fun = () => tree.createProof(indexOf)

        expect(fun).toThrow("The leaf does not exist in this tree")
    })

            
    it("Shouldn't verify a proof with a wrong leaf sum", () => {

        const proof : MerkleProof = tree.createProof(0)

        // add invalid leaf sum
        proof.leafSum = BigInt(0)

        expect(tree.verifyProof(proof)).toBeFalsy()

    })

    it("Shouldn't verify a proof with a wrong leaf hash", () => {

        const proof : MerkleProof = tree.createProof(0)

        // add invalid leaf hash
        proof.leafHash = BigInt(7)

        expect(tree.verifyProof(proof)).toBeFalsy()

    })

    it("Shouldn't verify a proof against a wrong root hash", () => {

        const proof : MerkleProof = tree.createProof(0)

        // add invalid leaf hash
        proof.rootHash = BigInt(7)

        expect(tree.verifyProof(proof)).toBeFalsy()

    })

})