import { BackgroundType } from './components/BackgroundMedia/BackgroundMedia';
import StorageObject = browser.storage.StorageObject;

const OPTION_ACTIVE_BACKGROUND_TYPE = 'activeBackgroundType';
const OPTION_COLLAPSE_UNSPLASH_ATTRIBUTION = 'collapseUnsplashAttribution';
const OPTION_BACKGROUND_IMAGE_URL = 'backgroundImageUrl';

// /**
//  * Fetches data from browser's sync storage.
//  *
//  * If sync storage isn't available for some reason, it will fallback to non-sync storage.
//  *
//  * @param key - Under which key it's stored in storage.
//  * @returns Data stored under given key or undefined if nothing found.
//  */
// const getValueFromSyncVault = async (key: string): Promise<any> => {
//   if (chrome !== undefined) {
//     const chromeSyncStorage = chrome.storage.sync || chrome.storage.local;
//
//     return new Promise((resolve) => chromeSyncStorage.get(key, (data) => resolve(data[key])));
//   }
//
//   const webextSyncStorage = browser.storage.sync || browser.storage.local;
//
//   return (await webextSyncStorage.get(key))[key];
// };

const getValuesFromSyncVault = async (keys: string[]): Promise<any> => {
  if (chrome !== undefined) {
    const chromeSyncStorage = chrome.storage.sync || chrome.storage.local;

    return new Promise((resolve) => chromeSyncStorage.get(keys, (data) => resolve(data)));
  }

  const webextSyncStorage = browser.storage.sync || browser.storage.local;

  return webextSyncStorage.get(keys);
};

// const storeValueInSyncVault = async (key: string, data: any): Promise<void> => {
//   if (chrome !== undefined) {
//     const chromeSyncStorage = chrome.storage.sync || chrome.storage.local;
//
//     return new Promise((resolve) => chromeSyncStorage.set({ [key]: data }, () => resolve()));
//   }
//
//   const webextSyncStorage = browser.storage.sync || browser.storage.local;
//
//   return webextSyncStorage.set({
//     [key]: data,
//   });
// };

const storeValuesInSyncVault = async (data: StorageObject): Promise<void> => {
  if (chrome !== undefined) {
    const chromeSyncStorage = chrome.storage.sync || chrome.storage.local;

    return new Promise((resolve) => chromeSyncStorage.set(data, () => resolve()));
  }

  const webextSyncStorage = browser.storage.sync || browser.storage.local;

  return webextSyncStorage.set(data);
};

export interface BackgroundData {
  [OPTION_ACTIVE_BACKGROUND_TYPE]: BackgroundType;
  [OPTION_BACKGROUND_IMAGE_URL]: string,
  [OPTION_COLLAPSE_UNSPLASH_ATTRIBUTION]: boolean
}

/**
 * Returns information about background type and additional parameters saved in user's settings.
 */
export const getBackgroundData = async (): Promise<BackgroundData> => {
  const data = await getValuesFromSyncVault([
    OPTION_ACTIVE_BACKGROUND_TYPE,
    OPTION_BACKGROUND_IMAGE_URL,
    OPTION_COLLAPSE_UNSPLASH_ATTRIBUTION,
  ]);

  return {
    [OPTION_ACTIVE_BACKGROUND_TYPE]: data[OPTION_ACTIVE_BACKGROUND_TYPE] as BackgroundType || BackgroundType.Unsplash,
    [OPTION_BACKGROUND_IMAGE_URL]: data[OPTION_BACKGROUND_IMAGE_URL] as string || '',
    [OPTION_COLLAPSE_UNSPLASH_ATTRIBUTION]: data[OPTION_COLLAPSE_UNSPLASH_ATTRIBUTION] as boolean || false,
  };
};

export const setBackgroundData = async (data: BackgroundData): Promise<void> => storeValuesInSyncVault({
  [OPTION_ACTIVE_BACKGROUND_TYPE]: data[OPTION_ACTIVE_BACKGROUND_TYPE],
  [OPTION_BACKGROUND_IMAGE_URL]: data[OPTION_BACKGROUND_IMAGE_URL],
  [OPTION_COLLAPSE_UNSPLASH_ATTRIBUTION]: data[OPTION_COLLAPSE_UNSPLASH_ATTRIBUTION],
});
