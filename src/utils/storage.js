export const saveValue = (value) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set(value, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      }
      resolve();
    });
  });
};

export const getValue = (value) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(value, (items) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      }
      resolve(items);
    });
  });
};

/* exported removeValue */
export const removeValue = (value) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.remove(value, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      }
      resolve();
    });
  });
};

export const clearAllStorageKeys = () =>
  new Promise((resolve, reject) => {
    chrome.storage.local.get(null, (items) => {
      removeValue(Object.keys(items)).then(resolve).catch(reject);
    });
  });
