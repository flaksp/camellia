import { Component, createContext, h } from 'preact';
import * as classnames from 'classnames';
import { createPortal } from 'preact/compat';
import * as s from './BookmarkBrowser.css';
import { BookmarkCategory } from '../BookmarkCategory/BookmarkCategory';
import { BookmarkSearch } from '../BookmarkSearch/BookmarkSearch';
import { BookmarkRootCategory, Folder, Link } from '../../bookmarks/Bookmark';
import { FolderPopup } from '../FolderPopup/FolderPopup';
import { ClickPosition } from '../Bookmark/BookmarkFolder';
import * as bookmarkClasses from '../Bookmark/Bookmark.css';
import * as folderPopupClasses from '../FolderPopup/FolderPopup.css';

export interface Popup {
  clickPosition: ClickPosition,
  folder: Folder,
}

interface BookmarkBrowserProps {
  bookmarkCategories: Promise<BookmarkRootCategory[]>;
}

interface BookmarkBrowserState {
  loaded: boolean;
  showSearchBar: boolean;
  categories: BookmarkRootCategory[];
  searchResults: Link[];
  openedPopups: Popup[],
}

interface PopupContext {
  closeAllNextPopups: (folder: Folder) => void;
  closeAllPopups: () => void;
  togglePopup: (folder: Folder, clickPosition: ClickPosition) => void;
}

export const Popups = createContext<PopupContext>(undefined);

export class BookmarkBrowser extends Component<BookmarkBrowserProps, BookmarkBrowserState> {
  state = {
    categories: [],
    loaded: false,
    openedPopups: [],
    searchResults: [],
    showSearchBar: false,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.characterKeyPressHandler);
    document.addEventListener('keydown', this.searchHotkeyPressHandler);
    document.addEventListener('click', this.closeAllPopupsHandler);

    this.props.bookmarkCategories.then((categories: BookmarkRootCategory[]) => {
      this.setState({
        categories: categories.filter((category: BookmarkRootCategory) => category.children.length > 0),
        loaded: true,
      });
    });
  }

  componentWillUnmount(): void {
    document.removeEventListener('keydown', this.characterKeyPressHandler);
    document.removeEventListener('keydown', this.searchHotkeyPressHandler);
    document.removeEventListener('click', this.closeAllPopupsHandler);
  }

  private static getPopupIndex = (openedPopups: Popup[], folder: Folder) => openedPopups.findIndex((popup) => popup.folder.browserId === folder.browserId);

  private closeAllPopupsHandler = (event: MouseEvent) => {
    if (!(event.target instanceof Element)) {
      return;
    }

    const isClickedOnBookmarkItem = event.target.closest(`.${bookmarkClasses.bookmarkItem}`) !== null;
    const isClickedOnFolderPopup = event.target.closest(`.${folderPopupClasses.folderPopup}`) !== null;

    if (isClickedOnBookmarkItem || isClickedOnFolderPopup) {
      console.log('Aborting...');

      return;
    }

    this.closeAllPopups();
  };

  private showSearchBar = () => {
    if (this.state.showSearchBar === false) {
      this.setState({
        showSearchBar: true,
      });
    }
  };

  private searchHotkeyPressHandler = (event: KeyboardEvent) => {
    const isCtrlPressed = event.ctrlKey || event.metaKey;

    if ((isCtrlPressed && event.key === 'f') || (isCtrlPressed && event.key === 'g')) {
      event.preventDefault();

      this.showSearchBar();
    }
  };

  private hideSearchBar = (): void => {
    this.setState({
      showSearchBar: false,
    });
  };

  private updateSearchResults = (searchResults: Promise<Link[]>): void => {
    searchResults.then((bookmarks) => {
      this.setState({
        searchResults: bookmarks,
      });
    });
  };

  private togglePopup = (folder: Folder, clickPosition: ClickPosition) => {
    console.log('Triggered togglePopup');

    this.setState((state) => {
      const index = BookmarkBrowser.getPopupIndex(state.openedPopups, folder);

      if (index !== -1) {
        return {
          openedPopups: state.openedPopups.slice(0, index),
        };
      }

      const { openedPopups } = state;
      openedPopups.push({
        clickPosition,
        folder,
      });

      return {
        openedPopups,
      };
    });
  };

  private characterKeyPressHandler = (event: KeyboardEvent) => {
    if (event.ctrlKey || event.metaKey || event.altKey) {
      return;
    }

    if (event.key.length !== 1) {
      return;
    }

    this.showSearchBar();
  };

  private closeAllNextPopups = (folder: Folder) => {
    console.log('Triggered closeAllNextPopups');

    this.setState((state) => {
      const index = BookmarkBrowser.getPopupIndex(state.openedPopups, folder);

      if (index === -1) {
        return;
      }

      return {
        openedPopups: state.openedPopups.slice(0, index + 1),
      };
    });
  };

  private closeAllPopups = () => {
    this.setState({
      openedPopups: [],
    });
  };

  render(props: BookmarkBrowserProps, state: BookmarkBrowserState) {
    const classes = state.loaded === false
      ? classnames(s.bookmarkBrowser, s.loading)
      : s.bookmarkBrowser;

    if (state.categories.length === 0) {
      return (
        <main className={classes}>
          <p className={s.noBookmarksMessage}>
            Add your first bookmarks to get started with Camellia
          </p>
        </main>
      );
    }

    if (state.showSearchBar) {
      return (
        <main className={classes}>
          <BookmarkSearch hideSearchBar={this.hideSearchBar} updateSearchResults={this.updateSearchResults} firstResult={state.searchResults[0] || null} />
          <BookmarkCategory bookmarks={state.searchResults} categoryTitle="Search results" />
        </main>
      );
    }

    console.log('Creating portals for IDs', state.openedPopups.map((popup) => popup.folder.browserId));

    const context = {
      closeAllNextPopups: this.closeAllNextPopups,
      closeAllPopups: this.closeAllPopups,
      togglePopup: this.togglePopup,
    };

    const body = document.querySelector('body');
    const popupPortals = state.openedPopups.map((popup) => createPortal(
      <FolderPopup folder={popup.folder} clickPosition={popup.clickPosition} key={popup.folder.browserId} closeAllNextPopups={this.closeAllNextPopups} />,
      body,
    ));

    return (
      <main className={classes}>
        <Popups.Provider value={context}>
          {state.categories.map((item) => (
            <BookmarkCategory key={item.browserId} bookmarks={item.children} categoryTitle={item.title} />
          ))}

          { popupPortals }
        </Popups.Provider>
      </main>
    );
  }
}
