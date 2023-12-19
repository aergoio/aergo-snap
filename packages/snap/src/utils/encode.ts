import { base58check as scureBase58check } from '@scure/base';
import { sha256 } from '@noble/hashes/sha256';
import JSBI from 'jsbi';
import bs58 from './base58';

export type StringOrBuffer = string | Buffer | Uint8Array;
export type ByteEncoding = 'base58' | BufferEncoding;

export const ACCOUNT_NAME_LENGTH = 12;
export const systemAddresses = [
  'aergo.system',
  'aergo.name',
  'aergo.enterprise',
  'aergo.vault'
];

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
  for (let i = 0; i < uint8Array.length; i++) {
    const byte = uint8Array[i];
    hexWithout0x += `00${byte.toString(16)}`.slice(-2);
  }

  // 0x 접두사를 추가하여 완전한 Hex 문자열을 얻습니다.
  return `0x${hexWithout0x}`;
};

const isSystemName = (name: string): boolean => {
  return systemAddresses.indexOf(name) !== -1;
};

const decodeAddress = (encodedString: string): Uint8Array => {
  if (
    encodedString.length <= ACCOUNT_NAME_LENGTH ||
    isSystemName(encodedString)
  ) {
    return Buffer.from(encodedString);
  }

  const base58Check = scureBase58check(sha256);

  // Base58Check 디코딩을 시도합니다.
  const decodedArray = base58Check.decode(encodedString);

  // 디코딩이 성공하면, 0x42를 제거한 배열을 반환합니다.
  if (decodedArray && decodedArray.length > 0 && decodedArray[0] === 0x42) {
    return decodedArray.subarray(1);
  } else {
    throw new Error(`Invalid address format ${encodedString}`);
  }
};

const fromNumber = (d: number, length = 8): Uint8Array => {
  if (d >= Math.pow(2, length * 8)) {
    throw new Error('Number exeeds range');
  }
  const arr = new Uint8Array(length);
  for (let i = 0, j = 1; i < 8; i++, j *= 0x100) {
    arr[i] = (d / j) & 0xff;
  }
  return arr;
};

const fromBigInt = (d: JSBI | string | number) => {
  return fromHexString(JSBI.BigInt(d).toString(16));
};

const fromHexString = (hexString: string) => {
  if (hexString.length === 0) return Uint8Array.from([]);
  if (hexString.length % 2 === 1) hexString = '0' + hexString;
  const match = hexString.match(/.{1,2}/g);
  if (!match) throw new Error('cannot parse string as hex');
  return new Uint8Array(match.map((byte) => parseInt(byte, 16)));
};

const bufferOrB58 = (input?: Uint8Array | string) => {
  if (typeof input === 'string') {
    return decodeToBytes(input);
  }
  if (typeof input === 'undefined') {
    return new Uint8Array([]);
  }
  return input;
};

const decodeToBytes = (val: StringOrBuffer, enc: ByteEncoding = 'base58') => {
  if (typeof val === 'string') {
    if (enc === 'base58') {
      return bs58.decode(val);
    }
    return Buffer.from(val, enc);
  }
  return Buffer.from(val);
};

const encodeBuffer = (
  val: Buffer | Uint8Array,
  enc: ByteEncoding = 'base58'
) => {
  if (enc === 'base58') {
    return bs58.encode(Buffer.from(val));
  }
  return Buffer.from(val).toString(enc);
};

export {
  encodeAddress,
  decodeAddress,
  hexToUint8Array,
  uint8ArrayToHex,
  fromNumber,
  fromBigInt,
  fromHexString,
  bufferOrB58,
  decodeToBytes,
  encodeBuffer
};
