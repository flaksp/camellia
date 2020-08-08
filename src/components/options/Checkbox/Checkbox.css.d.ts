declare namespace CheckboxCssNamespace {
  export interface ICheckboxCss {
    checkbox: string;
    checkboxControl: string;
    checkboxDescription: string;
    checkboxLabel: string;
  }
}

declare const CheckboxCssModule: CheckboxCssNamespace.ICheckboxCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: CheckboxCssNamespace.ICheckboxCss;
};

export = CheckboxCssModule;
