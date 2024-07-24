import {validateUUID} from '../utils/regex';
import {CryptoModule, getCryptoModule} from '../lib/index';

export const validate_uuid = (uuid: unknown): boolean => {
  return typeof uuid === 'string' && validateUUID.test(uuid);
};

export const generate_uuid_v4 = (): string => {
  const cryptoModule: CryptoModule = getCryptoModule();

  const bytes = new Uint8Array(16);

  if (cryptoModule.getRandomValues) {
    cryptoModule.getRandomValues(bytes);
  } else if (cryptoModule.randomFillSync) {
    cryptoModule.randomFillSync(bytes);
  } else {
    throw new Error(
      'Crypto module does not support secure random number generation.',
    );
  }

  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const byteToHex: string[] = [];
  for (let i = 0; i < 256; ++i) {
    byteToHex[i] = (i + 0x100).toString(16).substr(1);
  }

  const uuid = (
    byteToHex[bytes[0]] +
    byteToHex[bytes[1]] +
    byteToHex[bytes[2]] +
    byteToHex[bytes[3]] +
    '-' +
    byteToHex[bytes[4]] +
    byteToHex[bytes[5]] +
    '-' +
    byteToHex[bytes[6]] +
    byteToHex[bytes[7]] +
    '-' +
    byteToHex[bytes[8]] +
    byteToHex[bytes[9]] +
    '-' +
    byteToHex[bytes[10]] +
    byteToHex[bytes[11]] +
    byteToHex[bytes[12]] +
    byteToHex[bytes[13]] +
    byteToHex[bytes[14]] +
    byteToHex[bytes[15]]
  ).toLowerCase();

  return uuid;
};
