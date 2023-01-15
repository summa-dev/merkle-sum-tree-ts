import { IncrementalMerkleSumTree } from "../src"

describe("Incremental Merkle Tree", () => {

    it("should create a new tree", () => {

        const pathToCsv = "test/entries/entry1.csv"
        const tree = new IncrementalMerkleSumTree(pathToCsv, 4)

        // return entries 
        console.log("entries", tree.entries)

        // return root 
        console.log("root sum", tree.root.sum)

        // return zeroes 
        console.log("zeroes", tree.zeroes)

        // return leaves (only 4 of them are returned)
        console.log("leaves", tree.leaves)

        expect(tree).toBeTruthy()
    })


})