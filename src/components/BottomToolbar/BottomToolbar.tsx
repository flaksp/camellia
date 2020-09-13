import { h } from 'preact';
import * as s from './BottomToolbar.css';
import { BookmarkManager } from './ToolbarItem/BookmarkManager';
import { OptionsPage } from './ToolbarItem/OptionsPage';

export const BottomToolbar = () => {
  const toolbarItems = [];

  if (process.env.TARGET_PLATFORM === 'chromium') {
    toolbarItems.push(<BookmarkManager />);
  }

  toolbarItems.push(<OptionsPage />);

  return (
    <footer className={s.bottomToolbar}>
      <ul className={s.bottomToolbarItems}>
        {toolbarItems}
      </ul>
    </footer>
  );
};
