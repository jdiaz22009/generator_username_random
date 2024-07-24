export interface CryptoModule {
  getRandomValues?: (array: Uint8Array) => Uint8Array;
  randomFillSync?: (buffer: Uint8Array) => Uint8Array;
}

export const getCryptoModule = (): CryptoModule => {
  let cryptoModule: CryptoModule | null = null;

  if (
    typeof window !== 'undefined' &&
    (window.crypto || (window as any).msCrypto)
  ) {
    cryptoModule = window.crypto || (window as any).msCrypto;
  } else if (typeof require === 'function') {
    try {
      cryptoModule = require('crypto');
    } catch (error) {
      console.error('Crypto module is not available.', error);
    }
  }

  if (!cryptoModule) {
    throw new Error('Crypto module is not available.');
  }

  return cryptoModule;
};
