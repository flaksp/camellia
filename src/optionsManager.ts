import { BackgroundType } from './components/BackgroundMedia/BackgroundMedia';

/**
 * Fetches data from browser's sync storage.
 *
 * If sync storage isn't available for some reason, it will fallback to non-sync storage.
 *
 * @param key - Under which key it's stored in storage.
 * @returns Data stored under given key or undefined if nothing found.
 */
const getValueFromSyncVault = async (key: string): Promise<any> => {
  if (chrome !== undefined) {
    const chromeSyncStorage = chrome.storage.sync || chrome.storage.local;

    return new Promise((resolve) => chromeSyncStorage.get(key, (data) => resolve(data[key])));
  }

  const webextSyncStorage = browser.storage.sync || browser.storage.local;

  return (await webextSyncStorage.get(key))[key];
};

const storeValueInSyncVault = async (key: string, data: any): Promise<void> => {
  if (chrome !== undefined) {
    const chromeSyncStorage = chrome.storage.sync || chrome.storage.local;

    return chromeSyncStorage.set(key, data);
  }

  const webextSyncStorage = browser.storage.sync || browser.storage.local;

  return webextSyncStorage.set({
    [key]: data,
  });
};

export interface BackgroundData {
  type: BackgroundType;
}

export interface ImageByUrlBackgroundData extends BackgroundData {
  type: BackgroundType.BackgroundImageByUrl
  url: string;
}

export interface UnsplashBackgroundData extends BackgroundData {
  type: BackgroundType.Unsplash
}

export interface AnimatedGradientBackgroundData extends BackgroundData {
  type: BackgroundType.AnimatedGradient
}

export type BackgroundStoredData = AnimatedGradientBackgroundData | ImageByUrlBackgroundData | UnsplashBackgroundData;

/**
 * Returns information about background type and additional parameters saved in user's settings.
 */
export const getBackgroundData = async (): Promise<BackgroundStoredData> => {
  const activeType = await getValueFromSyncVault('activeBackgroundType') as BackgroundType | undefined;

  switch (activeType) {
    case undefined:
      return {
        type: BackgroundType.Unsplash,
      };

    case BackgroundType.BackgroundImageByUrl:
      return {
        type: BackgroundType.BackgroundImageByUrl,
        url: await getValueFromSyncVault('backgroundImageUrl'),
      };

    default:
      return {
        type: activeType,
      };
  }
};

export const setBackgroundData = async (data: BackgroundStoredData): Promise<void> => {
  const storageWritingPromises: Promise<any>[] = [];

  storageWritingPromises.push(
    storeValueInSyncVault('activeBackgroundType', data.type),
  );

  switch (data.type) {
    case BackgroundType.BackgroundImageByUrl:
      storageWritingPromises.push(
        storeValueInSyncVault('backgroundImageUrl', data.url),
      );

      break;

    default:
  }

  await Promise.all(storageWritingPromises);
};
