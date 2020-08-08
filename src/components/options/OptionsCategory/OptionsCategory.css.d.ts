declare namespace OptionsCategoryCssNamespace {
  export interface IOptionsCategoryCss {
    optionsCategory: string;
    optionsCategoryTitle: string;
  }
}

declare const OptionsCategoryCssModule: OptionsCategoryCssNamespace.IOptionsCategoryCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: OptionsCategoryCssNamespace.IOptionsCategoryCss;
};

export = OptionsCategoryCssModule;
