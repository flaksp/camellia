declare namespace InputFieldCssNamespace {
  export interface IInputFieldCss {
    textField: string;
    textFieldDescription: string;
    textFieldInput: string;
    textFieldLabel: string;
  }
}

declare const InputFieldCssModule: InputFieldCssNamespace.IInputFieldCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: InputFieldCssNamespace.IInputFieldCss;
};

export = InputFieldCssModule;
