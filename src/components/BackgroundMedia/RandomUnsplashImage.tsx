import { h } from 'preact';
import { BackgroundImage } from './BackgroundImage';
import { BackgroundGenericProps } from './BackgroundMedia';

export const RandomUnsplashImage = (props: BackgroundGenericProps) => {
  const dimensions = {
    height: props.height,
    width: props.width,
  };

  return (
    <BackgroundImage dimensions={dimensions} url={`https://source.unsplash.com/featured/${props.width}x${props.height}/daily/?dark`} />
  );
};
