declare namespace BackgroundSelectorCssNamespace {
  export interface IBackgroundSelectorCss {
    backgroundPreview: string;
  }
}

declare const BackgroundSelectorCssModule: BackgroundSelectorCssNamespace.IBackgroundSelectorCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: BackgroundSelectorCssNamespace.IBackgroundSelectorCss;
};

export = BackgroundSelectorCssModule;
