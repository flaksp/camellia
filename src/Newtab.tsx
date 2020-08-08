import * as Sentry from '@sentry/browser';
import {
  Fragment, h, render,
} from 'preact';
import { BookmarkRootCategory } from './bookmarks/Bookmark';
import { getTree } from './bookmarks/BookmarkManager';
import { BackgroundMedia } from './components/BackgroundMedia/BackgroundMedia';
import { RandomUnsplashImage } from './components/BackgroundMedia/RandomUnsplashImage';
import { BookmarkBrowser } from './components/BookmarkBrowser/BookmarkBrowser';
import { BottomToolbar } from './components/BottomToolbar/BottomToolbar';

Sentry.init({
  debug: process.env.APP_ENV !== 'stable',
  dsn: process.env.SENTRY_DSN,
  environment: process.env.APP_ENV,
  release: process.env.GIT_VERSION,
});

interface NewtabProps {
  bookmarkCategories: Promise<BookmarkRootCategory[]>;
}

const backgroundWidth = Math.round(window.screen.width * window.devicePixelRatio);
const backgroundHeight = Math.round(window.screen.height * window.devicePixelRatio);

export const Newtab = (props: NewtabProps) => (
  <Fragment>
    <BookmarkBrowser bookmarkCategories={props.bookmarkCategories} />
    <BottomToolbar />
    <BackgroundMedia height={backgroundHeight} width={backgroundWidth}>
      <RandomUnsplashImage height={backgroundHeight} width={backgroundWidth} />
    </BackgroundMedia>
  </Fragment>
);

render(
  <Newtab bookmarkCategories={getTree()} />,
  document.getElementById('root') as Element,
);
