import {
  h, VNode,
} from 'preact';
import * as s from './OptionsCategory.css';

export interface OptionsCategoryProps {
  children: VNode[] | VNode,
  title: string
}

export const OptionsCategory = (props: OptionsCategoryProps) => (
  <section className={s.optionsCategory}>
    <h2 className={s.optionsCategoryTitle}>{props.title}</h2>

    {props.children}
  </section>
);
