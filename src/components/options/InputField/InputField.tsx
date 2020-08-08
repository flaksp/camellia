import { h, JSX } from 'preact';
import { v4 as uuidv4 } from 'uuid';
import * as s from './InputField.css';

export enum InputType {
  Url = 'url'
}

interface InputFieldProps {
  changeHandler: (newValue: string) => void;
  defaultValue?: string;
  description?: string,
  label: string,
  type: InputType;
}

export const InputField = (props: InputFieldProps) => {
  const inputId = `input-${uuidv4()}`;

  const handleChange = (event: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    props.changeHandler(event.currentTarget.value);
  };

  return (
    <div className={s.textField}>
      <label className={s.textFieldLabel} htmlFor={inputId}>
        {props.label}
      </label>

      <input className={s.textFieldInput} id={inputId} onChange={handleChange} type={props.type} />

      {props.description !== undefined ? <p className={s.textFieldDescription}>{props.description}</p> : ''}
    </div>
  );
};
