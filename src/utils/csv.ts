import { Entry } from '../types';
const fs = require('fs');

export default function parseCsv(path : string) : Entry[] {

  // Read the CSV file
  const file = fs.readFileSync(path, "utf8");

  // Split the file into lines
  const lines = file.split("\n");

  // Split each line into values
  const values = lines.map((line : any) => line.split(","));

  // remove the first line (header)
  values.shift();

  // create an Entry for each line
  // remove \r from the balance
  const entries : Entry[] = values.map((values : any) => {

    if (isNaN(values[1])) {
        throw new Error("Salt must be a number");
    }

    if (isNaN(values[2])) {
        throw new Error("Balance must be a number");
    }

    return {
        username: values[0],
        salt: BigInt(values[1]),
        balance: BigInt(values[2].replace("\r", "")),
    };
});

    return entries;
}