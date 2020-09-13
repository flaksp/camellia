import { h } from 'preact';
import { getOptionsPageUrl, openOptionsPage } from '../../../bookmarks/ExtensionMetadata';
import * as bookmarkStyles from '../../Bookmark/Bookmark.css';
import { Chip, ChipShape } from '../../Chip/Chip';

const iconSettings = require('mdi/action/svg/production/ic_settings_24px.svg?fill=%23eee');

const handleClick = (event: MouseEvent): void => {
  event.preventDefault();

  openOptionsPage();
};

export const OptionsPage = () => {
  const label = 'Options';
  const tooltip = label;
  const url = getOptionsPageUrl();

  return (
    <li className={bookmarkStyles.bookmarkItem}>
      <a className={bookmarkStyles.bookmark} href={url} onClick={handleClick} rel="noopener" target="_self">
        <Chip icon={iconSettings} label={label} shape={ChipShape.Squared} tooltip={tooltip} />
      </a>
    </li>
  );
};
