import { base58check as scureBase58check } from '@scure/base';
import { sha256 } from '@noble/hashes/sha256';

const encodeAddress = (byteArray: Uint8Array): string => {
  const base58Check = scureBase58check(sha256);
  // 새로운 값 (0x42)을 추가할 배열 생성
  const newArray = new Uint8Array(byteArray.length + 1);

  // 첫 번째 요소로 0x42 추가
  newArray[0] = 0x42;

  // 기존 배열의 요소를 새 배열로 복사
  newArray.set(byteArray, 1);

  return base58Check.encode(newArray);
};

const hexToUint8Array = function (hexString: string): Uint8Array {
  // 0x 접두사를 제거하고 나머지 Hex 문자열을 사용합니다.
  const hexWithout0x = hexString.slice(2);
  const bytes = new Uint8Array(hexWithout0x.length / 2);
  for (let i = 0; i < hexWithout0x.length; i += 2) {
    bytes[i / 2] = parseInt(hexWithout0x.substr(i, 2), 16);
  }
  return bytes;
};

const uint8ArrayToHex = function (uint8Array: Uint8Array): string {
  let hexWithout0x = '';
  for (const byte of uint8Array) {
    hexWithout0x += `00${byte.toString(16)}`.slice(-2);
  }
  // 0x 접두사를 추가하여 완전한 Hex 문자열을 얻습니다.
  return `0x${hexWithout0x}`;
};

export { encodeAddress, hexToUint8Array, uint8ArrayToHex };
