import { base58check as scureBase58check } from '@scure/base';
import { sha256 } from '@noble/hashes/sha256';

export const encodeAddress = (byteArray: Uint8Array): string => {
  const base58Check = scureBase58check(sha256);

  return base58Check.encode(byteArray);
};
// export const decodeBase58check = (value: string): Uint8Array => {
//   const base58Check = scureBase58check(sha256);

//   try {
//     return base58Check.decode(value);
//   } catch {
//     throw new Error(
//       `Invalid extended key: Value is not base58-encoded, or the checksum is invalid.`,
//     );
//   }
// };

// export function encodeAddress(byteArray: Uint8Array): string {
//   return `${base58check(byteArray))}`;
// }
