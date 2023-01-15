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
    return {
        username: values[0],
        salt: BigInt(values[1]),
        balance: BigInt(values[2].replace("\r", "")),
    };
});

    return entries;
}