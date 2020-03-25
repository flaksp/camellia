interface FaviconByDpi {
  dpi: number;

  url: string;
}

export default class Favicon {
  private static SIZE = 16;

  private static SUPPORTED_DPI = [1, 1.5, 2, 2.5, 3];

  private readonly favicons: FaviconByDpi[];

  private readonly defaultFavicon: FaviconByDpi;

  constructor(url: string) {
    this.defaultFavicon = {
      dpi: 1,
      url: Favicon.formatLinkByDPI(1, url),
    };

    this.favicons = Favicon.SUPPORTED_DPI.map((dpi) => ({
      dpi,
      url: Favicon.formatLinkByDPI(dpi, url),
    }));
  }

  getSrcSetString(): string {
    return this.favicons
      .map((favicon) => `${favicon.url} ${favicon.dpi}x`)
      .join(', ');
  }

  getDefaultFavicon(): FaviconByDpi {
    return this.defaultFavicon;
  }

  private static formatLinkByDPI(dpi: number, bookmarkUrl: string): string {
    if (process.env.TARGET_PLATFORM === 'chrome') {
      return `chrome://favicon/size/${Favicon.SIZE}@${dpi}x/${bookmarkUrl}`;
    }

    return `${new URL(bookmarkUrl).origin}/favicon.ico`;
  }
}
