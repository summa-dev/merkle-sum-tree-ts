import { IncrementalMerkleSumTree } from "../src"

describe("Incremental Merkle Tree", () => {

    it("should create a new tree", () => {

        const pathToCsv = "test/entries/entry1.csv"
        const tree = new IncrementalMerkleSumTree(pathToCsv)

        // return entries 
        console.log(JSON.stringify(tree, (_, v) => (typeof v === "bigint" ? v.toString() : v)))


        // try to generate a proof for a value 
        const proof = tree.createProof(1)

        console.log("proof: ", proof)


        // verify the proof
        const isValid = tree.verifyProof(proof)

        console.log("isValid: ", isValid)

        expect(tree).toBeTruthy()
    })


})