import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { BackgroundMediaVisibility } from './BackgroundMedia';
import * as s from './BackgroundMedia.css';

declare module 'preact' {
  namespace h {
    namespace JSX {
      interface HTMLAttributes {
        decoding?: string;
        importance?: string;
        referrerpolicy?: string;
      }
    }
  }
}

interface ImageDimensions {
  height: number;
  width: number;
}

interface BackgroundImageProps {
  dimensions?: ImageDimensions;
  url: string;
}

export const BackgroundImage = (props: BackgroundImageProps) => {
  const context = useContext(BackgroundMediaVisibility);

  const handleImageError = () => {
    console.warn('Failed to load background image, falling back to default background media');

    context.loadDefaultBackgroundMedia();
  };

  const handleImageLoad = () => {
    context.makeVisible();
  };

  return <img alt="" className={s.backgroundMedia} decoding="async" height={props.dimensions?.height} importance="low" onError={handleImageError} onLoad={handleImageLoad} referrerpolicy="no-referrer" src={props.url} width={props.dimensions?.width} />;
};
