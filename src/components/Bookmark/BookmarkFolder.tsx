import { h } from 'preact';
import { useContext } from 'preact/hooks';
import * as s from './Bookmark.css';
import { Chip, ChipShape } from '../Chip/Chip';
import { Folder } from '../../bookmarks/Bookmark';
import { Popups } from '../BookmarkBrowser/BookmarkBrowser';

const iconFolder = require('mdi/file/svg/production/ic_folder_48px.svg?fill=%23eee');
// const iconFolderOpen = require('mdi/file/svg/production/ic_folder_open_48px.svg?fill=%23eee');

interface BookmarkFolderProps {
  bookmark: Folder;
}

export interface ClickPosition {
  x: number;
  y: number;
}

export const BookmarkFolder = (props: BookmarkFolderProps) => {
  const context = useContext(Popups);

  const handleFolderClick = (event: MouseEvent) => {
    const clickPosition = {
      x: event.pageX,
      y: event.pageY,
    };

    context.togglePopup(props.bookmark, clickPosition);
  };

  return (
    <li className={s.bookmarkItem}>
      <button className={s.bookmark} type="button" onClick={handleFolderClick}>
        <Chip label={props.bookmark.title} icon={iconFolder} shape={ChipShape.Rounded} />
      </button>
    </li>
  );
};
