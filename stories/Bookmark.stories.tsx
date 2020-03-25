/** @jsx h */
import { h } from 'preact';
import { action } from '@storybook/addon-actions';
import BookmarkLinkComponent from '../src/components/Bookmark/BookmarkLink';
import BookmarkFolderComponent from '../src/components/Bookmark/BookmarkFolder';
import Bookmark from '../src/bookmarks/Bookmark';
import Link from '../src/bookmarks/Link';
import Folder from '../src/bookmarks/Folder';

export default {
  title: 'Bookmark',
};

const bookmarkLinkData = new Link(
  '1',
  'YouTube',
  'https://youtube.com',
);

export const BookmarkLink = () => <BookmarkLinkComponent bookmark={bookmarkLinkData} />;

const bookmarkFolderData = new Folder(
  '1',
  'YouTube',
  [
    bookmarkLinkData,
  ],
);

export const BookmarkFolder = () => <BookmarkFolderComponent bookmark={bookmarkFolderData} />;
