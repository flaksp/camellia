declare namespace DropdownSelectCssNamespace {
  export interface IDropdownSelectCss {
    selection: string;
    selectionDescription: string;
    selectionDropdown: string;
    selectionLabel: string;
  }
}

declare const DropdownSelectCssModule: DropdownSelectCssNamespace.IDropdownSelectCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: DropdownSelectCssNamespace.IDropdownSelectCss;
};

export = DropdownSelectCssModule;
