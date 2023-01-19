export function parseUsernameToBigInt(username:string) : bigint {

    const encoder = new TextEncoder();
    const utf8bytes = encoder.encode(username); 
    
    const bigIntNumber = BigInt("0x" + utf8bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), ''));

    return bigIntNumber;
}

export function parseBigIntToUsername(bigIntNumber: bigint) : string {
    const hexString = bigIntNumber.toString(16);
    const hexArray = hexString.match(/.{2}/g) || [];
    const byteArray = hexArray.map(byte => parseInt(byte, 16));

    const decoder = new TextDecoder();
    return decoder.decode(Uint8Array.from(byteArray));
}