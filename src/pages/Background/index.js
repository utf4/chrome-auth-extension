const CryptoJS = require('crypto-js');

chrome.runtime.onInstalled.addListener(() => {
  //  One time code is injected here
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // This is just to showcase interaction with background page
  // replace these functions with real time listeners
  switch (request.msg) {
    case 'encryptHash':
      encryptHash(request.values).then((hash) => {
        sendResponse(hash);
      });
      break;

    case 'decryptHash':
      decryptHash(request.values).then((value) => {
        sendResponse(value);
      });
      break;
  }
});

export const encryptHash = async (values) => {
  return CryptoJS.AES.encrypt(values.password, 'secret_key').toString();
};
export const decryptHash = async (password) => {
  return CryptoJS.AES.decrypt(password, 'secret_key').toString(
    CryptoJS.enc.Utf8
  );
};
