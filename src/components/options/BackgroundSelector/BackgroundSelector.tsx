import { Fragment, h, VNode } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { BackgroundStoredData, getBackgroundData, setBackgroundData } from '../../../optionsManager';
import { BackgroundImage } from '../../BackgroundMedia/BackgroundImage';
import { BackgroundMediaVisibility, BackgroundType } from '../../BackgroundMedia/BackgroundMedia';
import { FourDotsAnimatedGradient } from '../../BackgroundMedia/FourDotsAnimatedGradient';
import { RandomUnsplashImage } from '../../BackgroundMedia/RandomUnsplashImage';
import { Checkbox } from '../Checkbox/Checkbox';
import { DropdownSelect } from '../DropdownSelect/DropdownSelect';
import { InputField, InputType } from '../InputField/InputField';
import * as s from './BackgroundSelector.css';

const getAvailableOptions = (activeOption: BackgroundType) => [
  {
    options: [
      {
        label: 'Image by URL',
        selected: BackgroundType.BackgroundImageByUrl === activeOption,
        value: BackgroundType.BackgroundImageByUrl,
      },
      {
        label: 'Random images from Unsplash',
        selected: BackgroundType.Unsplash === activeOption,
        value: BackgroundType.Unsplash,
      },
      {
        label: 'Animated gradient',
        selected: BackgroundType.AnimatedGradient === activeOption,
        value: BackgroundType.AnimatedGradient,
      },
    ],
    title: 'Image',
  },
];

const isValidUrl = (string: string): boolean => {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
};

export const BackgroundSelector = () => {
  let backgroundData: BackgroundStoredData | undefined;

  useEffect(() => {
    getBackgroundData().then((data) => {
      backgroundData = data;
    });
  }, []);

  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>('');
  const [backgroundMediaHasError, loadFallbackMedia] = useState(false);

  const dropdownChangeHandler = (value: string) => {
    const type = value as BackgroundType;

    switch (type) {
      case BackgroundType.BackgroundImageByUrl:
        setBackgroundData({
          type: BackgroundType.BackgroundImageByUrl,
          url: backgroundImageUrl,
        });

        break;

      default:
        setBackgroundData({
          type,
        });

        break;
    }
  };

  let additionalForms: VNode | undefined;
  let backgroundPreview: VNode | undefined;

  const inputHandler = (url: string) => {
    setBackgroundImageUrl(url);
    loadFallbackMedia(false);
  };

  switch (backgroundData.type) {
    case BackgroundType.BackgroundImageByUrl:
      additionalForms = <InputField changeHandler={inputHandler} defaultValue={backgroundData.url} label="URL to image" type={InputType.Url} />;
      backgroundPreview = isValidUrl(backgroundImageUrl) === true
        ? <BackgroundImage url={backgroundImageUrl} />
        : <Fragment>Enter valid URL</Fragment>;

      break;

    case BackgroundType.AnimatedGradient:
      additionalForms = undefined;
      backgroundPreview = <FourDotsAnimatedGradient height={250} width={400} />;

      break;

    case BackgroundType.Unsplash:
      additionalForms = <Checkbox checked={false} description="Button with photographer name is always shown in the right bottom corner of Camellia, so you may always reach photographer on Unsplash to download current background or to get more from a photographer if you liked it. By default Camellia displays full attribution, but you may collapse this button to compact size using this option." disabled={false} label="Collapse photographer attribution" />;
      backgroundPreview = <RandomUnsplashImage height={250} width={400} />;

      break;

    default:
      additionalForms = undefined;
      backgroundPreview = <Fragment>Preview</Fragment>;

      break;
  }

  if (backgroundMediaHasError) {
    backgroundPreview = <Fragment>Error loading background</Fragment>;
  }

  const loadDefaultBackgroundMedia = () => {
    loadFallbackMedia(true);
  };

  const context = {
    isVisible: false,
    loadDefaultBackgroundMedia,
    makeVisible: () => {},
  };

  return (
    <BackgroundMediaVisibility.Provider value={context}>
      <DropdownSelect changeHandler={dropdownChangeHandler} description="Background that will appear behind your bookmarks at new tab page. You may see preview box lower. If Camellia won't be able to load your background (e.g. because of network issues), animated gradient will be displayed instead." label="Background" options={getAvailableOptions(backgroundData.type)} />

      {additionalForms}

      <div className={s.backgroundPreview}>
        {backgroundPreview}
      </div>
    </BackgroundMediaVisibility.Provider>
  );
};
