import { h, JSX } from 'preact';
import { v4 as uuidv4 } from 'uuid';
import * as s from './Checkbox.css';

interface CheckboxProps {
  changeHandler?: (newValue: boolean) => void;
  checked: boolean;
  description: string,
  disabled: boolean;
  label: string;
}

export const Checkbox = (props: CheckboxProps) => {
  const inputId = `checkbox-${uuidv4()}`;

  const handleChange = (event: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    if (props.changeHandler !== undefined) {
      props.changeHandler(event.currentTarget.checked);
    }
  };

  return (
    <div className={s.checkbox}>
      <input checked={props.checked} disabled={props.disabled} id={inputId} onChange={handleChange} type="checkbox" />
      <label className={s.checkboxControl} htmlFor={inputId}>
        <span className={s.checkboxLabel}>{props.label}</span>
      </label>
      <p className={s.checkboxDescription}>{props.description}</p>
    </div>
  );
};
