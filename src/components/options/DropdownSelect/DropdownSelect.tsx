import { h, JSX } from 'preact';
import { v4 as uuidv4 } from 'uuid';
import * as s from './DropdownSelect.css';

interface SelectOption {
  label: string;
  selected: boolean;
  value: string;
}

interface SelectOptionGroup {
  options: SelectOption[];
  title: string;
}

interface DropdownSelectProps {
  changeHandler: (newValue: string) => void;
  description: string,
  label: string,
  options: (SelectOption | SelectOptionGroup)[];
}

const renderOption = (option: SelectOption) => <option selected={option.selected} value={option.value}>{option.label}</option>;

const renderOptionGroup = (optionGroup: SelectOptionGroup) => (
  <optgroup label={optionGroup.title}>
    {optionGroup.options.map((option) => renderOption(option))}
  </optgroup>
);

const isOptionGroup = (value: any): value is SelectOptionGroup => 'options' in value;

export const DropdownSelect = (props: DropdownSelectProps) => {
  const inputId = `select-${uuidv4()}`;

  const handleChange = (event: JSX.TargetedEvent<HTMLSelectElement, Event>) => {
    props.changeHandler(event.currentTarget.value);
  };

  return (
    <div className={s.selection}>
      <label className={s.selectionLabel} htmlFor={inputId}>
        {props.label}
      </label>

      <select className={s.selectionDropdown} id={inputId} onChange={handleChange}>
        {props.options.map((item) => {
          if (isOptionGroup(item)) {
            return renderOptionGroup(item);
          }

          return renderOption(item);
        })}
      </select>

      <p className={s.selectionDescription}>{props.description}</p>
    </div>
  );
};
