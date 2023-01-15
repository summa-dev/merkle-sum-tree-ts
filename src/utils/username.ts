export default function parseUsername(username:string) : bigint {

    const encoder = new TextEncoder();
    const utf8bytes = encoder.encode(username); 
    
    const bigIntNumber = BigInt("0x" + utf8bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), ''));

    return bigIntNumber;
}