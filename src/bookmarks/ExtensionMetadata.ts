export const getOptionsPageUrl = (): string => {
  if (chrome !== undefined && chrome.bookmarks !== undefined) {
    return `chrome://extensions/?options=${chrome.runtime.id}`;
  }

  return `chrome://extensions/?options=${browser.runtime.id}`;
};

export const openOptionsPage = (): void => {
  if (chrome !== undefined && chrome.bookmarks !== undefined) {
    chrome.runtime.openOptionsPage();
  }

  browser.runtime.openOptionsPage();
};
