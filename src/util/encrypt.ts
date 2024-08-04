import CryptoJS from 'crypto-js';
const key = CryptoJS.enc.Utf8.parse('lijp');
const iv = CryptoJS.enc.Utf8.parse('1234567890123456');

// ase加密
export function aesEncrypt(data: string) {
  if (data) {
    return CryptoJS.AES.encrypt(data, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }).toString();
  }

  return null;
}

// ase解密
export function aesDecrypt(data: string) {
  return CryptoJS.enc.Utf8.stringify(
    CryptoJS.AES.decrypt(data, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    })
  );
}
