import {
  h, render, VNode,
} from 'preact';
import { BackgroundSelector } from './components/options/BackgroundSelector/BackgroundSelector';
import { Checkbox } from './components/options/Checkbox/Checkbox';
import { OptionsCategory } from './components/options/OptionsCategory/OptionsCategory';

export interface OptionsProps {
  children: VNode[]
}

export const Options = (props: OptionsProps) => (
  <div>
    {props.children}
  </div>
);

render(
  <Options>
    <OptionsCategory title="Appearance">
      <BackgroundSelector />
    </OptionsCategory>

    <OptionsCategory title="Analytics">
      <Checkbox checked description="We're gathering anonymous usage statistics via Google Analytics. We need such data to be sure our updates make Camellia better. We don't track links you visit, we don't analyze your bookmarks and folders names. At this moment there's no way to disable this option." disabled label="Send anonymous usage statistics" />
      <Checkbox checked description="We're using Sentry to track errors in Camellia. At this moment there's no way to disable this option." disabled label="Send error reports" />
    </OptionsCategory>
  </Options>,
  document.getElementById('root') as Element,
);
